import {combineReducers, configureStore} from '@reduxjs/toolkit';
import contentReduser from './reducers/contentReduser';
import filtersReducer from './reducers/filtersReducer';

const rootReducer = combineReducers({
    tickets: contentReduser,
    filter: filtersReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
