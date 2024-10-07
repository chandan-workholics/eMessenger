import React, { useState, useEffect } from 'react';

const ExpandRowTable = ({ columns, rows, data }) => {
    const [tableData, setTableData] = useState(data || []); // Data state
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [expandedRows, setExpandedRows] = useState([]); // Track expanded rows

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
                    {tableData.map((row, rowIndex) => (
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
                                        {expandedRows.includes(rowIndex) ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
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
                                                <li>School ID: {row.schoolId}</li>
                                                <li>Full Name: {row.schoolFullName}</li>
                                                <li>Short Name: {row.shortName}</li>
                                                <li>Active: {row.isActive}</li>
                                                <li>Scroll News: {row.scrollNews}</li>
                                                <li>Font Color: {row.fontColor}</li>
                                                <li>Background Color: {row.backgroundColor}</li>
                                                <li>Added By: {row.addedBy}</li>
                                                <li>Added On: {row.addedOn}</li>
                                                <li>Edited By: {row.editBy}</li>
                                                <li>Edited On: {row.editOn}</li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ExpandRowTable;
