import React, { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

const ReportDataTable = ({ data, columnHeaders = [], groupHeaders = [] }) => {
    if (!data || data.length === 0) {
        return null;
    }

    // Convert columnHeaders to material-react-table format
    const columns = useMemo(() => {
        return columnHeaders.map((col) => ({
            accessorKey: col.key || col.accessor,
            header: col.label || col.header,
            size: 100,
        }));
    }, [columnHeaders]);

    const columnGrouping = useMemo(() => {
        if (!groupHeaders || groupHeaders.length === 0) return [];

        const groups = [];
        let colIndex = 0;

        groupHeaders.forEach((group) => {
            const groupCols = [];
            for (
                let i = 0;
                i < group.span && colIndex < columns.length;
                i++, colIndex++) {
                // pull the accessorKey from the already-memoized columns
                const colId = columns[colIndex]?.accessorKey || columns[colIndex]?.id;
                if (colId) {
                    groupCols.push(colId);
                }
            }
            if (groupCols.length > 0) {
                groups.push({
                    header: group.label,
                    columns: groupCols,
                });
            }
        });

        return groups;
    }, [columns, groupHeaders]);

    const table = useMaterialReactTable({
        columns,
        data,
        enableGrouping: false,
        groupedColumnMode: 'reorder',
        columnGrouping,
        enablePagination: true,
        enableSorting: true,
        enableColumnActions: false,
        enableDensityToggle: false,
        enableColumnResizing: true,
        columnResizeMode: 'onChange',
        initialState: {
            density: 'compact',
        },
        muiTableProps: {
            sx: {
                border: '1px solid #000',
                '& .Mui-TableHeadCell': {
                    backgroundColor: '#b8c6e7',
                    fontWeight: 'bold',
                    borderRight: '1px solid #000',
                    padding: '4px 8px',
                },
                '& .Mui-TableBodyCell': {
                    borderRight: '1px solid #e0e0e0',
                    borderBottom: '1px solid #e0e0e0',
                    padding: '4px 8px',
                },
            },
        },
        muiTableHeadCellProps: {
            sx: {
                backgroundColor: '#b8c6e7',
                fontWeight: 'bold',
                borderRight: '1px solid #000',
                borderBottom: '1px solid #000',
            },
        },
        muiTableBodyCellProps: {
            sx: {
                borderRight: '1px solid #e0e0e0',
                borderBottom: '1px solid #e0e0e0',
            },
        },
    });

    return <MaterialReactTable table={table} />;
};

export default ReportDataTable;
