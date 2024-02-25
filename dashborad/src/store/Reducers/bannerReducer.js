import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_banner = createAsyncThunk(
    "banner/add_banner",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post("/add/banner", info, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const update_banner = createAsyncThunk(
    "banner/update_banner",
    async ({ bannerId, info }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/update/banner/${bannerId}`, info, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_banner = createAsyncThunk(
    "banner/get_banner",
    async (productId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get/banner/${productId}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const bannerSlice = createSlice({
    name: "banner",
    initialState: {
        successMessage: "",
        errorMessage: "",
        loader: false,
        smallBanner: "",
        bigBanner: ""
    },
    reducers: {
        messageClear: (state, action) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
    },
    extraReducers: builder => {
        builder
            .addCase(add_banner.pending, (state) => {
                state.loader = true;
            })
            .addCase(add_banner.fulfilled, (state, action) => {
                state.loader = false;
                state.successMessage = action.payload.message;
                state.bannerImage = action.payload.productBanner;
            })
            .addCase(add_banner.rejected, (state, action) => {
                state.loader = false;
                state.errorMessage = action.payload.message;
            })
            .addCase(update_banner.pending, (state) => {
                state.loader = true;
            })
            .addCase(update_banner.fulfilled, (state, action) => {
                state.loader = false;
                state.successMessage = action.payload.message;
                state.bannerImage = action.payload.productBanner;
            })
            .addCase(update_banner.rejected, (state, action) => {
                state.loader = false;
                state.errorMessage = action.payload.message;
            })
            .addCase(get_banner.fulfilled, (state, action) => {
                state.bigBanner = action.payload.bigBanner;
                state.smallBanner = action.payload.smallBanner;
            });
    },
});

export const { messageClear } = bannerSlice.actions;
export default bannerSlice.reducer;
