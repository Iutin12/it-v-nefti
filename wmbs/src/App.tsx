import React from 'react';
import './App.css';
import {Theme, presetGpnDefault} from '@consta/uikit/Theme';
import {
    BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import AuthorizationPage from './pages/Authorization/AuthorizationPage';
import MainPage from "./pages/MainPage/MainPage";


function App() {
    return (
        <Router>
            <Theme preset={presetGpnDefault}>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/authorization" element={<AuthorizationPage/>}/>
                </Routes>
            </Theme>
        </Router>
    );
}

export default App;
