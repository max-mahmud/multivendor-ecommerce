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

export const add_to_wishlist = createAsyncThunk(
    'wishlist/add_to_wishlist',
    async (info, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {
                data
            } = await api.post('/home/product/add-to-wishlist', info)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_wishlist_products = createAsyncThunk(
    'wishlist/get_wishlist_products',
    async (userId, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {
                data
            } = await api.get(`/home/product/get-wishlist-products/${userId}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const remove_wishlist = createAsyncThunk(
    'wishlist/remove_wishlist',
    async (wishlistId, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {
                data
            } = await api.delete(`/home/product/delete-wishlist-product/${wishlistId}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const add_to_compare = createAsyncThunk(
    'compare/add_to_compare',
    async (info, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {
                data
            } = await api.post('/home/product/add-to-compare', info)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_compare_products = createAsyncThunk(
    'compare/get_compare_products',
    async (userId, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {
                data
            } = await api.get(`/home/product/get-compare-products/${userId}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const remove_compare = createAsyncThunk(
    'compare/remove_compare',
    async (compareId, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {
                data
            } = await api.delete(`/home/product/delete-compare-product/${compareId}`)
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
        comparelist_count: 0,
        comparelist: [],
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
        },
        reset_count: (state, _) => {
            state.card_product_count = 0
            state.wishlist_count = 0
            state.comparelist_count = 0
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
            })
            .addCase(add_to_wishlist.rejected, (state, action) => {
                state.errorMessage = action.payload.error;
            })
            .addCase(add_to_wishlist.fulfilled, (state, action) => {
                state.successMessage = action.payload.message;
                state.wishlist_count = state.wishlist_count > 0 ? state.wishlist_count + 1 : 1;
            })
            .addCase(get_wishlist_products.fulfilled, (state, action) => {
                state.wishlist = action.payload.wishlists;
                state.wishlist_count = action.payload.wishlistCount;
            })
            .addCase(remove_wishlist.fulfilled, (state, action) => {
                state.successMessage = action.payload.message;
                state.wishlist = state.wishlist.filter(p => p._id !== action.payload.wishlistId);
                state.wishlist_count -= 1;
            })
            .addCase(add_to_compare.rejected, (state, action) => {
                state.errorMessage = action.payload.error;
            })
            .addCase(add_to_compare.fulfilled, (state, action) => {
                state.successMessage = action.payload.message;
                state.comparelist_count = state.comparelist_count > 0 ? state.comparelist_count + 1 : 1;
            })
            .addCase(get_compare_products.fulfilled, (state, action) => {
                state.comparelist = action.payload.comparelist;
                state.comparelist_count = action.payload.compareCount;
            })
            .addCase(remove_compare.fulfilled, (state, action) => {
                state.successMessage = action.payload.message;
                state.comparelist = state.comparelist.filter(p => p._id !== action.payload.compareId);
                state.comparelist_count -= 1;
            });
    }
})

export const { messageClear, reset_count } = cardReducer.actions
export default cardReducer.reducer