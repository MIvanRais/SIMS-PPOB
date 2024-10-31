import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

export const getServices = createAsyncThunk('service/getServices', async (data) => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/services`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data}`,
        },
    });
    return await response.json();
});

const initialState = {
    services: []
};

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getServices.fulfilled, (state, action) => {
                state.services = action.payload.data;
            })

        // .addCase(PURGE, (state) => {
        //     // return initialState;
        // });
    }
});

export default serviceSlice.reducer;
