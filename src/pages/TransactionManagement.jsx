import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setShowDetailsModal,
  setSelectedTransaction,
  setFilterDateRange,
  setFilterMerchant,
  setFilterStatus,
  setFilterAmountRange,
  setCurrentPage,
} from '../features/transactionManagement/transactionManagementSlice';
import { FaCloudDownloadAlt } from 'react-icons/fa';

const TransactionManagement = () => {
  const dispatch = useDispatch();
  const {
    transactions,
    showDetailsModal,
    selectedTransaction,
    filterDateRange,
    filterMerchant,
    filterStatus,
    filterAmountRange,
    currentPage,
    transactionsPerPage,
  } = useSelector((state) => state.transactionManagement);



  // Filter transactions based on filter states
  const filteredTransactions = transactions.filter(transaction => {
    const matchesDate = filterDateRange === '' || transaction.date.includes(filterDateRange);
    const matchesMerchant = filterMerchant === '' || transaction.merchant.toLowerCase().includes(filterMerchant.toLowerCase());
    const matchesStatus = filterStatus === '' || transaction.status.toLowerCase().includes(filterStatus.toLowerCase());
    const matchesAmount = filterAmountRange === '' || (
      parseFloat(transaction.amount) >= parseFloat(filterAmountRange.split('-')[0] || 0) &&
      parseFloat(transaction.amount) <= parseFloat(filterAmountRange.split('-')[1] || Infinity)
    );
    return matchesDate && matchesMerchant && matchesStatus && matchesAmount;
  });



  // Get current transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Change page
  const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredTransactions.length / transactionsPerPage); i++) {
    pageNumbers.push(i);
  }

  const openDetailsModal = (transaction) => {
    dispatch(setSelectedTransaction(transaction));
    dispatch(setShowDetailsModal(true));
  };

  const closeDetailsModal = () => {
    dispatch(setShowDetailsModal(false));
    dispatch(setSelectedTransaction(null));
  };

  const handleApprove = () => {
    alert(`Transaction ${selectedTransaction.id} Approved`);
    closeDetailsModal();
  };

  const handleReject = () => {
    alert(`Transaction ${selectedTransaction.id} Rejected`);
    closeDetailsModal();
  };

  const handleExportCSV = () => {
    const headers = Object.keys(transactions[0]).join(',');
    const csv = transactions.map(t => Object.values(t).join(',')).join('\n');
    const fullCsv = headers + '\n' + csv;
    const blob = new Blob([fullCsv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'transactions.csv');
    a.click();
    alert('Exporting to CSV...');
  };

  const handleExportExcel = () => {
    alert('Exporting data to Excel (placeholder)...');
    // For actual Excel export, consider using a library like 'xlsx'
    // Example: https://github.com/SheetJS/sheetjs
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Transaction Management</h2>

      {/* Filters and Export Buttons */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Filters</h3>
        <div className="flex flex-wrap gap-4 mb-4">
          <input type="text" placeholder="Date Range" className="p-2 border rounded dark:bg-gray-700 dark:text-white" value={filterDateRange} onChange={(e) => dispatch(setFilterDateRange(e.target.value))} />
          <input type="text" placeholder="Merchant" className="p-2 border rounded dark:bg-gray-700 dark:text-white" value={filterMerchant} onChange={(e) => dispatch(setFilterMerchant(e.target.value))} />
          <input type="text" placeholder="Status" className="p-2 border rounded dark:bg-gray-700 dark:text-white" value={filterStatus} onChange={(e) => dispatch(setFilterStatus(e.target.value))} />
          <input type="text" placeholder="Amount Range" className="p-2 border rounded dark:bg-gray-700 dark:text-white" value={filterAmountRange} onChange={(e) => dispatch(setFilterAmountRange(e.target.value))} />
          <div className="flex gap-4">
            <button onClick={handleExportCSV} className="flex items-center justify-center gap-2 !bg-green-600 !hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              <FaCloudDownloadAlt /> <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Transaction List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">Transaction ID</th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">Merchant</th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">Customer</th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">Amount</th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">Status</th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">Date</th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">Payment Gateway</th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="py-2 px-4 border-b dark:text-gray-400">{transaction.id}</td>
                  <td className="py-2 px-4 border-b dark:text-gray-400">{transaction.merchant}</td>
                  <td className="py-2 px-4 border-b dark:text-gray-400">{transaction.customer}</td>
                  <td className="py-2 px-4 border-b dark:text-gray-400">${transaction.amount.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b dark:text-gray-400">{transaction.status}</td>
                  <td className="py-2 px-4 border-b dark:text-gray-400">{transaction.date}</td>
                  <td className="py-2 px-4 border-b dark:text-gray-400">{transaction.gateway}</td>
                  <td className="py-2 px-4 border-b dark:text-gray-400">
                    <button onClick={() => openDetailsModal(transaction)} className="text-blue-500 hover:underline flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
                {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Previous
            </button>
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 ${currentPage === number ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-900 dark:border-indigo-500 dark:text-indigo-300' : ''}`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Next
            </button>
          </nav>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {showDetailsModal && selectedTransaction && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-1/2">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Transaction Details: {selectedTransaction.id}</h3>
            <div className="mb-4">
              <p className="text-gray-700 dark:text-gray-300"><strong>Merchant:</strong> {selectedTransaction.merchant}</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Customer:</strong> {selectedTransaction.customer}</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Amount:</strong> ${selectedTransaction.amount.toFixed(2)}</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Status:</strong> {selectedTransaction.status}</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Date:</strong> {selectedTransaction.date}</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Payment Gateway:</strong> {selectedTransaction.gateway}</p>
              {/* Add more details like transaction logs, customer details, gateway response */}
              <p className="text-gray-700 dark:text-gray-300 mt-4"><strong>Transaction Logs:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Customer Details:</strong> Email: {selectedTransaction.customer.toLowerCase().replace(' ', '.')}@example.com, Phone: +1234567890</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Gateway Response:</strong> Success (simulated)</p>
            </div>
            <div className="flex justify-end">
              {selectedTransaction.status === 'Pending' && (
                <>
                  <button onClick={handleApprove} className="!bg-green-600 !hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">Approve</button>
                  <button onClick={handleReject} className="!bg-red-600 !hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">Reject</button>
                </>
              )}
              <button onClick={closeDetailsModal} className="!bg-orange-500 !hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionManagement;