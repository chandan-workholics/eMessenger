import React, { useState, useEffect } from 'react';

const ExpandRowTable = ({ columns, rows, data }) => {
    const [tableData, setTableData] = useState(data || []);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(data || []);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [expandedRows, setExpandedRows] = useState([]);

    useEffect(() => {
        setTableData(data);
        setFilteredData(data);
    }, [data]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const lowercasedFilter = value.toLowerCase();
        const filteredResults = tableData.filter(item =>
            columns.some(column =>
                String(item[column.key]).toLowerCase().includes(lowercasedFilter)
            )
        );
        setFilteredData(filteredResults);
    };

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

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending'
            ? <i className="fa-solid fa-arrow-up-short-wide"></i>
            : <i className="fa-solid fa-arrow-up-wide-short"></i>;
    };

    const toggleExpandRow = (rowIndex) => {
        if (expandedRows.includes(rowIndex)) {
            setExpandedRows(expandedRows.filter((index) => index !== rowIndex));
        } else {
            setExpandedRows([...expandedRows, rowIndex]);
        }
    };

    return (
        <div>
            <div className="row w-100">
                <div className="ml-auto col-md-3 form-group">
                    <div className="input-group">
                        <input type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="form-control" />
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
                        <th></th>
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
                                <tr>
                                    {columns.map((column) => (
                                        <td key={column.key}>
                                            {column.key === 'action' ? row[column.key] : row[column.key] !== undefined ? row[column.key].toString() : ''}
                                        </td>
                                    ))}
                                    <td className='p-0 px-2'>
                                        <button className='border-0 bg-transparent w-100' onClick={() => toggleExpandRow(rowIndex)} style={{ height: '40px' }}>
                                            {expandedRows.includes(rowIndex) ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
                                        </button>
                                    </td>
                                </tr>
                                {expandedRows.includes(rowIndex) && (
                                    <tr>
                                        <td colSpan={columns.length + 1} style={{ backgroundColor: '#eaeaf1' }} className='rounded-bottom'>
                                            <div className="expanded-content">
                                                <p><strong>Additional Details:</strong></p>
                                                <ul>
                                                    {Object.entries(row).map(([key, value], idx) => (
                                                        <li key={idx}>
                                                            <strong>{key}:</strong> {value !== undefined ? value : 'N/A'}
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
