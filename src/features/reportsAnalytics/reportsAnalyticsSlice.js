import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialData = [];
const initialPieData = [];

export const fetchReportsData = createAsyncThunk(
  'reportsAnalytics/fetchReportsData',
  async () => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { id: 1, date: '2023-01-01', merchant: 'Merchant A', gateway: 'Gateway X', amount: 1500, status: 'Completed' },
          { id: 2, date: '2023-01-02', merchant: 'Merchant B', gateway: 'Gateway Y', amount: 2500, status: 'Pending' },
          { id: 3, date: '2023-01-03', merchant: 'Merchant A', gateway: 'Gateway X', amount: 1000, status: 'Completed' },
          { id: 4, date: '2023-01-04', merchant: 'Merchant C', gateway: 'Gateway Z', amount: 3000, status: 'Failed' },
          { id: 5, date: '2023-01-05', merchant: 'Merchant B', gateway: 'Gateway Y', amount: 1800, status: 'Completed' },
          { id: 6, date: '2023-01-06', merchant: 'Merchant A', gateway: 'Gateway Y', amount: 2200, status: 'Completed' },
          { id: 7, date: '2023-01-07', merchant: 'Merchant B', gateway: 'Gateway X', amount: 900, status: 'Pending' },
          { id: 8, date: '2023-01-08', merchant: 'Merchant C', gateway: 'Gateway Z', amount: 4000, status: 'Completed' },
          { id: 9, date: '2023-01-09', merchant: 'Merchant A', gateway: 'Gateway X', amount: 1300, status: 'Failed' },
          { id: 10, date: '2023-01-10', merchant: 'Merchant B', gateway: 'Gateway Y', amount: 3100, status: 'Completed' },
        ]);
      }, 1000);
    });
  }
);

const reportsAnalyticsSlice = createSlice({
  name: 'reportsAnalytics',
  initialState: {
    dateRange: '',
    merchant: '',
    paymentGateway: '',
    data: initialData, // All fetched data
    filteredData: initialData, // Data for the table
    lineChartData: [], // Data for the line chart
    filteredPieData: initialPieData,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setMerchant: (state, action) => {
      state.merchant = action.payload;
    },
    setPaymentGateway: (state, action) => {
      state.paymentGateway = action.payload;
    },
    applyFilters: (state) => {
      let tempFilteredData = state.data;

      if (state.dateRange) {
        tempFilteredData = tempFilteredData.filter(item => item.date === state.dateRange);
      }
      if (state.merchant) {
        tempFilteredData = tempFilteredData.filter(item => item.merchant === state.merchant);
      }
      if (state.paymentGateway) {
        tempFilteredData = tempFilteredData.filter(item => item.gateway === state.paymentGateway);
      }

      state.filteredData = tempFilteredData;

      // Aggregate data for LineChart
      const aggregatedData = tempFilteredData.reduce((acc, item) => {
        const date = item.date;
        if (!acc[date]) {
          acc[date] = { name: date, transactions: 0, revenue: 0 };
        }
        acc[date].transactions += 1;
        acc[date].revenue += item.amount;
        return acc;
      }, {});
      state.lineChartData = Object.values(aggregatedData).sort((a, b) => new Date(a.name) - new Date(b.name));

      const completed = tempFilteredData.filter(item => item.status === 'Completed').length;
      const pending = tempFilteredData.filter(item => item.status === 'Pending').length;
      const failed = tempFilteredData.filter(item => item.status === 'Failed').length;

      state.filteredPieData = [
        { name: 'Completed', value: completed },
        { name: 'Pending', value: pending },
        { name: 'Failed', value: failed },
      ];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReportsData.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchReportsData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        // Apply initial filters after data is fetched
        let tempFilteredData = action.payload;
        if (state.dateRange) {
          tempFilteredData = tempFilteredData.filter(item => item.date === state.dateRange);
        }
        if (state.merchant) {
          tempFilteredData = tempFilteredData.filter(item => item.merchant === state.merchant);
        }
        if (state.paymentGateway) {
          tempFilteredData = tempFilteredData.filter(item => item.gateway === state.paymentGateway);
        }
        state.filteredData = tempFilteredData;

        // Aggregate data for LineChart
        const aggregatedData = tempFilteredData.reduce((acc, item) => {
          const date = item.date;
          if (!acc[date]) {
            acc[date] = { name: date, transactions: 0, revenue: 0 };
          }
          acc[date].transactions += 1;
          acc[date].revenue += item.amount;
          return acc;
        }, {});
        state.lineChartData = Object.values(aggregatedData).sort((a, b) => new Date(a.name) - new Date(b.name));

        const completed = tempFilteredData.filter(item => item.status === 'Completed').length;
        const pending = tempFilteredData.filter(item => item.status === 'Pending').length;
        const failed = tempFilteredData.filter(item => item.status === 'Failed').length;

        state.filteredPieData = [
          { name: 'Completed', value: completed },
          { name: 'Pending', value: pending },
          { name: 'Failed', value: failed },
        ];
      })
      .addCase(fetchReportsData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setDateRange, setMerchant, setPaymentGateway, applyFilters } = reportsAnalyticsSlice.actions;

export default reportsAnalyticsSlice.reducer;