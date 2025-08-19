import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentPage: 1,
  usersPerPage: 10,
  showModal: false,
  currentUser: null,
  formData: { name: '', email: '', role: '', password: '' },
  errors: {},
};

const backOfficeUserManagementSlice = createSlice({
  name: 'backOfficeUserManagement',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setUsersPerPage: (state, action) => {
      state.usersPerPage = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    resetFormData: (state) => {
      state.formData = { name: '', email: '', role: '', password: '' };
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const {
  setUsers,
  setCurrentPage,
  setUsersPerPage,
  setShowModal,
  setCurrentUser,
  setFormData,
  setErrors,
  resetFormData,
  addUser,
  updateUser,
  deleteUser,
} = backOfficeUserManagementSlice.actions;

export default backOfficeUserManagementSlice.reducer;