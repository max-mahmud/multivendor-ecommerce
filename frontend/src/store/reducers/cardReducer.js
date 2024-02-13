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

export const delete_card_product = createAsyncThunk(
    'card/delete_card_product',
    async (card_id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/home/product/delete-card-product/${card_id}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const quantity_inc = createAsyncThunk(
    'card/quantity_inc',
    async (card_id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/home/product/quantity-inc/${card_id}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const quantity_dec = createAsyncThunk(
    'card/quantity_dec',
    async (card_id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/home/product/quantity-dec/${card_id}`)
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
            .addCase(add_to_card.rejected, (state, action) => {
                state.errorMessage = action.payload.error;
            })
            .addCase(add_to_card.fulfilled, (state, action) => {
                state.successMessage = action.payload.message;
                state.card_product_count += 1;
            })
            .addCase(get_card_products.fulfilled, (state, action) => {
                const { card_products, price, card_product_count, shipping_fee, outOfStockProduct, buy_product_item } = action.payload;
                state.card_products = card_products;
                state.price = price;
                state.card_product_count = card_product_count;
                state.shipping_fee = shipping_fee;
                state.outofstock_products = outOfStockProduct;
                state.buy_product_item = buy_product_item;
            })
            .addCase(delete_card_product.fulfilled, (state, action) => {
                state.successMessage = action.payload.message;
            })
            .addCase(quantity_inc.fulfilled, (state, action) => {
                state.successMessage = action.payload.message;
            })
            .addCase(quantity_dec.fulfilled, (state, action) => {
                state.successMessage = action.payload.message;
            });
    },
})

export const { messageClear } = cardReducer.actions
export default cardReducer.reducer