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
export const add_info = createAsyncThunk(
    'auth/add_info',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/customer/add-info', info)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const profile_image_upload = createAsyncThunk(
    'auth/profile_image_upload',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/customer/profile-image-upload', info)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_profile_data = createAsyncThunk(
    'auth/get_profile_data',
    async (id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/customer/get-profile-data/${id}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/customer/change-password`, info)
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
        successMessage: '',
        profileData: ""
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        },
        user_reset: (state, _) => {
            state.userInfo = ""
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
            })
            .addCase(add_info.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(add_info.fulfilled, (state, action) => {
                state.successMessage = action.payload.message;
                state.profileData = action.payload.profileData;
                state.loader = false;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.errorMessage = action.payload.error;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.successMessage = action.payload.message;
            })
            .addCase(profile_image_upload.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(profile_image_upload.fulfilled, (state, action) => {
                state.loader = false;
                state.successMessage = action.payload.message;
                state.profileData = action.payload.profileData;
            })
            .addCase(get_profile_data.fulfilled, (state, action) => {
                state.profileData = action.payload.profileData;
            })
    },

})

export const { messageClear, user_reset } = authReducer.actions
export default authReducer.reducer