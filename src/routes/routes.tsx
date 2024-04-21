import IRoute from '../types/route.interface'
import Home from '../pages/Home'
import AddNewContract from '../pages/AddNewContract'
import ContractOverview from '../pages/ContractOverview'
import NotFound from '../pages/NotFound'

const routes: IRoute[] = [
    { path: '/', element: <Home /> },
    { path: '/addNewContract', element: <AddNewContract /> },
    { path: `/overview/:id`, element: <ContractOverview /> },
    { path: '/*', element: <NotFound /> },
]

export default routes
