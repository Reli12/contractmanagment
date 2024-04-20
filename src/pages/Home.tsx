import Table from '../components/organisams/Table/Table'
import useFilterContracts from '../hooks/useFilterContracts'
import { useEffect } from 'react'

const Home = () => {
    const { filterContracts } = useFilterContracts()

    useEffect(() => {
        console.log(filterContracts('KREIRANO'))
    }, [])
    return (
        <div>
            <Table />
        </div>
    )
}

export default Home
