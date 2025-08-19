import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  kycRequests: [
    {
      id: 1,
      merchantName: 'Merchant A',
      submissionDate: '2023-10-25',
      status: 'Pending',
      documents: {
        id: 'https://via.placeholder.com/300x200?text=ID+Card',
        businessLicense: 'https://via.placeholder.com/300x200?text=Business+License',
      },
    },
    {
      id: 2,
      merchantName: 'Merchant B',
      submissionDate: '2023-10-20',
      status: 'Approved',
      documents: {
        id: 'https://via.placeholder.com/300x200?text=ID+Card',
        businessLicense: 'https://via.placeholder.com/300x200?text=Business+License',
      },
    },
    {
      id: 3,
      merchantName: 'Merchant C',
      submissionDate: '2023-10-22',
      status: 'Rejected',
      documents: {
        id: 'https://via.placeholder.com/300x200?text=ID+Card',
        businessLicense: 'https://via.placeholder.com/300x200?text=Business+License',
      },
    },
  ],
  showFeedbackModal: false,
  selectedRequest: null,
  feedback: '',
  documentViewerOpen: false,
  currentDocument: '',
  showFlagModal: false,
  flagReason: '',
  searchTerm: '',
};

const kycComplianceSlice = createSlice({
  name: 'kycCompliance',
  initialState,
  reducers: {
    setKycRequests: (state, action) => {
      state.kycRequests = action.payload;
    },
    setShowFeedbackModal: (state, action) => {
      state.showFeedbackModal = action.payload;
    },
    setSelectedRequest: (state, action) => {
      state.selectedRequest = action.payload;
    },
    setFeedback: (state, action) => {
      state.feedback = action.payload;
    },
    setDocumentViewerOpen: (state, action) => {
      state.documentViewerOpen = action.payload;
    },
    setCurrentDocument: (state, action) => {
      state.currentDocument = action.payload;
    },
    setShowFlagModal: (state, action) => {
      state.showFlagModal = action.payload;
    },
    setFlagReason: (state, action) => {
      state.flagReason = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    approveRejectRequest: (state, action) => {
      const { id, actionType } = action.payload;
      state.kycRequests = state.kycRequests.map((req) =>
        req.id === id
          ? { ...req, status: actionType === 'approve' ? 'Approved' : 'Rejected' }
          : req
      );
    },
    resetFeedbackAndSelection: (state) => {
      state.showFeedbackModal = false;
      state.selectedRequest = null;
      state.feedback = '';
    },
    resetDocumentViewer: (state) => {
      state.documentViewerOpen = false;
      state.currentDocument = '';
    },
    resetFlagging: (state) => {
      state.showFlagModal = false;
      state.selectedRequest = null;
      state.flagReason = '';
    },
  },
});

export const {
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
} = kycComplianceSlice.actions;

export default kycComplianceSlice.reducer;