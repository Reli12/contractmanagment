import IRoute from '../types/route.interface'
import Home from '../pages/Home'
import AddNewContract from '../pages/AddNewContract'

const routes: IRoute[] = [
    { path: '/', element: <Home /> },
    { path: '/addNewContract', element: <AddNewContract /> },
]

export default routes
