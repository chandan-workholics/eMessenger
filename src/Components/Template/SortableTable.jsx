import React, { useState, useEffect } from 'react';

const SortableTable = ({ columns, data }) => {
    const [tableData, setTableData] = useState(data || []); // Data state
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [currentPage, setCurrentPage] = useState(1);
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
                    </tr>
                </thead>
                <tbody>
                    {paginateData().map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column) => (
                                <td key={column.key}>
                                    {column.key === 'action' ? row[column.key] : row[column.key] !== undefined ? row[column.key] : ''}
                                </td>
                            ))}
                        </tr>
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
};

export default SortableTable;
