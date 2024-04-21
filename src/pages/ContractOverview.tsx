import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useContractContext } from '../context/contractsContext/ContractContext'
import { useProductsContext } from '../context/procuctsContext/ProductsContext'
import ContractSection from '../components/molecules/OverviewSections/ContractSection'
import ProductOverviewSection from '../components/molecules/OverviewSections/ProductOverviewSection'
import IProduct from '../types/products.interfaces'
import IContract from '../types/contract.types'

const ContractOverview = () => {
    const { contracts } = useContractContext()
    const { getProductForContract } = useProductsContext()
    const [contractOverviewInfo, setCongractOverviewInfo] = useState<IContract | undefined>(undefined)
    const [productsOverviewInfo, setProductsOverviewInfo] = useState<IProduct[] | undefined>(undefined)
    const navigate = useNavigate()
    const params = useParams()
    const { id } = params

    useEffect(() => {
        let mounted = true
        if (mounted) {
            if (id !== undefined) {
                const a = contracts.find((item) => item.id.toString() === id)
                if (a) {
                    setCongractOverviewInfo(a)
                } else {
                    navigate('/404')
                }
            } else {
                navigate('/404')
            }
        }

        return () => {
            mounted = false
        }
    }, [contracts, id])

    useEffect(() => {
        let mounted = true
        if (mounted) {
            setProductsOverviewInfo(getProductForContract(contractOverviewInfo?.products))
        }
        return () => {
            mounted = false
        }
    }, [contractOverviewInfo])

    return (
        <>
            <ContractSection contract={contractOverviewInfo} />
            {productsOverviewInfo?.length !== 0 && <ProductOverviewSection products={productsOverviewInfo} />}
        </>
    )
}

export default ContractOverview
