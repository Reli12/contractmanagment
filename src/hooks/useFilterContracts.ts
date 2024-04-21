import { useEffect, useRef } from 'react'
import IContract from '../types/contract.types'
import { useContractContext } from '../context/contractsContext/ContractContext'
import FilterStatus from '../constants/filterStatus'
import Status from '../constants/status'

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

    const filterContractByStatus = (filterValue?: FilterStatus) => {
        if (filterValue === undefined || filterValue === FilterStatus.noValue) {
            filteredContracts.current = [...contracts]
            return undefined
        }
        if (filterValue === FilterStatus.active) {
            filteredContracts.current = filteredContracts.current.filter(
                (item) =>
                    item.status.toLowerCase().includes(Status.created.toLowerCase()) ||
                    item.status.toLowerCase().includes(Status.ordered.toLowerCase())
            )
            console.log(filteredContracts.current)
            return filteredContracts.current
        }

        filteredContracts.current = filteredContracts.current.filter((item) =>
            item.status.toLowerCase().includes(Status.delivered.toLowerCase())
        )
        return filteredContracts.current
    }

    const resetFilters = () => {
        filteredContracts.current = [...contracts]
        return filteredContracts.current
    }

    return { filterContracts, filterContractByStatus, resetFilters }
}

export default useFilterContracts
