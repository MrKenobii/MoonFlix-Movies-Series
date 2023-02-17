import { createSlice } from "@reduxjs/toolkit";

export const gloabalLoadingSlice = createSlice({
    name: "GloabalLoading",
    initialState: {
        globalLoading: false
    },
    reducers: {
        setGlaobalLoading: (state, action) => {
            state.globalLoading = action.payload;
        }
    }
});
export const { setGlaobalLoading } = gloabalLoadingSlice.actions;
export default gloabalLoadingSlice.reducer;