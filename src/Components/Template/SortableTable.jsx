import React, { useState, useEffect } from 'react';

const SortableTable = ({ columns, data }) => {
    const [tableData, setTableData] = useState(data || []); // Data state
    const [filteredData, setFilteredData] = useState(data || []); // Filtered data state
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10; // Number of rows per page

    useEffect(() => {
        setTableData(data); // Update table data when `data` prop changes
        setFilteredData(data); // Update filtered data when `data` prop changes
    }, [data]);

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Filter data based on search term
        const lowercasedFilter = value.toLowerCase();
        const filteredResults = tableData.filter(item =>
            columns.some(column =>
                String(item[column.key]).toLowerCase().includes(lowercasedFilter)
            )
        );
        setFilteredData(filteredResults);
        setCurrentPage(1); // Reset to first page when searching
    };

    // Function to handle sorting
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedData = [...filteredData].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setFilteredData(sortedData);
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
        return filteredData.slice(startIndex, startIndex + rowsPerPage);
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total number of pages
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    return (
        <div>
            {/* Search Input */}
            <div className="row w-100">
                <div class="ml-auto col-md-3 form-group">
                    <div class="input-group">
                        <input type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            class="form-control" />
                        <div class="input-group-append">
                            <button class="btn btn-sm btn-primary px-4" type="button">Filter</button>
                        </div>
                    </div>
                </div>
            </div>

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
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center">
                                <strong>Data Not Found</strong>
                            </td>
                        </tr>
                    ) : (
                        paginateData().map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column) => (
                                    <td key={column.key}>
                                        {column.key === 'action' ? row[column.key] : row[column.key] !== undefined ? row[column.key] : ''}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
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
