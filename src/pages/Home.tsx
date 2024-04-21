import Table from '../components/organisams/Table/Table'
import { useContractContext } from '../context/contractsContext/ContractContext'
import FiltersForm from '../components/organisams/Forms/FiltersForm'
import useFilterContracts from '../hooks/useFilterContracts'
import FilterForm from '../types/filterForm.interface'
import IContract from '../types/contract.types'
import { useState } from 'react'
import styled from 'styled-components'

const StyleH1 = styled.h1`
    text-align: center;
`
const Home = () => {
    const { contracts } = useContractContext()
    const { filterContractByStatus, resetFilters, filterContracts } = useFilterContracts()
    const [contractsToShow, setContractToShow] = useState<IContract[] | undefined>(contracts)

    const handleFiltering = ({ filterValue, statusFilter }: FilterForm) => {
        if (filterValue === '' && statusFilter === '') setContractToShow(resetFilters)
        resetFilters()
        if (!!filterValue) {
            setContractToShow(filterContracts(filterValue))
        }
        if (!!statusFilter) {
            setContractToShow(filterContractByStatus(statusFilter))
        }
    }

    return (
        <div>
            <StyleH1>Lista kupoprodajnih ugovora</StyleH1>
            <FiltersForm resetFilters={() => setContractToShow(resetFilters)} handleFiltering={handleFiltering} />
            <Table contracts={contractsToShow} />
        </div>
    )
}

export default Home
