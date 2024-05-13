import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/layout'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}></Route>
        </Routes>
    )
}

export default App
