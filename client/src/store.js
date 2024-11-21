// import { createStore,} from "redux";
import { configureStore } from '@reduxjs/toolkit';
// we use applyMiddleware because we are using redux-thunk
import {thunk} from 'redux-thunk'

// npm i redux-devtools-extension(for check the data we get on browser through redux dev tools)
// import {composeWithDevTools} from "redux-devtools-extension";
import rootreducers from "./components/redux/reducers/main";



const store = configureStore({
    reducer: rootreducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production', // Enables Redux DevTools in development mode
});

export default store;



// const middleware = [thunk];
// const store = createStore(
//     rootreducers, 
//     composeWithDevTools[applyMiddleware(...middleware)]
// );

// export default store;