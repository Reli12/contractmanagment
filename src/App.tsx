import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routes from './routes/routes'
import NavigationBar from './components/molecules/NavigationBar/NavigationBar'
import ContractProvider from './context/contractsContext/ContractContext'
import ProductsProvider from './context/procuctsContext/ProductsContext'

function App() {
    return (
        <BrowserRouter basename="/">
            <ContractProvider>
                <ProductsProvider>
                    <NavigationBar />
                    <Routes>
                        {routes.map((route, index) => (
                            <Route key={index} path={route.path} element={route.element} />
                        ))}
                    </Routes>
                </ProductsProvider>
            </ContractProvider>
        </BrowserRouter>
    )
}

export default App
