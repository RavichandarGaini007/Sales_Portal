import React, { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const data = [
  {
    "DIV NAME": "	ALTRON",
    "NET SALES (H)": 50000,
    "PENDING PICKLIST (L)": 3000,
    "O(H+L)": 53000,
    "PENDING ORDER (M)": 4000,
    "N(O+M)": 57000,
    "UNCONF ORDER VALUE (U)": 5000,
    "NET AMOUNT (N+U)": 62000,
    TARGET: 80000,
    "ACH (%)": "77.5%",
    "LAST MONTH UPTO DATE": 48000,
    "MOM GROWTH (%)": "8.3%",
    "LAST YEAR UPTO DATE": 45000,
    "YOY GROWTH (%)": "15.6%",
    "LAST MONTH TOTAL": 70000,
    "ACH (%) COMPARED TO LMS": "88.6%",
    "LAST YEAR TOTAL": 65000,
    "ACH (%) COMPARED TO LYS": "95.3%",
    "YTD SALES": 500000,
    "YTD LAST YEAR SALES": 450000,
    "YTD GROWTH": "11.1%",
    "QTD SALES": 150000,
    "QTD LAST YEAR SALES": 140000,
    "QTD GROWTH": "7.1%",
  },
  {
    "DIV NAME": "Hospicare",
    "NET SALES (H)": 50000,
    "PENDING PICKLIST (L)": 3000,
    "O(H+L)": 53000,
    "PENDING ORDER (M)": 4000,
    "N(O+M)": 57000,
    "UNCONF ORDER VALUE (U)": 5000,
    "NET AMOUNT (N+U)": 62000,
    TARGET: 80000,
    "ACH (%)": "100.5%",
    "LAST MONTH UPTO DATE": 48000,
    "MOM GROWTH (%)": "8.3%",
    "LAST YEAR UPTO DATE": 45000,
    "YOY GROWTH (%)": "15.6%",
    "LAST MONTH TOTAL": 70000,
    "ACH (%) COMPARED TO LMS": "88.6%",
    "LAST YEAR TOTAL": 65000,
    "ACH (%) COMPARED TO LYS": "95.3%",
    "YTD SALES": 500000,
    "YTD LAST YEAR SALES": 450000,
    "YTD GROWTH": "11.1%",
    "QTD SALES": 150000,
    "QTD LAST YEAR SALES": 140000,
    "QTD GROWTH": "7.1%",
  },
  {
    "DIV NAME": "Pulmocare",
    "NET SALES (H)": 50000,
    "PENDING PICKLIST (L)": 3000,
    "O(H+L)": 53000,
    "PENDING ORDER (M)": 4000,
    "N(O+M)": 57000,
    "UNCONF ORDER VALUE (U)": 5000,
    "NET AMOUNT (N+U)": 62000,
    TARGET: 80000,
    "ACH (%)": "100.5%",
    "LAST MONTH UPTO DATE": 48000,
    "MOM GROWTH (%)": "8.3%",
    "LAST YEAR UPTO DATE": 45000,
    "YOY GROWTH (%)": "15.6%",
    "LAST MONTH TOTAL": 70000,
    "ACH (%) COMPARED TO LMS": "88.6%",
    "LAST YEAR TOTAL": 65000,
    "ACH (%) COMPARED TO LYS": "95.3%",
    "YTD SALES": 500000,
    "YTD LAST YEAR SALES": 450000,
    "YTD GROWTH": "11.1%",
    "QTD SALES": 150000,
    "QTD LAST YEAR SALES": 140000,
    "QTD GROWTH": "7.1%",
  },
  {
    "DIV NAME": "EYECARE",
    "NET SALES (H)": 50000,
    "PENDING PICKLIST (L)": 3000,
    "O(H+L)": 53000,
    "PENDING ORDER (M)": 4000,
    "N(O+M)": 57000,
    "UNCONF ORDER VALUE (U)": 5000,
    "NET AMOUNT (N+U)": 62000,
    TARGET: 80000,
    "ACH (%)": "100.5%",
    "LAST MONTH UPTO DATE": 48000,
    "MOM GROWTH (%)": "8.3%",
    "LAST YEAR UPTO DATE": 45000,
    "YOY GROWTH (%)": "15.6%",
    "LAST MONTH TOTAL": 70000,
    "ACH (%) COMPARED TO LMS": "88.6%",
    "LAST YEAR TOTAL": 65000,
    "ACH (%) COMPARED TO LYS": "95.3%",
    "YTD SALES": 500000,
    "YTD LAST YEAR SALES": 450000,
    "YTD GROWTH": "11.1%",
    "QTD SALES": 150000,
    "QTD LAST YEAR SALES": 140000,
    "QTD GROWTH": "7.1%",
  },
  {
    "DIV NAME": "Cluster 1",
    "NET SALES (H)": 50000,
    "PENDING PICKLIST (L)": 3000,
    "O(H+L)": 53000,
    "PENDING ORDER (M)": 4000,
    "N(O+M)": 57000,
    "UNCONF ORDER VALUE (U)": 5000,
    "NET AMOUNT (N+U)": 62000,
    TARGET: 80000,
    "ACH (%)": "100.5%",
    "LAST MONTH UPTO DATE": 48000,
    "MOM GROWTH (%)": "8.3%",
    "LAST YEAR UPTO DATE": 45000,
    "YOY GROWTH (%)": "15.6%",
    "LAST MONTH TOTAL": 70000,
    "ACH (%) COMPARED TO LMS": "88.6%",
    "LAST YEAR TOTAL": 65000,
    "ACH (%) COMPARED TO LYS": "95.3%",
    "YTD SALES": 500000,
    "YTD LAST YEAR SALES": 450000,
    "YTD GROWTH": "11.1%",
    "QTD SALES": 150000,
    "QTD LAST YEAR SALES": 140000,
    "QTD GROWTH": "7.1%",
  },
  {
    "DIV NAME": "Suprema",
    "NET SALES (H)": 50000,
    "PENDING PICKLIST (L)": 3000,
    "O(H+L)": 53000,
    "PENDING ORDER (M)": 4000,
    "N(O+M)": 57000,
    "UNCONF ORDER VALUE (U)": 5000,
    "NET AMOUNT (N+U)": 62000,
    TARGET: 80000,
    "ACH (%)": "100.5%",
    "LAST MONTH UPTO DATE": 48000,
    "MOM GROWTH (%)": "8.3%",
    "LAST YEAR UPTO DATE": 45000,
    "YOY GROWTH (%)": "15.6%",
    "LAST MONTH TOTAL": 70000,
    "ACH (%) COMPARED TO LMS": "88.6%",
    "LAST YEAR TOTAL": 65000,
    "ACH (%) COMPARED TO LYS": "95.3%",
    "YTD SALES": 500000,
    "YTD LAST YEAR SALES": 450000,
    "YTD GROWTH": "11.1%",
    "QTD SALES": 150000,
    "QTD LAST YEAR SALES": 140000,
    "QTD GROWTH": "7.1%",
  },
  // Add more rows here as needed
];

export default function SalesTable() {
  const [density, setDensity] = useState("compact");
  const columns = [
    {
      accessorKey: "DIV NAME",
      header: "Division Name",
      muiTableHeadCellProps: {
        style: {
          position: "sticky",
          left: 0,
          zIndex: 100,
          backgroundColor: "#0033c4",
          color: "white",
          border: "2px solid black",
        },
      },
      muiTableBodyCellProps: {
        style: {
          position: "sticky",
          left: 0,
          zIndex: 50,
          backgroundColor: "#f3f3f3", // Ensures it has a background when scrolling
          border: "2px solid black",
        },
      },
    },
    { accessorKey: "NET SALES (H)", header: "Net Sales (H)" },
    { accessorKey: "PENDING PICKLIST (L)", header: "Pending Picklist (L)" },
    { accessorKey: "O(H+L)", header: "O (H+L)" },
    { accessorKey: "PENDING ORDER (M)", header: "Pending Order (M)" },
    { accessorKey: "N(O+M)", header: "N (O+M)" },
    {
      accessorKey: "UNCONF ORDER VALUE (U)",
      header: "Unconf. Order Value (U)",
    },
    {
      accessorKey: "NET AMOUNT (N+U)",
      header: "Net Amount (N+U)",
      muiTableBodyCellProps: ({ cell }) => ({
        style: { backgroundColor: "red", color: "white" },
      }),
    },
    { accessorKey: "TARGET", header: "Target" },
    //   {
    //     accessorKey: "TARGET",
    //     header: "Target",
    //     muiTableBodyCellProps: ({ cell }) => ({
    //       style: { backgroundColor: "red", color: "white" },
    //     }),
    //   },
    {
      accessorKey: "ACH (%)",
      header: "ACH (%)",
      muiTableBodyCellProps: ({ cell }) => {
        const value = parseFloat(cell.getValue().replace("%", ""));
        return {
          style: {
            backgroundColor: value > 100 ? "green" : "red",
            color: "white",
          },
        };
      },
    },
    { accessorKey: "LAST MONTH UPTO DATE", header: "Last Month Upto Date" },
    { accessorKey: "MOM GROWTH (%)", header: "MoM Growth (%)" },
    { accessorKey: "LAST YEAR UPTO DATE", header: "Last Year Upto Date" },
    { accessorKey: "YOY GROWTH (%)", header: "YoY Growth (%)" },
    { accessorKey: "LAST MONTH TOTAL", header: "Last Month Total" },
    {
      accessorKey: "ACH (%) COMPARED TO LMS",
      header: "ACH (%) Compared to LMS",
    },
    { accessorKey: "LAST YEAR TOTAL", header: "Last Year Total" },
    {
      accessorKey: "ACH (%) COMPARED TO LYS",
      header: "ACH (%) Compared to LYS",
    },
    { accessorKey: "YTD SALES", header: "YTD Sales" },
    { accessorKey: "YTD LAST YEAR SALES", header: "YTD Last Year Sales" },
    { accessorKey: "YTD GROWTH", header: "YTD Growth" },
    { accessorKey: "QTD SALES", header: "QTD Sales" },
    { accessorKey: "QTD LAST YEAR SALES", header: "QTD Last Year Sales" },
    { accessorKey: "QTD GROWTH", header: "QTD Growth" },
  ];

  return (
    <MaterialReactTable
      data={data}
      columns={columns}
      enablePagination={false}
      state={{ density }} // Apply density state
      onDensityChange={setDensity} // Handle density change
      initialState={{
        columnVisibility: {
          "PENDING PICKLIST (L)": false, // Hide this column by default
        },
      }}
      enableSorting={false}
      enableColumnFilters={false}
      enableColumnActions={false}
      muiTableProps={{
        style: {
          border: "2px solid black",
          borderCollapse: "collapse",
        },
      }}
      muiTableBodyCellProps={({ column }) => ({
        style: {
          border: "2px solid black",
          textAlign:
            column.columnDef.accessorKey &&
            [
              "NET SALES (H)",
              "PENDING PICKLIST (L)",
              "O(H+L)",
              "PENDING ORDER (M)",
              "N(O+M)",
              "UNCONF ORDER VALUE (U)",
              "NET AMOUNT (N+U)",
              "TARGET",
              "LAST MONTH UPTO DATE",
              "MOM GROWTH (%)",
              "LAST YEAR UPTO DATE",
              "YOY GROWTH (%)",
              "LAST MONTH TOTAL",
              "ACH (%) COMPARED TO LMS",
              "LAST YEAR TOTAL",
              "ACH (%) COMPARED TO LYS",
              "YTD SALES",
              "YTD LAST YEAR SALES",
              "YTD GROWTH",
              "QTD SALES",
              "QTD LAST YEAR SALES",
              "QTD GROWTH",
            ].includes(column.columnDef.header)
              ? "right"
              : "right",
        },
      })}
      muiTableHeadCellProps={{
        style: {
          border: "2px solid black",
          backgroundColor: "#0033c4",
          color: "white",
          textAlign: "center",
        },
      }}
      muiTableBodyRowProps={({ row }) => ({
        className: row.original["DIV NAME"] === "Cluster 1" ? "grayRow" : "", // Apply custom class
      })}
      //   muiTableBodyRowProps={({ row }) => ({

      //     style: {
      //       backgroundColor:
      //         row.original["DIV NAME"] === "Cluster 1" ? "gray" : "white",
      //     },
      //   })}
      // Conditional row styling based on "DIV NAME" value
    />
  );
}
