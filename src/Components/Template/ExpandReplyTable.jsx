import React, { useState, useEffect } from 'react';

const ExpandReplyTable = ({ columns, rows, data }) => {
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

    // Function to get the last two data entries
    const getLastTwoData = (row) => {
        const entries = Object.entries(row);
        return entries.slice(-2); // Get last two entries
    };

    return (
        <div>
            <div className="row">
                <div className="ml-auto col-md-6 col-lg-3 form-group float-right">
                    <div className="input-group">
                        <input type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="form-control" />
                    </div>
                </div>
            </div>

            <div className="table-responsive">
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
                                                    <table className="table table-sm border w-50 bg-white mb-3">
                                                        <thead>
                                                            {Object.entries(row).map(([key, value], idx) => (
                                                                (key !== 'msgType' && key !== 'dataReplyText') && (
                                                                    <tr key={idx}>
                                                                        <th className='border rounded-0 align-middle'>{rows.find(row => row.key === key)?.label}</th>
                                                                        <td>{value !== undefined ? value : 'N/A'}</td>
                                                                    </tr>
                                                                )
                                                            ))}
                                                        </thead>
                                                    </table>

                                                    <table className="table border table-sm w-50 bg-white">
                                                        <thead>
                                                            <tr>
                                                                {getLastTwoData(row).map(([key], idx) => (
                                                                    <th className='border-right rounded-0' key={idx}>
                                                                        {rows.find(r => r.key === key)?.label}
                                                                    </th>
                                                                ))}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                {getLastTwoData(row).map(([_, value], idx) => (
                                                                    <td key={idx} className='border p-0'>
                                                                        {value !== undefined ? value.split('\n').map((line, index) => (
                                                                            <p className='p-2 mb-0 border-bottom' key={index}>{line} <br /></p>
                                                                        )) : 'N/A'}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        </tbody>
                                                    </table>
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
        </div>
    );
}

export default ExpandReplyTable;