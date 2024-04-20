import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routes from './routes/routes'
import NavigationBar from './components/molecules/NavigationBar/NavigationBar'

function App() {
    return (
        <BrowserRouter basename="/">
            <NavigationBar />
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
        </BrowserRouter>
    )
}

export default App
