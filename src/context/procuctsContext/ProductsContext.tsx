import { createContext, ReactNode, useContext, useState } from 'react'
import IProduct from '../../types/products.interfaces'
import generateProducts from '../../utilities/generateMockProductData'

interface IProductsContext {
    products: IProduct[]
    addNewProduct: (product: IProduct) => void
    getProductForContract: (productIdList?: Array<number> | number) => undefined | IProduct[]
}
interface IChildren {
    children?: ReactNode
}

const errorMessage = 'Products context must be used inside products provider'

const ProductsContext = createContext<IProductsContext | undefined>(undefined)

const ProductsProvider = ({ children }: IChildren) => {
    const [products, setProducts] = useState<IProduct[]>(generateProducts(5))

    const addNewProduct = (product: IProduct) => {
        product.id = products.length + 1
        setProducts((prev) => [...prev, product])
    }

    const getProductForContract = (productIdList?: Array<number> | number) => {
        if (!productIdList) {
            return undefined
        }
        if (Array.isArray(productIdList)) {
            return products.filter((item) => productIdList.includes(item.id))
        }
        return products.filter((item) => item.id === productIdList)
    }

    return (
        <ProductsContext.Provider value={{ products, addNewProduct, getProductForContract }}>
            {children}
        </ProductsContext.Provider>
    )
}

export const useProductsContext = () => {
    const productsContext = useContext(ProductsContext)

    if (!productsContext) {
        throw new Error(errorMessage)
    }
    return productsContext
}

export default ProductsProvider
