import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import Swal from 'sweetalert2';

export const getUserBalance = createAsyncThunk('transaction/getUserBalance', async (data) => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/balance`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data}`,
        },
    });
    return await response.json();
});

let topUpAmount = null;

export const topUp = createAsyncThunk('transaction/topUp', async (data) => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/topup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify({ top_up_amount: data.amount }),
    });
    topUpAmount = data.amount;
    return await response.json();
});

let serviceName = null;
let totalPayment = null;

export const payment = createAsyncThunk('transaction/payment', async (data) => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/transaction`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify({ service_code: data.code }),
    });
    serviceName = data.serviceName;
    totalPayment = data.serviceTariff;
    return await response.json();
});


const initialState = {
    balance: null
};

const transactionSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserBalance.fulfilled, (state, action) => {
                state.balance = action.payload.data.balance;
            })
            .addCase(topUp.fulfilled, (state, action) => {
                if (!action.payload.status) {
                    Swal.fire({
                        title: 'Top Up Sebesar',
                        html: `<strong>Rp${topUpAmount}</strong> <br>berhasil!`,
                        icon: 'success',
                        showConfirmButton: true,
                        confirmButtonText: 'Kembali ke Beranda'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/home';
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Gagal Top Up',
                        text: `${action.payload.message}`,
                        icon: 'error',
                        showConfirmButton: true,
                        confirmButtonText: 'Kembali ke Beranda'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/home';
                        }
                    });
                }
            })
            .addCase(payment.fulfilled, (state, action) => {
                if (!action.payload.status) {
                    Swal.fire({
                        title: `Pembayaran ${serviceName} sebesar`,
                        html: `<strong>Rp${totalPayment}</strong> <br>berhasil!`,
                        icon: 'success',
                        showConfirmButton: true,
                        confirmButtonText: 'Kembali ke Beranda'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/home';
                        }
                    });
                }
                // else {
                //     Swal.fire({
                //         title: `Pembayaran ${serviceName} sebesar`,
                //         text: `${action.payload.message}`,
                //         icon: 'error',
                //         showConfirmButton: true,
                //         confirmButtonText: 'Kembali ke Beranda'
                //     }).then((result) => {
                //         if (result.isConfirmed) {
                //             window.location.href = '/home';
                //         }
                //     });
                // }
            })

        // .addCase(PURGE, (state) => {
        // return initialState;
        // });
    }
})
export default transactionSlice.reducer;