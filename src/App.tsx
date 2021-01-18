import React from 'react';
import {createStore} from "redux";
import {Provider } from 'react-redux';
import allReducers from './reducers/index'
import MovieGridList from "./components/movieGridList";
import {AppBar, Toolbar, Typography} from "@material-ui/core";

// @ts-ignore
const store = createStore(allReducers)

function App() {
  return (
    <div className="App">
      <Provider store={store}>
          <MovieGridList/>
      </Provider>
    </div>
  );
}


export default App
