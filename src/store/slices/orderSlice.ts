import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiService, ApiResponse } from '../../services/api';
import { createAsyncThunkErrorHandler } from '../../utils/errorHandler';

export interface Order {
  id: number;
  sender: string;
  recipient: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchOrders = createAsyncThunk<Order[]>('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get<Order[]>('/deliveries/mine/');
    if (response.success) {
      return response.data!;
    } else {
      return rejectWithValue(response.message || 'Failed to fetch orders');
    }
  } catch (error) {
    const handleError = createAsyncThunkErrorHandler('Failed to fetch orders');
    return rejectWithValue(handleError(error));
  }
});

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
