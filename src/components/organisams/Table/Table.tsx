import styled from 'styled-components'
import TableRow from '../../molecules/TableRow/TableRow'
import colors from '../../../typography/colors'
import IContract from '../../../types/contract.types'
import { useNavigate } from 'react-router-dom'

interface ITable {
    contracts?: IContract[]
}

const Wrapper = styled.div`
    min-height: 500px;
    max-width: 1200px;
    padding: 20px;
    margin: 0 auto;
    background-color: ${colors.primaryBlue};
    border-radius: 10px;
`
const Table = ({ contracts }: ITable) => {
    const navigate = useNavigate()
    return (
        <Wrapper>
            <TableRow
                rowValues={{
                    buyerName: 'Ime kupca:',
                    contractNumber: 'Broj ugovora:',
                    deadline: 'Rok isporuke:',
                    statusFirst: 'Status:',
                }}
            />
            {contracts?.map((contract, index) => {
                return (
                    <TableRow
                        rowValues={{
                            buyerName: contract.kupac,
                            contractNumber: contract.broj_ugovora,
                            deadline: contract.rok_isporuke,
                            status: contract.status,
                        }}
                        haveBottomBorder={index !== contracts.length - 1}
                        index={index + 1}
                        key={index}
                        onClick={() => navigate(`/overview/${contract.id}`)}
                    />
                )
            })}
        </Wrapper>
    )
}

export default Table
