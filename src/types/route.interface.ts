interface Route {
    path: string
    element: React.ReactNode | null
}

export default interface IRoute extends Route {
    children?: Route[]
}
