import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

export const get_category = createAsyncThunk(
    'product/get_category',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/home/get-categorys')
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
            console.log(error)
        }
    }
)

export const get_products = createAsyncThunk(
    'product/get_products',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/home/get-products')
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const price_range_product = createAsyncThunk(
    'product/price_range_product',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/home/price-range-latest-product')
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const query_products = createAsyncThunk(
    'product/query_products',
    async (query, { fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/query-products?category=${query.category}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&availability=${query.InStock}&&sortByDate=${query.sortByDate}&&pageNumber=${query.pageNumber}&&searchValue=${query.searchValue ? query.searchValue : ''}`)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const homeReducer = createSlice({
    name: 'home',
    initialState: {
        categorys: [],
        products: [],
        totalProduct: 0,
        parPage: 4,
        latest_product: [],
        topRated_product: [],
        discount_product: [],
        priceRange: {
            low: 0,
            high: 100
        }

    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(get_category.fulfilled, (state, action) => {
                state.categorys = action.payload.categorys
            })
            .addCase(get_products.fulfilled, (state, action) => {
                const { products, latest_product, topRated_product, discount_product } = action.payload;
                state.products = products;
                state.latest_product = latest_product;
                state.topRated_product = topRated_product;
                state.discount_product = discount_product;
            })
            .addCase(price_range_product.fulfilled, (state, action) => {
                const { latest_product, priceRange } = action.payload;
                state.latest_product = latest_product;
                state.priceRange = priceRange;
            })
            .addCase(query_products.fulfilled, (state, action) => {
                const { products, totalProduct, parPage } = action.payload;
                state.products = products;
                state.totalProduct = totalProduct;
                state.parPage = parPage;
            });
    }
})

export default homeReducer.reducer