import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "customModal",
  initialState: {videoId: ''},
  reducers: {
    setCustomModal: (state, action) => {
      return action.payload;
    },
    setVideoId: (state, action) => {
      state.videoId = action.payload
    }
  },
});

export const { setCustomModal, setVideoId } = modalSlice.actions;
export default modalSlice.reducer;
