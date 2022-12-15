import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../Axios"

export const getAllCompaigns = createAsyncThunk('get/all', async (data = {}, { rejectWithValue}) => {
    try {
        const { data: { data } } = await axios.get(process.env.REACT_APP_API_URL + '/compaign');
        return data;
    }
    catch(err) {
        return rejectWithValue(err.message)
    }
})

export const createCompaign = createAsyncThunk('create/compaign', async ({ name, description, goalAmount, expiresIn }, { rejectWithValue}) => {
    try {
        const { data: { data } } = await axios.post(process.env.REACT_APP_API_URL + '/compaign', { name, description, goalAmount: +goalAmount, expiresIn });
        return { ...data };
    }
    catch(err) {
        return rejectWithValue(err.message)
    }
})

export const donateCompaign = createAsyncThunk('donate/compaign', async ({ donatorName, goalAmount, address, compaignId, navigateHome}, { rejectWithValue}) => {
    try {
        const { data: { data } } = await axios.post(process.env.REACT_APP_API_URL + '/donate', { donatorName, goalAmount: +goalAmount, address, compaignId });
        navigateHome();
        return data;
    }
    catch(err) {
        return rejectWithValue(err.message)
    }
})

const compaignSlice = createSlice({
    name: 'compaign',
    initialState: {
        compaigns: [],
        loading: false,
    },
    extraReducers: (builder => {
        builder.addCase(getAllCompaigns.fulfilled, (state, { payload }) => {
            state.compaigns = payload
        });
        builder.addCase(donateCompaign.pending, (state) => {
            state.loading=true;
        });
        builder.addCase(donateCompaign.fulfilled, (state, { payload }) => {
            state.loading=false;
        });
        builder.addCase(donateCompaign.rejected, (state) => {
            state.loading=false;
        });
    })
})

export default compaignSlice.reducer;