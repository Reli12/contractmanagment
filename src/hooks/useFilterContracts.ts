import generateContracts from '../utilities/generateMockContractData'
import { useEffect, useRef } from 'react'
import IContract from '../types/contract.types'
import { useContractContext } from '../context/contractsContext/ContractContext'

const useFilterContracts = () => {
    const { contracts } = useContractContext()
    const filteredContracts = useRef<IContract[]>([...contracts])

    useEffect(() => {
        filteredContracts.current = [...contracts]
    }, [contracts])

    const filterContracts = (filterValue?: string) => {
        if (filterValue === undefined || filterValue === '') {
            filteredContracts.current = [...contracts]
            return undefined
        }

        if (/^[0-9]{2}\./.test(filterValue)) {
            filteredContracts.current = filteredContracts.current.filter((item) =>
                item.rok_isporuke.startsWith(filterValue)
            )
            return filteredContracts.current
        } else if (/^[0-9]{1}\/[0-9]{2}/.test(filterValue)) {
            filteredContracts.current = filteredContracts.current.filter((item) =>
                item.broj_ugovora.startsWith(filterValue)
            )
            return filteredContracts.current
        } else if (filterValue.length > 2) {
            filteredContracts.current = filteredContracts.current.filter((item) =>
                item.kupac.toLowerCase().includes(filterValue.toLowerCase())
            )
            return filteredContracts.current
        }

        return filteredContracts.current
    }

    const filterContractByStatus = (filterValue?: string) => {
        if (filterValue === undefined || filterValue === '') {
            filteredContracts.current = [...contracts]
            return undefined
        }
        if (!!filterValue && /^(KREIRANO|NARUČENO|ISPORUČENO)$/.test(filterValue)) {
            filteredContracts.current = filteredContracts.current.filter((item) =>
                item.status.toLowerCase().includes(filterValue.toLowerCase())
            )
            return filteredContracts.current
        }
    }

    const resetFilters = () => {
        filteredContracts.current = [...contracts]
    }

    return { filterContracts, filterContractByStatus, resetFilters }
}

export default useFilterContracts
