import IProduct from '../types/products.interfaces'
import StatusType from '../types/status.type'
import Status from '../constants/status'

const generateProducts = (numproducts: number): IProduct[] => {
    const products: IProduct[] = []
    const statusOptions: Array<StatusType> = [Status.created, Status.delivered, Status.ordered]
    const articleNames: string[] = ['Iphone', 'Macbook pro', 'Mis', 'Stol']
    const supliersNames: string[] = ['Santa Domenica', 'Emmezeta', 'Portanova', 'Zelda']

    for (let i = 0; i < numproducts; i++) {
        const article: IProduct = {
            id: i + 1,
            naziv: articleNames[Math.floor(Math.random() * articleNames.length)],
            dobavljač: supliersNames[Math.floor(Math.random() * supliersNames.length)],
            status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
        }
        products.push(article)
    }

    return products
}

export default generateProducts
