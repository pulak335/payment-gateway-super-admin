import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { MdFileDownload } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import {
  setKycRequests,
  setShowFeedbackModal,
  setSelectedRequest,
  setFeedback,
  setDocumentViewerOpen,
  setCurrentDocument,
  setShowFlagModal,
  setFlagReason,
  setSearchTerm,
  approveRejectRequest,
  resetFeedbackAndSelection,
  resetDocumentViewer,
  resetFlagging,
} from '../features/kycCompliance/kycComplianceSlice';

const KYCCompliance = () => {
  const dispatch = useDispatch();
  const { kycRequests, showFeedbackModal, selectedRequest, feedback, documentViewerOpen, currentDocument, showFlagModal, flagReason, searchTerm } = useSelector((state) => state.kycCompliance);

  // Initialize kycRequests with sample data if empty (or fetch from API)
  // This is a placeholder, in a real app you'd fetch this data
  // useEffect(() => {
  //   if (kycRequests.length === 0) {
  //     dispatch(setKycRequests([
  //       {
  //         id: 1,
  //         merchantName: 'Merchant A',
  //         submissionDate: '2023-10-25',
  //         status: 'Pending',
  //         documents: {
  //           id: 'https://via.placeholder.com/300x200?text=ID+Card',
  //           businessLicense: 'https://via.placeholder.com/300x200?text=Business+License',
  //         },
  //       },
  //       {
  //         id: 2,
  //         merchantName: 'Merchant B',
  //         submissionDate: '2023-10-20',
  //         status: 'Approved',
  //         documents: {
  //           id: 'https://via.placeholder.com/300x200?text=ID+Card',
  //           businessLicense: 'https://via.placeholder.com/300x200?text=Business+License',
  //         },
  //       },
  //       {
  //         id: 3,
  //         merchantName: 'Merchant C',
  //         submissionDate: '2023-10-22',
  //         status: 'Rejected',
  //         documents: {
  //           id: 'https://via.placeholder.com/300x200?text=ID+Card',
  //           businessLicense: 'https://via.placeholder.com/300x200?text=Business+License',
  //         },
  //       },
  //     ]));
  //   }
  // }, [dispatch, kycRequests.length]);

  const handleApproveReject = (request, action) => {
    dispatch(setSelectedRequest({ ...request, action }));
    dispatch(setShowFeedbackModal(true));
  };

  const confirmAction = () => {
    if (selectedRequest) {
      dispatch(approveRejectRequest({ id: selectedRequest.id, actionType: selectedRequest.action }));
      console.log(`Feedback for ${selectedRequest.merchantName}: ${feedback}`);
      dispatch(resetFeedbackAndSelection());
    }
  };

  const cancelAction = () => {
    dispatch(resetFeedbackAndSelection());
  };

  const viewDocument = (docUrl) => {
    dispatch(setCurrentDocument(docUrl));
    dispatch(setDocumentViewerOpen(true));
  };

  const closeDocumentViewer = () => {
    dispatch(resetDocumentViewer());
  };

  const handleFlagMerchant = (request) => {
    dispatch(setSelectedRequest(request));
    dispatch(setShowFlagModal(true));
  };

  const confirmFlag = () => {
    if (selectedRequest) {
      console.log(`Flagging ${selectedRequest.merchantName} for reason: ${flagReason}`);
      // Logic to flag merchant (dispatch an action if flagging state needs to be managed in Redux)
      dispatch(resetFlagging());
    }
  };

  const filteredKycRequests = kycRequests.filter(request =>
    request.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadKycPdf = (request) => {
    const doc = new jsPDF();
    doc.text(`KYC Request Summary for ${request.merchantName}`, 10, 10);
    doc.text(`Submission Date: ${request.submissionDate}`, 10, 20);
    doc.text(`Status: ${request.status}`, 10, 30);
    doc.text(`Documents:`, 10, 40);
    doc.text(`  ID: ${request.documents.id}`, 10, 50);
    doc.text(`  Business License: ${request.documents.businessLicense}`, 10, 60);
    doc.save(`kyc_summary_${request.merchantName}.pdf`);
  };

  const cancelFlag = () => {
    dispatch(resetFlagging());
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">KYC & Compliance</h1>

      {/* KYC Requests Table */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">KYC Requests</h2>
        <div className="mb-4">
          <label htmlFor="kycSearch" className="block text-gray-700 text-sm font-bold mb-2">
            Search KYC Requests:
          </label>
          <input
            type="text"
            id="kycSearch"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Search by Merchant Name or Status"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Merchant Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Submission Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredKycRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{request.merchantName}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{request.submissionDate}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                        request.status === 'Approved' ? 'text-green-900' :
                        request.status === 'Pending' ? 'text-yellow-900' :
                        'text-red-900'
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-0 opacity-50 rounded-full ${
                          request.status === 'Approved' ? 'bg-green-200' :
                          request.status === 'Pending' ? 'bg-yellow-200' :
                          'bg-red-200'
                        }`}
                      ></span>
                      <span className="relative">{request.status}</span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex space-x-2">
                      {request.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApproveReject(request, 'approve')}
                            className="!bg-green-500 !hover:bg-green-600 text-white font-bold py-1 px-3 rounded-md text-xs"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleApproveReject(request, 'reject')}
                            className="!bg-red-500 !hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md text-xs"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => viewDocument(request.documents.id)}
                        className="!bg-blue-500 !hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-md text-xs"
                      >
                        View ID
                      </button>
                      <button
                        onClick={() => viewDocument(request.documents.businessLicense)}
                        className="!bg-blue-500 !hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-md text-xs"
                      >
                        View License
                      </button>
                      <button
                        onClick={() => handleFlagMerchant(request)}
                        className="!bg-yellow-500 !hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-md text-xs"
                      >
                        Flag
                      </button>
                      <button
                        onClick={() => handleDownloadKycPdf(request)}
                        className="!bg-purple-500 !hover:bg-purple-600 text-white font-bold py-1 px-3 rounded-md text-xs"
                      >
                        <MdFileDownload/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h3 className="text-lg font-bold mb-4">
              {selectedRequest.action === 'approve' ? 'Approve' : 'Reject'} KYC Request for {selectedRequest.merchantName}
            </h3>
            <div className="mb-4">
              <label htmlFor="feedback" className="block text-gray-700 text-sm font-bold mb-2">
                Feedback:
              </label>
              <textarea
                id="feedback"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelAction}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`font-bold py-2 px-4 rounded-md ${
                  selectedRequest.action === 'approve' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {selectedRequest.action === 'approve' ? 'Confirm Approve' : 'Confirm Reject'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      {documentViewerOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-xl max-w-3xl w-full">
            <div className="flex justify-end">
              <button
                onClick={closeDocumentViewer}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <img src={currentDocument} alt="Document Preview" className="w-full h-auto max-h-96 object-contain" />
          </div>
        </div>
      )}

      {/* Flag Merchant Modal */}
      {showFlagModal && selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h3 className="text-lg font-bold mb-4">Flag Merchant: {selectedRequest.merchantName}</h3>
            <div className="mb-4">
              <label htmlFor="flagReason" className="block text-gray-700 text-sm font-bold mb-2">
                Reason for Flagging:
              </label>
              <textarea
                id="flagReason"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                value={flagReason}
                onChange={(e) => setFlagReason(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelFlag}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmFlag}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Confirm Flag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KYCCompliance;