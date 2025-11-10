// import React, { useState, useEffect } from 'react';

// const SortableTableTwo = ({ columns, data }) => {
//   const [tableData, setTableData] = useState(data || []);
//   const [filteredData, setFilteredData] = useState(data || []);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10; // adjust as needed

//   useEffect(() => {
//     setTableData(data);
//     setFilteredData(data);
//   }, [data]);

//   // 🔍 Search across all data
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     const lowercasedFilter = value.toLowerCase();

//     const filteredResults = tableData.filter((item) =>
//       columns.some((column) =>
//         String(item[column.key] ?? '').toLowerCase().includes(lowercasedFilter)
//       )
//     );

//     setFilteredData(filteredResults);
//     setCurrentPage(1);
//   };

//   // 🔃 Sorting
//   const handleSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }

//     const sortedData = [...filteredData].sort((a, b) => {
//       const aValue = a[key] ?? '';
//       const bValue = b[key] ?? '';
//       if (typeof aValue === 'number' && typeof bValue === 'number') {
//         return direction === 'ascending' ? aValue - bValue : bValue - aValue;
//       }
//       return direction === 'ascending'
//         ? String(aValue).localeCompare(String(bValue))
//         : String(bValue).localeCompare(String(aValue));
//     });

//     setSortConfig({ key, direction });
//     setFilteredData(sortedData);
//   };

//   const getSortIcon = (key) => {
//     if (sortConfig.key !== key) return null;
//     return sortConfig.direction === 'ascending' ? (
//       <i className="fa-solid fa-arrow-up-short-wide"></i>
//     ) : (
//       <i className="fa-solid fa-arrow-up-wide-short"></i>
//     );
//   };

//   // 📄 Pagination logic
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const paginateData = () => {
//     const startIndex = (currentPage - 1) * rowsPerPage;
//     return filteredData.slice(startIndex, startIndex + rowsPerPage);
//   };

//   const handlePageChange = (pageNumber) => {
//     if (pageNumber < 1 || pageNumber > totalPages) return;
//     setCurrentPage(pageNumber);
//   };

//   // ✨ Compact pagination display (with ellipsis)
//   const getVisiblePages = () => {
//     const pages = [];
//     const maxVisible = 5; // number of visible buttons before showing ellipsis

//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
//       if (currentPage <= 3) {
//         pages.push(1, 2, 3, 4, '...', totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
//       } else {
//         pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
//       }
//     }
//     return pages;
//   };

//   return (
//     <div>
//       {/* 🔍 Search */}
//       <div className="row mb-3">
//         <div className="ml-auto col-md-3 form-group">
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               className="form-control"
//             />
//           </div>
//         </div>
//       </div>

//       {/* 🧾 Table */}
//       <div className="table-responsive">
//         <table className="display expandable-table table-hover w-100 mb-4">
//           <thead>
//             <tr>
//               {columns.map((column) => (
//                 <th
//                   key={column.key}
//                   onClick={() => handleSort(column.key)}
//                   style={{ cursor: 'pointer' }}
//                 >
//                   {column.label} {getSortIcon(column.key)}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length === 0 ? (
//               <tr>
//                 <td colSpan={columns.length} className="text-center">
//                   <strong>Data Not Found</strong>
//                 </td>
//               </tr>
//             ) : (
//               paginateData().map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {columns.map((column) => (
//                     <td key={column.key}>
//                       {column.key === 'action'
//                         ? row[column.key]
//                         : row[column.key] ?? ''}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 🔢 Pagination */}
//       {filteredData.length > rowsPerPage && (
//         <nav>
//           <ul
//             className="pagination justify-content-center flex-wrap mb-0 mt-3"
//             style={{ flexWrap: 'wrap' }}
//           >
//             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//               <button
//                 className="page-link"
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </button>
//             </li>

//             {getVisiblePages().map((page, index) =>
//               page === '...' ? (
//                 <li key={index} className="page-item disabled">
//                   <span className="page-link">…</span>
//                 </li>
//               ) : (
//                 <li
//                   key={index}
//                   className={`page-item ${currentPage === page ? 'active' : ''}`}
//                 >
//                   <button
//                     className="page-link"
//                     onClick={() => handlePageChange(page)}
//                   >
//                     {page}
//                   </button>
//                 </li>
//               )
//             )}

//             <li
//               className={`page-item ${
//                 currentPage === totalPages ? 'disabled' : ''
//               }`}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </button>
//             </li>
//           </ul>
//         </nav>
//       )}
//     </div>
//   );
// };

// export default SortableTableTwo;




import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const SortableTableTwo = ({ columns, data }) => {
    const [tableData, setTableData] = useState(data || []);
    const [filteredData, setFilteredData] = useState(data || []);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10; // adjustable

    useEffect(() => {
        setTableData(data);
        setFilteredData(data);
    }, [data]);

    // 🔍 Search across all data
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const lowercasedFilter = value.toLowerCase();

        const filteredResults = tableData.filter((item) =>
            columns.some((column) =>
                String(item[column.key] ?? '').toLowerCase().includes(lowercasedFilter)
            )
        );

        setFilteredData(filteredResults);
        setCurrentPage(1);
    };

    // 🔃 Sorting
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedData = [...filteredData].sort((a, b) => {
            const aValue = a[key] ?? '';
            const bValue = b[key] ?? '';
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return direction === 'ascending' ? aValue - bValue : bValue - aValue;
            }
            return direction === 'ascending'
                ? String(aValue).localeCompare(String(bValue))
                : String(bValue).localeCompare(String(aValue));
        });

        setSortConfig({ key, direction });
        setFilteredData(sortedData);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? (
            <i className="fa-solid fa-arrow-up-short-wide"></i>
        ) : (
            <i className="fa-solid fa-arrow-up-wide-short"></i>
        );
    };

    // 📄 Pagination logic
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginateData = () => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        return filteredData.slice(startIndex, startIndex + rowsPerPage);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    // ✨ Compact pagination display (ellipsis)
    const getVisiblePages = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    // 📤 Export to Excel
    const exportToExcel = () => {
        // Convert filtered data to a format suitable for Excel
        const exportData = filteredData.map((item) => {
            const row = {};
            columns.forEach((col) => {
                if (col.key !== 'action') {
                    row[col.label] = item[col.key] ?? '';
                }
            });
            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(file, 'Data.xlsx');
    };

    return (
        <div>
            {/* Top Row: Search + Export */}
            <div className="row mb-3">
                <div className="col-md-6 d-flex align-items-center">
                    <button
                        className="btn btn-success btn-sm"
                        onClick={exportToExcel}
                    >
                        <i className="fa-solid fa-file-excel mr-2"></i> Export Excel
                    </button>
                </div>

                <div className="ml-auto col-md-3 form-group">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="form-control"
                        />
                    </div>
                </div>
            </div>

            {/* 🧾 Table */}
            <div className="table-responsive">
                <table className="display expandable-table table-hover w-100 mb-4">
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    onClick={() => handleSort(column.key)}
                                    style={{ cursor: 'pointer' }}
                                >
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
                                            {column.key === 'action'
                                                ? row[column.key]
                                                : row[column.key] ?? ''}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* 🔢 Pagination */}
            {filteredData.length > rowsPerPage && (
                <nav>
                    <ul
                        className="pagination justify-content-center flex-wrap mb-0 mt-3"
                        style={{ flexWrap: 'wrap' }}
                    >
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>

                        {getVisiblePages().map((page, index) =>
                            page === '...' ? (
                                <li key={index} className="page-item disabled">
                                    <span className="page-link">…</span>
                                </li>
                            ) : (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === page ? 'active' : ''}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                </li>
                            )
                        )}

                        <li
                            className={`page-item ${currentPage === totalPages ? 'disabled' : ''
                                }`}
                        >
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
            )}
        </div>
    );
};

export default SortableTableTwo;

