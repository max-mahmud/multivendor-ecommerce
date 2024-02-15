import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

export const get_seller_request = createAsyncThunk(
    'seller/get_seller_request',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/request-seller-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_seller = createAsyncThunk(
    'seller/get_seller',
    async (sellerId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-seller/${sellerId}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const seller_status_update = createAsyncThunk(
    'seller/seller_status_update',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/seller-status-update`, info, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const create_stripe_connect_account = createAsyncThunk(
    'seller/create_stripe_connect_account',
    async () => {
        try {
            const { data: { url } } = await api.get(`/payment/create-stripe-connect-account`, { withCredentials: true })
            window.location.href = url
            // return fulfillWithValue(data)
        } catch (error) {
            //return rejectWithValue(error.response.data)
        }
    }
)

export const active_stripe_connect_account = createAsyncThunk(
    'seller/active_stripe_connect_account',
    async (activeCode, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/payment/active-stripe-connect-account/${activeCode}`, {}, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const sellerReducer = createSlice({
    name: 'seller',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        sellers: [],
        totalSeller: 0,
        seller: ''
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_seller_request.fulfilled, (state, { payload }) => {
                state.sellers = payload.sellers;
                state.totalSeller = payload.totalSeller;
            })
            .addCase(get_seller.fulfilled, (state, { payload }) => {
                state.seller = payload.seller;
            })
            .addCase(seller_status_update.fulfilled, (state, { payload }) => {
                state.seller = payload.seller;
                state.successMessage = payload.message;
            })
            .addCase(active_stripe_connect_account.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(active_stripe_connect_account.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.loader = false;
            })
            .addCase(active_stripe_connect_account.rejected, (state, { payload }) => {
                state.errorMessage = payload.message;
                state.loader = false;
            });
    },

})
export const { messageClear } = sellerReducer.actions
export default sellerReducer.reducer