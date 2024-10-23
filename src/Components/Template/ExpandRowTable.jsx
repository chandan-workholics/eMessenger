import React, { useState, useEffect } from 'react';

const ExpandRowTable = ({ columns, rows, data }) => {
    const [tableData, setTableData] = useState(data || []); // Data state
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [filteredData, setFilteredData] = useState(data || []); // Filtered data state
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [expandedRows, setExpandedRows] = useState([]); // Track expanded rows

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

    // Toggle the expanded state of a row
    const toggleExpandRow = (rowIndex) => {
        if (expandedRows.includes(rowIndex)) {
            setExpandedRows(expandedRows.filter((index) => index !== rowIndex));
        } else {
            setExpandedRows([...expandedRows, rowIndex]);
        }
    };

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
                        {/* <div class="input-group-append">
                            <button class="btn btn-sm btn-primary px-4" type="button">Filter</button>
                        </div> */}
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
                        <th></th> {/* Column for Expand/Collapse button */}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 1} className="text-center">
                                <strong>Data Not Found</strong>
                            </td>
                        </tr>
                    ) : (
                        filteredData.map((row, rowIndex) => (
                            <React.Fragment key={rowIndex}>
                                {/* Main Row */}
                                <tr>
                                    {columns.map((column) => (
                                        <td key={column.key}>
                                            {column.key === 'action' ? row[column.key] : row[column.key] !== undefined ? row[column.key].toString() : ''}
                                        </td>
                                    ))}
                                    <td className='p-0 px-2'>
                                        {/* Expand/Collapse Button */}
                                        <button className='border-0 bg-transparent w-100' onClick={() => toggleExpandRow(rowIndex)} style={{ height: '40px' }}>
                                            {expandedRows.includes(rowIndex) ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
                                        </button>
                                    </td>
                                </tr>

                                {/* Expanded Row */}
                                {expandedRows.includes(rowIndex) && (
                                    <tr>
                                        <td colSpan={columns.length + 1} style={{ backgroundColor: '#eaeaf1' }} className='rounded-bottom'>
                                            <div className="expanded-content">
                                                {/* Render any additional dynamic content for this row */}
                                                <p><strong>Additional Details:</strong></p>
                                                <ul>
                                                {rows.map((rows, idx) => (
                                                        <li key={idx}>
                                                            <strong>{rows.label}:</strong> {rows.key}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ExpandRowTable;
