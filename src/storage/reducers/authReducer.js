import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false, // Add loggedIn state
    isVenueManager: false, // Add isVenueManager state
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.loggedIn = true;
        },
        logout: (state) => {
            state.loggedIn = false;
        },
        setVenueManager: (state, action) => {
            state.isVenueManager = action.payload;
        },
    },
});

export const { login, logout, setVenueManager } = authSlice.actions;
export default authSlice.reducer;