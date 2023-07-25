import React from 'react';
import Header from './Header';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </BrowserRouter> 
    )
}