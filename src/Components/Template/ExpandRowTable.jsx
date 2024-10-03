import React, { useState, useEffect } from 'react';

const ExpandRowTable = ({ columns, data }) => {
    const [tableData, setTableData] = useState(data || []); // Data state
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedRows, setExpandedRows] = useState([]); // Track expanded rows
    const rowsPerPage = 10; // Number of rows per page

    useEffect(() => {
        setTableData(data); // Update table data when `data` prop changes
    }, [data]);

    // Function to handle sorting
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedData = [...tableData].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setTableData(sortedData);
    };

    // Display the sorting icon
    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending'
            ? <i className="fa-solid fa-arrow-up-short-wide"></i>
            : <i className="fa-solid fa-arrow-up-wide-short"></i>;
    };

    // Toggle the expanded state of a row
    const toggleExpandRow = (rowIndex) => {
        if (expandedRows.includes(rowIndex)) {
            setExpandedRows(expandedRows.filter((index) => index !== rowIndex));
        } else {
            setExpandedRows([...expandedRows, rowIndex]);
        }
    };

    // Paginate the data
    const paginateData = () => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        return tableData.slice(startIndex, startIndex + rowsPerPage);
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total number of pages
    const totalPages = Math.ceil(tableData.length / rowsPerPage);

    return (
        <div>
            <table id='example' className="display expandable-table table-hover w-100 mb-4">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} onClick={() => handleSort(column.key)}>
                                {column.label} {getSortIcon(column.key)}
                            </th>
                        ))}
                        <th></th> {/* Column for Expand/Collapse button */}
                    </tr>
                </thead>
                <tbody>
                    {paginateData().map((row, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            {/* Main Row */}
                            <tr>
                                {columns.map((column) => (
                                    <td key={column.key} className=''>
                                        {column.key === 'action' ? row[column.key] : row[column.key] !== undefined ? row[column.key].toString() : ''}
                                    </td>
                                ))}
                                <td className='p-0 px-2'>
                                    {/* Expand/Collapse Button */}
                                    <button className='border-0 bg-transparent w-100' onClick={() => toggleExpandRow(rowIndex)} style={{ height: '40px' }}>
                                        {expandedRows.includes(rowIndex) ? <i class="fa-solid fa-angle-up"></i> : <i class="fa-solid fa-angle-down"></i>}
                                    </button>
                                </td>
                            </tr>

                            {/* Expanded Row */}
                            {expandedRows.includes(rowIndex) && (
                                <tr className=''>
                                    <td colSpan={columns.length + 1} style={{ backgroundColor: '#eaeaf1' }} className='rounded-bottom'>
                                        <div className="expanded-content">
                                            {/* Render any additional dynamic content for this row */}
                                            <p><strong>Additional Details:</strong></p>
                                            <ul>
                                                <li><strong>Detail 1:</strong> {row.detail1}</li>
                                                <li><strong>Detail 2:</strong> {row.detail2}</li>
                                                <li><strong>Detail 3:</strong> {row.detail3}</li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            {/* Pagination controls */}
            <nav>
                <ul className="pagination justify-content-end">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <li
                            key={index + 1}
                            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default ExpandRowTable
