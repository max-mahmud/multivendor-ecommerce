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

export const get_product = createAsyncThunk(
    'product/get_product',
    async (slug, {
        fulfillWithValue
    }) => {
        try {
            const {
                data
            } = await api.get(`/home/get-product/${slug}`)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const customer_review = createAsyncThunk(
    'review/customer_review',
    async (info, {
        fulfillWithValue
    }) => {
        try {
            const {
                data
            } = await api.post('/home/customer/submit-review', info)
            return fulfillWithValue(data)
        } catch (error) {

        }
    }
)

export const get_reviews = createAsyncThunk(
    'review/get_reviews',
    async ({
        productId,
        perPage
    }, {
        fulfillWithValue
    }) => {
        try {
            const {
                data
            } = await api.get(`/home/customer/get-reviews/${productId}?perPage=${perPage}`)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {

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
        },
        product: {},
        relatedProducts: [],
        totalReview: 0,
        rating_review: [],
        reviews: [],
        successMessage: '',
        errorMessage: '',
    },
    reducers: {
        messageClear: (state, _) => {
            state.successMessage = ""
            state.errorMessage = ""
        }
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
            })
            .addCase(get_product.fulfilled, (state, { payload }) => {
                state.product = payload.product
                state.relatedProducts = payload.relatedProducts
            })
            .addCase(customer_review.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message
            })
            .addCase(get_reviews.fulfilled, (state, { payload }) => {
                state.reviews = payload.reviews
                state.totalReview = payload.totalReview
                state.rating_review = payload.rating_review
            })
    }
})
export const { messageClear } = homeReducer.actions;
export default homeReducer.reducer;