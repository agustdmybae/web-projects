import Header from './Header';
import React from 'react';
import Signin from './pages/Signin'
import Home from './pages/Home'
import NewPost from './pages/NewPost';
import Post from './pages/Post';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signin" element={<Signin />}>註冊登入</Route>
                <Route path="/new-post" element={<NewPost />}>註冊登入</Route>
                <Route path="/posts/:postId" element={<Post />}></Route>
            </Routes>
        </BrowserRouter>  
    )
}