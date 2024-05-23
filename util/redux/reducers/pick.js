import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	imgurl: '/image/default.jpg',
	name: '선택중',
	detail: [],
	uuid: '',
	choose: '',
	choosename: '',
};

export const pickSlice = createSlice({
	name: 'pick',
	initialState,
	reducers: {
		chgpick(state, action) {
			state.detail = JSON.parse(action.payload.detail);
			state.name = action.payload.name;
			state.imgurl = action.payload.imgurl;
			state.uuid = action.payload.uuid;
		},
		choose(state, action) {
			state.choose = action.payload.uuid;
			state.choosename = action.payload.name;
		},
		rstpick(state, action) {
			state.detail = [];
			state.name = '선택중';
			state.imgurl = '/image/default.jpg';
			state.uuid = '';
			state.choose = '';
		},
	},
});

export const { chgpick, rstpick, choose } = pickSlice.actions;
export default pickSlice;
