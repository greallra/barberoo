import React, { useState, useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from './redux/configureStore';
import 'react-toastify/dist/ReactToastify.css';
import MainRouter from './router/MainRouter';
import Auth from './components/Auth'
//docs
//https://visgl.github.io/react-map-gl/docs/api-reference/marker
const store = configureStore();
function App() {
  return (
    <div className="App">
      <ReduxProvider store={store}>
        <Auth>
          <MainRouter />
        </Auth>        
      </ReduxProvider>
    </div>
  );
}

export default App;
