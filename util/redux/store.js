import { combineReducers, configureStore } from '@reduxjs/toolkit';
import pickSlice from './reducers/pick';
import chooseSlice from './reducers/choose';

const rootReducer = combineReducers({
	pick: pickSlice.reducer,
	choose: chooseSlice.reducer,
	// ui: uiSlice.reducer,
	// chat: chatSlice.reducer,
	// login: loginSlice.reducer,
});

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};
