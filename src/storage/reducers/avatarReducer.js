import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    url: null, 
  };
  
  const avatarSlice = createSlice({
    name: 'avatar',
    initialState,
    reducers: {
      updateAvatarUrl: (state, action) => {
        state.url = action.payload;
      },
    },
  });
  
  export const { updateAvatarUrl } = avatarSlice.actions;
  export default avatarSlice.reducer;