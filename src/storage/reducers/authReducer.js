import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: localStorage.getItem('userLoggedIn') === 'true', 
    isVenueManager: false, 
    userData: null, 
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
            state.userData = null;
            localStorage.setItem('userLoggedIn', 'false');
        },
        setVenueManager: (state, action) => {
            state.isVenueManager = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
            state.loggedIn = true;
          },
    },
});

export const { login, logout, setVenueManager, setUserData } = authSlice.actions;
export default authSlice.reducer;