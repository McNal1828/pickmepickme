import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	semichoose: false,
	choose: false,
};

export const chooseSlice = createSlice({
	name: 'choose',
	initialState,
	reducers: {
		setchoose(state, action) {
			state.choose = action.payload;
		},
		setsemichoose(state, action) {
			state.semichoose = action.payload;
		},
	},
});

export const { setchoose, setsemichoose } = chooseSlice.actions;
export default chooseSlice;
