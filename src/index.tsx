import React from 'react';
import {StorageContextProvider} from "./context"
import {HashRouter}  from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {App} from './App';
import 'macro-css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement );
root.render(
    <React.StrictMode>
        <HashRouter>
            <StorageContextProvider>
            <App />
            </StorageContextProvider>
        </HashRouter>
    </React.StrictMode>
);

