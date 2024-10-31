import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import Swal from 'sweetalert2';

export const loginUser = createAsyncThunk('login/loginUser', async (data) => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return await response.json();
});

const initialState = {
    token: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                if (!action.payload.status) {
                    state.token = action.payload.data.token;

                    Swal.fire({
                        title: 'Login Successful!',
                        text: 'Selamat datang kembali, login Anda berhasil.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.href = "/home"
                    })
                } else {
                    state.token = null;

                    Swal.fire({
                        title: 'Login Failed!',
                        text: `${action.payload.message}. Silahkan coba lagi.`,
                        icon: 'error',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.token = null;

                Swal.fire({
                    title: 'Login Failed!',
                    text: `${action.payload.message}. Silahkan coba lagi.`,
                    icon: 'error',
                    timer: 2000,
                    showConfirmButton: false
                });
            })

            .addCase(PURGE, (state) => {
                return initialState;
            })
    }
})
export default loginSlice.reducer;