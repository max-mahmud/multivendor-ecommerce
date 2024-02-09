import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'
import { jwtDecode } from 'jwt-decode'

export const customer_register = createAsyncThunk(
    'auth/customer_register',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/customer/customer-register', info)
            localStorage.setItem('customerToken', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const customer_login = createAsyncThunk(
    'auth/customer_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/customer/customer-login', info)
            localStorage.setItem('customerToken', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


const decodeToken = (token) => {
    if (token) {
        const userInfo = jwtDecode(token)
        return userInfo
    } else {
        return ''
    }
}

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        loader: false,
        userInfo: decodeToken(localStorage.getItem('customerToken')),
        errorMessage: '',
        successMessage: ''
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(customer_register.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(customer_register.rejected, (state, action) => {
                state.errorMessage = action.payload.error;
                state.loader = false;
            })
            .addCase(customer_register.fulfilled, (state, action) => {
                const userInfo = decodeToken(action.payload.token);
                state.successMessage = action.payload.message;
                state.loader = false;
                state.userInfo = userInfo;
            })
            .addCase(customer_login.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(customer_login.rejected, (state, action) => {
                state.errorMessage = action.payload.error;
                state.loader = false;
            })
            .addCase(customer_login.fulfilled, (state, action) => {
                const userInfo = decodeToken(action.payload.token);
                state.successMessage = action.payload.message;
                state.loader = false;
                state.userInfo = userInfo;
            });
    },

})

export const { messageClear } = authReducer.actions
export default authReducer.reducer