import { createContext, ReactNode, useContext, useState } from 'react'
import IContract from '../../types/contract.types'
import generateContracts from '../../utilities/generateMockContractData'
import StatusType from '../../types/status.type'
import Status from '../../constants/status'

interface IUpdateContract {
    contract: IContract
    contractStatus: StatusType
    rok_isporuke: string
}
interface IContractContext {
    contracts: IContract[]
    addNewContract: (contract: IContract) => void
    updateContractStatus: (contract: IContract, status: StatusType) => IContract | undefined
    updateContract: ({ contract, contractStatus, rok_isporuke }: IUpdateContract) => IContract | undefined
}
interface IChildren {
    children?: ReactNode
}

const errorMessage = 'Contract context must be used inside contract provider'

const ContractContext = createContext<IContractContext | undefined>(undefined)

const ContractProvider = ({ children }: IChildren) => {
    const [contracts, setContracts] = useState<IContract[]>(generateContracts(10))

    const addNewContract = (contract: IContract) => {
        contract.id = contracts.length + 1
        contract.status = Status.created
        setContracts((prev) => [contract, ...prev])
    }

    const throwError = (message: string) => {
        throw new Error(message)
    }

    const updateContractStatus = (contract: IContract, status: StatusType) => {
        const index = contracts.findIndex((item) => item.id === contract.id)
        if (index === -1) throwError('The item is not in the list')
        const updateStatus = () => {
            contracts[index] = { ...contracts[index], status: status }
            contract.status = status
        }

        switch (contract.status) {
            case Status.created: {
                if (status !== Status.ordered) {
                    throwError('Invalid status')
                }
                updateStatus()
                return contract
            }
            case Status.ordered: {
                if (status !== Status.delivered) {
                    throwError('Invalid status')
                }
                updateStatus()
                return contract
            }
        }
    }

    const updateContract = ({ contract, contractStatus, rok_isporuke }: IUpdateContract) => {
        const index = contracts.findIndex((item) => item.id === contract.id)
        if (index === -1) throwError('The item is not in the list')
        if (contract.status !== contractStatus) {
            updateContractStatus(contract, contractStatus)
        }
        if (contract.rok_isporuke !== rok_isporuke) {
            contracts[index] = { ...contracts[index], rok_isporuke: rok_isporuke }
            contract.rok_isporuke = rok_isporuke
        }

        return contract
    }

    return (
        <ContractContext.Provider value={{ contracts, addNewContract, updateContractStatus, updateContract }}>
            {children}
        </ContractContext.Provider>
    )
}

export const useContractContext = () => {
    const contractContext = useContext(ContractContext)

    if (!contractContext) {
        throw new Error(errorMessage)
    }
    return contractContext
}

export default ContractProvider
