import Table from '../components/organisams/Table/Table'
import { useContractContext } from '../context/contractsContext/ContractContext'

const Home = () => {
    const { contracts } = useContractContext()

    return (
        <div>
            <Table contracts={contracts} />
        </div>
    )
}

export default Home
