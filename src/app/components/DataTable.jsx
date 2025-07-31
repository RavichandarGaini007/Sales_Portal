import React, { useMemo } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const DataTable = ({ data, filename, headername, name, groupHeaders = [], columnHeaders = [] }) => {
    if (!data || data.length === 0) return null;

    const headers = columnHeaders.length > 0
        ? columnHeaders.map(col => typeof col === 'object' ? col.key : col)
        : Object.keys(data[0]);

    const headerLabels = columnHeaders.length > 0
        ? columnHeaders.map(col => typeof col === 'object' ? col.label : col)
        : Object.keys(data[0]);

    // 1 character ≈ 10px (customizable)
    const CHAR_WIDTH_PX = 10;
    const MIN_COL_WIDTH = 100;

    // Compute column widths
    const columnWidths = useMemo(() => {
        const widths = headers.map((key, idx) => {
            const maxLength = Math.max(
                headerLabels[idx]?.length || 0,
                ...data.map(row => (row[key]?.toString().length || 0))
            );
            return Math.max(MIN_COL_WIDTH, maxLength * CHAR_WIDTH_PX);
        });
        return widths;
    }, [headers, headerLabels, data]);


    const handleDownloadExcel = () => {
        const ws = XLSX.utils.aoa_to_sheet([]);
        let rowIndex = 0;

        if (groupHeaders.length > 0) {
            const groupRow = [];
            let colIndex = 0;
            groupHeaders.forEach(group => {
                groupRow.push(group.label);
                if (group.span > 1) {
                    ws['!merges'] = ws['!merges'] || [];
                    ws['!merges'].push({
                        s: { r: rowIndex, c: colIndex },
                        e: { r: rowIndex, c: colIndex + group.span - 1 },
                    });
                }
                for (let i = 1; i < group.span; i++) {
                    groupRow.push(null);
                }
                colIndex += group.span;
            });
            XLSX.utils.sheet_add_aoa(ws, [groupRow], { origin: rowIndex++ });
        }

        XLSX.utils.sheet_add_aoa(ws, [headerLabels], { origin: rowIndex++ });

        data.forEach((row) => {
            const rowData = headers.map(key => row[key]);
            XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: rowIndex++ });
        });

        // Calculate column widths based on max string length per column (including header)
        const colWidths = headers.map((key) => {
            let maxLength = headerLabels[headers.indexOf(key)].length;
            data.forEach(row => {
                const val = row[key];
                if (val) {
                    const len = val.toString().length;
                    if (len > maxLength) maxLength = len;
                }
            });
            // Clamp width between 10 and 50 characters with a little padding
            return { wch: Math.min(Math.max(maxLength + 2, 10), 50) };
        });

        ws['!cols'] = colWidths; // Set column widths on worksheet

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${filename}.xlsx`);
    };


    const imageToBase64 = (imgPath) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = imgPath;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
        });
    };

    const handleDownloadPDF = async () => {
        debugger;
        const baseMargin = 40;
        const minPageWidth = 842; // A4 landscape width in pt (default min)
        const pageHeight = 595.28;

        // Calculate column widths based on header labels and data max length
        const getTextWidth = (text, doc, fontSize = 8) => {
            doc.setFontSize(fontSize);
            return doc.getTextWidth(text);
        };

        // Create a temporary doc to measure widths
        const tmpDoc = new jsPDF({
            unit: 'pt',
            format: 'a4',
            orientation: 'landscape',
        });
        tmpDoc.setFont('helvetica', 'normal');
        tmpDoc.setFontSize(8);

        const colWidths = headers.map((key, i) => {
            // Measure header label width
            const headerText = headerLabels[i];
            let maxWidth = getTextWidth(headerText, tmpDoc) + 20; // padding 20pt

            // Check max width of each cell in that column (limit length for performance)
            data.forEach(row => {
                const cellText = row[key] ? String(row[key]) : '';
                // Optionally limit max text length measured to avoid huge widths for extreme data
                const truncatedText = cellText.length > 50 ? cellText.slice(0, 50) + '...' : cellText;
                const w = getTextWidth(truncatedText, tmpDoc) + 20;
                if (w > maxWidth) maxWidth = w;
            });

            // Clamp min and max width for a nicer layout
            return Math.min(Math.max(maxWidth, 50), 300);
        });

        // Total table width + margins
        const totalTableWidth = colWidths.reduce((a, b) => a + b, 0);
        const totalPageWidth = Math.max(minPageWidth, totalTableWidth + baseMargin * 2);

        // Now create the real doc with dynamic width
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: [totalPageWidth, pageHeight],
        });

        const logoBase64 = await imageToBase64(process.env.PUBLIC_URL + '/logo.png');

        // Prepare body rows
        const bodyRows = data.map(row =>
            headers.map(key => {
                const v = row[key];
                return typeof v === 'number' ? v : (v !== undefined && v !== null ? v.toString() : '');
            })
        );

        // Prepare group header row with colSpan
        const groupHeaderRow = [];
        groupHeaders.forEach((group) => {
            groupHeaderRow.push({
                content: group.label,
                colSpan: group.span,
                styles: {
                    fillColor: [180, 198, 231],
                    textColor: 0,
                    halign: 'center',
                    fontStyle: 'bold',
                    valign: 'middle',
                    lineWidth: 0.5,
                    lineColor: [0, 0, 0],
                },
            });
        });

        // Fill empty group header cells if any
        const totalCols = headers.length;
        const sumGroupSpans = groupHeaders.reduce((sum, g) => sum + g.span, 0);
        if (sumGroupSpans < totalCols) {
            const diff = totalCols - sumGroupSpans;
            for (let i = 0; i < diff; i++) {
                groupHeaderRow.push({
                    content: '',
                    styles: {
                        fillColor: [180, 198, 231],
                        lineWidth: 0.5,
                        lineColor: [0, 0, 0],
                    },
                });
            }
        }

        // Column header row
        const columnHeaderRow = headerLabels.map(label => ({
            content: label,
            styles: {
                fillColor: [220, 230, 241],
                textColor: 0,
                halign: 'center',
                fontStyle: 'bold',
                lineWidth: 0.5,
                lineColor: [0, 0, 0],
            },
        }));

        const tableHead = groupHeaders.length > 0 ? [groupHeaderRow, columnHeaderRow] : [columnHeaderRow];

        // Map colWidths to columnStyles for jspdf-autotable
        const columnStyles = {};
        colWidths.forEach((w, i) => {
            columnStyles[i] = {
                cellWidth: w,
                overflow: 'linebreak',
                minCellHeight: 15,
            };
        });

        autoTable(doc, {
            head: tableHead,
            body: bodyRows,
            styles: {
                fontSize: 8,
                cellPadding: 4,
                valign: 'middle',
                overflow: 'linebreak',
                textColor: 0,
                lineWidth: 0.5,
                lineColor: [0, 0, 0],
            },
            columnStyles,
            alternateRowStyles: {
                fillColor: [245, 245, 245],
            },
            margin: {
                top: groupHeaders.length > 0 ? 110 : 70,
                left: baseMargin,
                right: baseMargin,
            },
            didParseCell: (data) => {
                if (data.section === 'body') {
                    const val = data.cell.raw;
                    const isNumeric = typeof val === 'number' || (!isNaN(val) && val !== '' && typeof val === 'string' && val.trim() !== '');
                    data.cell.styles.halign = isNumeric ? 'center' : 'left';
                }
            },
            didDrawPage: () => {
                const pageCenter = totalPageWidth / 2;

                if (logoBase64) {
                    doc.addImage(logoBase64, 'PNG', baseMargin, 15, 40, 40);
                }

                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                const titleWidth = doc.getTextWidth(headername);
                doc.text(headername, pageCenter - titleWidth / 2, 40);

                if (name) {
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'normal');
                    const userTextWidth = doc.getTextWidth(name);
                    doc.text(name, totalPageWidth - baseMargin - userTextWidth, 30);
                }
            },
        });

        doc.save(`${filename}.pdf`);
    };


    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <button onClick={handleDownloadExcel} style={{ marginRight: '10px' }}>
                    📥 Download Excel
                </button>
                <button onClick={handleDownloadPDF}>
                    📄 Download PDF
                </button>
            </div>

            <div
                style={{
                    overflowX: 'auto',
                    overflowY: 'auto',
                    maxWidth: '100%',
                    maxHeight: '400px',
                    border: '1px solid #ccc',
                }}
            >
                <table
                    style={{
                        borderCollapse: 'collapse',
                        width: '100%',
                        tableLayout: 'auto',
                    }}
                    border="1"
                    cellPadding="10"
                    cellSpacing="0"
                >
                    <thead>
                        {groupHeaders.length > 0 && (
                            <tr>
                                {groupHeaders.map((group, index) => (
                                    <th
                                        key={`group-${index}`}
                                        colSpan={group.span}
                                        style={{
                                            backgroundColor: '#B4C6E7',
                                            textAlign: 'center',
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 2,
                                            border: 'solid 1px',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {group.label}
                                    </th>
                                ))}
                            </tr>
                        )}
                        <tr>
                            {headerLabels.map((label, index) => (
                                <th
                                    key={`header-${index}`}
                                    style={{
                                        backgroundColor: '#D9E1F2',
                                        textAlign: 'center',
                                        position: 'sticky',
                                        top: groupHeaders.length > 0 ? 20 : 0,
                                        zIndex: 1,
                                        border: 'solid 1px',
                                        whiteSpace: 'nowrap',
                                        width: `${columnWidths[index]}px`,
                                    }}
                                >
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                style={{
                                    backgroundColor: index % 2 === 0 ? 'white' : '#f5f5f5',
                                }}
                            >
                                {headers.map((key, idx) => (
                                    <td
                                        key={idx}
                                        style={{
                                            whiteSpace: 'nowrap',
                                            border: 'solid 1px',
                                            textAlign: typeof row[key] === 'number' ? 'center' : 'left',
                                            width: `${columnWidths[idx]}px`,
                                        }}
                                    >
                                        {row[key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
