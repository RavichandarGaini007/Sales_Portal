import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MaterialReactTable } from 'material-react-table';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components
import HQModal from './HQModal';
import BrandModal from './BrandModal';
import HierarchicalPerformanceModal from './HierarchicalPerformanceModal';

const SalesPortalData = () => {
  const [data, setData] = useState([]); // State to store fetched data
  const [density, setDensity] = useState('compact');
  const [selectedDivName, setSelectedDivName] = useState(null); // State for selected "Div Name"
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [dropdownSelection, setDropdownSelection] = useState('hqwise'); // Default selection

  const handleDropdownChange = (e) => {
    setDropdownSelection(e.target.value); // Update dropdown selection
    // setShowModal(true); // Open modal when an option is selected
  };

  useEffect(() => {
    // Fetch data from API
    axios
      .get('https://sales.alkemcrm.com/NETCOREAPP/api/Sales/salesdata') // Replace with your API endpoint
      .then((response) => {
        setData(response.data.data); // Set the fetched data
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const columns = [
    {
      accessorKey: 'division',
      header: 'DIV',
      size: 50,
      muiTableHeadCellProps: {
        style: {
          position: 'sticky',
          left: 0, // Sticky on the left side
          zIndex: 100, // Ensures it stays on top when scrolling
          backgroundColor: '#eeeff8',
          color: 'black',
          border: '1px solid black',
          fontSize: '11px', // Decreased font size for header cells
        },
      },
      muiTableBodyCellProps: {
        style: {
          position: 'sticky',
          left: 0, // Sticky on the left side
          zIndex: 50, // Ensures it stays below the header when scrolling
          backgroundColor: '#f3f3f3',
          border: '1px solid black',
          textAlign: 'right',
          fontSize: '11px', // Decreased font size for header cells
        },
      },
    },
    {
      accessorKey: 'name',
      header: 'DIV NAME',
      size: 100,
      muiTableHeadCellProps: {
        style: {
          position: 'sticky',
          left: '50px', // Adjust based on previous column's width
          zIndex: 100, // Ensure this column stays on top as well
          backgroundColor: '#eeeff8',
          color: 'black',
          border: '1px solid black',
          fontSize: '11px', // Decreased font size for header cells
        },
      },
      muiTableBodyCellProps: ({ cell }) => ({
        style: {
          position: 'sticky',
          left: '50px', // Same as header, adjust for the previous column
          zIndex: 50, // Ensure this column stays under the header when scrolling
          backgroundColor: '#f3f3f3',
          border: '1px solid black',
          fontSize: '11px', // Decreased font size for header cells
          cursor: 'pointer', // Set cursor to pointer
        },
        onClick: () => {
          setSelectedDivName(cell.getValue()); // Set selected "Div Name"
          setShowModal(true); // Open modal
        },
      }),
    },
    { accessorKey: 'sale', header: 'GROSS SALE(A)', size: 50 },
    { accessorKey: 'saleable', header: 'SALEABLE RET. (B)', size: 50 },
    { accessorKey: 'nonsaleable', header: 'NON-SALEABLE RET. (C)', size: 50 },
    { accessorKey: 'diff', header: 'PRICE DIFF RET.(D)', size: 50 },
    { accessorKey: 'netsales', header: 'NET SALES (E=A-B-C-D)', size: 50 },
    {
      accessorKey: 'pend_pick',
      header: 'PENDING FOR INVOICE (F)',
      size: 50,
    },
    {
      accessorKey: 'pend_ord',
      header: 'PENDING FOR PACKING (G)',
      size: 50,
    },
    {
      accessorKey: 'pend_disp',
      header: 'PENDING FOR DISPATCHES H(F+G)',
      size: 50,
    },
    {
      accessorKey: 'unconf_ostd_ord',
      header: 'UNCONF DUE TO OS (I)',
      size: 50,
    },
    {
      accessorKey: 'unconf_stock',
      header: 'UNCONF DUE TO STOCK (J)',
      size: 50,
    },
    { accessorKey: 'unconf_total', header: 'TOTAL UNCONF (K=I+J)', size: 50 },
    { accessorKey: 'for_ord', header: 'SCORE CARD', size: 50 },
    {
      accessorKey: 'net_amt',
      header: 'NET AMOUNT (E+H+K)',
      size: 50,
      muiTableBodyCellProps: {
        style: {
          backgroundColor: 'red', // Set background color to red
          border: '1px solid black', // Keep consistent borders
          textAlign: 'right',
          fontSize: '11px',
          fontWeight: 'bold',
          color: 'white', // Optional: Change text color for contrast
        },
      },
    },
    { accessorKey: 'target', header: 'TARGET', size: 50 },
    {
      accessorKey: 'achv',
      header: 'ACH (%)',
      size: 50,
      muiTableBodyCellProps: {
        style: {
          backgroundColor: 'red', // Set background color to red
          border: '1px solid black', // Keep consistent borders
          textAlign: 'right',
          fontSize: '11px',
          fontWeight: 'bold',
          color: 'white', // Optional: Change text color for contrast
        },
      },
    },
    { accessorKey: 'varv', header: 'VAR', size: 50 },
    { accessorKey: 'percRet', header: '% RET', size: 50 },
    { accessorKey: 'lmtd', header: 'LAST MONTH UPTO DATE', size: 50 },
    { accessorKey: 'lymtd', header: 'LAST YEAR UPTO DATE', size: 50 },
    {
      accessorKey: 'lmgrowth',
      header: 'LAST MONTH UPTO DATE GROWTH',
      size: 50,
    },
    {
      accessorKey: 'growth',
      header: 'LAST YEAR UPTO DATE GROWTH',
      size: 50,
    },
    { accessorKey: 'lmtd1', header: 'LAST MONTH', size: 50 },
    { accessorKey: 'lymtd1', header: 'LAST YEAR', size: 50 },
    { accessorKey: 'growth_cy', header: 'LAST YEAR GROWTH', size: 50 },
  ];
  return (
    <>
      <div className="mt-2">
        <div className="page-header flex-wrap">
          <div className="header-left">
            {/* Dropdown Select */}
            Select :-
            <select
              className="form-select mb-2 mb-md-0 mr-2"
              style={{ width: '200px', display: 'inline-block' }}
              value={dropdownSelection}
              onChange={handleDropdownChange}
            >
              <option value="hqwise">HQ Wise</option>
              <option value="brandwise">Brand Wise</option>
              <option value="hwise">Hierarchical Wise</option>
              <option value="brmwise">Brand + Region + Material</option>
            </select>
          </div>
        </div>
      </div>
      <MaterialReactTable
        data={data}
        columns={columns}
        enablePagination={false}
        state={{ density }} // Apply density state
        onDensityChange={setDensity} // Handle density change
        enableSorting={false}
        enableColumnFilters={false}
        enableColumnActions={false}
        muiTableProps={{
          style: {
            border: '2px solid black',
            borderCollapse: 'collapse',
            fontSize: '11px', // Decreased font size for header cells
          },
        }}
        muiTableHeadProps={{
          style: {
            position: 'sticky',
            top: 0, // Ensures header is fixed to the top
            zIndex: 100, // Keeps the header above the content
            fontSize: '11px', // Decreased font size for header cells
          },
        }}
        muiTableHeadCellProps={{
          style: {
            border: '1px solid black', // Border for header cells
            backgroundColor: '#eeeff8',
            color: 'black',
            textAlign: 'center',
            fontSize: '11px', // Decreased font size for header cells
          },
        }}
        muiTableBodyCellProps={{
          style: {
            border: '1px solid black', // Border for body cells
            textAlign: 'right',
            fontSize: '11px', // Decreased font size for header cells
            fontWeight: 'bold',
          },
        }}
        muiTableContainerProps={{
          style: {
            maxHeight: '450px', // Set the maximum height for the table
            overflowY: 'auto', // Enable vertical scrolling
          },
        }}
        muiTableBodyRowProps={({ row }) => ({
          style: {
            backgroundColor:
              row.original.name === 'Cluster 1' ||
              row.original.name === 'Cluster 2' ||
              row.original.name === 'Cluster 3'
                ? 'gray' // Set the entire row's background color to gray
                : 'inherit', // Default background for other rows
          },
        })}
      />
      {/* Modal for HQ Wise Data */}
      <Modal
        show={showModal && dropdownSelection === 'hqwise'}
        onHide={() => setShowModal(false)}
        fullscreen={true} // Enables full-window modal
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>HQ Wise Data</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          {/* <div style={{ overflowX: "auto" }}> */}
          <HQModal divname={selectedDivName} />
          {/* </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal for HQ Wise Data */}
      <Modal
        show={showModal && dropdownSelection === 'brandwise'}
        onHide={() => setShowModal(false)}
        fullscreen={true} // Enables full-window modal
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Brand Wise Data</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <BrandModal divname={selectedDivName} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showModal && dropdownSelection === 'hwise'}
        onHide={() => setShowModal(false)}
        fullscreen={true} // Enables full-window modal
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Hierarchical Wise Data</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <HierarchicalPerformanceModal divname={selectedDivName} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SalesPortalData;
