import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

export const add_to_card = createAsyncThunk(
    'card/add_to_card',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/home/product/add-to-card', info)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_card_products = createAsyncThunk(
    'card/get_card_products',
    async (userId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/product/get-card-product/${userId}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const cardReducer = createSlice({
    name: 'card',
    initialState: {
        card_products: [],
        card_product_count: 0,
        buy_product_item: 0,
        wishlist_count: 0,
        wishlist: [],
        price: 0,
        errorMessage: '',
        successMessage: '',
        shipping_fee: 0,
        outofstock_products: []
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_to_card.fulfilled, (state, action) => {
                state.successMessage = action.payload.message
                state.card_product_count += 1
            })
            .addCase(add_to_card.rejected, (state, action) => {
                state.errorMessage = action.payload.error
            })
    }
})

export const { messageClear } = cardReducer.actions
export default cardReducer.reducer