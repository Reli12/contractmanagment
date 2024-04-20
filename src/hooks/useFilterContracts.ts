import generateContracts from '../utilities/generateMockContractData'
import { useRef } from 'react'
import IContract from '../types/contract.types'

const useFilterContracts = () => {
    // TODO refactor this to use and get data from the context
    const contracts = generateContracts(10)
    const filteredContracts = useRef<IContract[]>([...contracts])

    const filterContracts = (filterValue?: string) => {
        if (!filterValue || filterValue === '') {
            filteredContracts.current = [...contracts]
            return null
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
        if (!filterValue || filterValue === '') {
            filteredContracts.current = [...contracts]
            return null
        }
        if (!!filterValue && /^(KREIRANO|NARUČENO|ISPORUČENO)$/.test(filterValue)) {
            filteredContracts.current = filteredContracts.current.filter((item) =>
                item.kupac.toLowerCase().includes(filterValue.toLowerCase())
            )
            return filteredContracts.current
        }
    }

    return { filterContracts, filterContractByStatus }
}

export default useFilterContracts
