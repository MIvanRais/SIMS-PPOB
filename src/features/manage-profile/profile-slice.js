import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import Swal from 'sweetalert2';

export const getUserProfile = createAsyncThunk('profile/getUserProfile', async (data) => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data}`,
        },
    });
    return await response.json();
});

export const updateUserProfile = createAsyncThunk('profile/updateUserProfile', async (data) => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/profile/update`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            },
            body: JSON.stringify({
                first_name: data.firstName,
                last_name: data.lastName,
            }),
        }
    );
    return await response.json();
});

export const updatePhotoProfile = createAsyncThunk('profile/updatePhotoProfile', async (data) => {
    const formData = new FormData();
    formData.append('file', data.file, { filename: data.file.name, contentType: data.file.type });
    const response = await fetch(`${import.meta.env.VITE_URL_API}/profile/image`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${data.token}`,
            'accept': 'application/json'
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Failed to update photo profile: ${response.statusText}`);
    }

    return await response.json();
});

const initialState = {
    email: null,
    first_name: null,
    last_name: null,
    profile_image: null
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.email = action.payload.data.email;
                state.first_name = action.payload.data.first_name;
                state.last_name = action.payload.data.last_name;
                state.profile_image = action.payload.data.profile_image;
            })

            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.email = action.payload.data.email;
                state.first_name = action.payload.data.first_name;
                state.last_name = action.payload.data.last_name;
                state.profile_image = action.payload.data.profile_image;

                Swal.fire({
                    title: `Profil Diperbarui!`,
                    html: `Perubahan profil Anda telah berhasil disimpan.`,
                    icon: 'success',
                    showConfirmButton: true,
                    confirmButtonText: 'Kembali ke Akun'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/akun';
                    }
                });
            })
            .addCase(updatePhotoProfile.fulfilled, (state, action) => {
                state.profile_image = action.payload.data.profile_image;
            })

        // .addCase(PURGE, (state) => {
        //     console.log('purge profile');
        // return initialState;
        // });
    }
})
export default profileSlice.reducer;