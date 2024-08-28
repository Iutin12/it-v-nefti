import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
    url: "http://localhost:8090/",
    realm: "project",
    clientId: "app"
});

keycloak.init({
    onLoad: 'login-required'
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

export function logout() {
    keycloak.logout();
}

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
