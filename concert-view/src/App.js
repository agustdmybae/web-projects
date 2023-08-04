import React from 'react';
import Header from './Header';
import Home from './pages/Home';
import Signin from './pages/Signin'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signin" element={<Signin />}>註冊登入</Route>
            </Routes>
        </BrowserRouter> 
    )
}