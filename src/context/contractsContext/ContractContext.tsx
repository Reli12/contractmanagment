import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import IContract from '../../types/contract.types'
import generateContracts from '../../utilities/generateMockContractData'

interface IContractContext {
    contracts: IContract[]
    addNewContract: (contract: IContract) => void
}
interface IChildren {
    children?: ReactNode
}

const errorMessage = 'Contract context must be used inside contract provider'

const ContractContext = createContext<IContractContext | undefined>(undefined)

const ContractProvider = ({ children }: IChildren) => {
    const [contracts, setContracts] = useState<IContract[]>(generateContracts(10))

    useEffect(() => {
        console.log('Implement fetching data for contracts')
    }, [])

    const addNewContract = (contract: IContract) => {
        contract.id = contracts.length + 1
        setContracts((prev) => [...prev, contract])
    }

    return <ContractContext.Provider value={{ contracts, addNewContract }}>{children}</ContractContext.Provider>
}

export const useContractContext = () => {
    const contractContext = useContext(ContractContext)

    if (!contractContext) {
        throw new Error(errorMessage)
    }
    return contractContext
}

export default ContractProvider
