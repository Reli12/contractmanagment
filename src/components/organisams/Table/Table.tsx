import styled from 'styled-components'
import generateContracts from '../../../utilities/generateMockContractData'
import TableRow from '../../molecules/TableRow/TableRow'
import colors from '../../../typography/colors'
import convertToCroatianDateFormat from '../../../utilities/ConvertToCroatianDate'

const Wrapper = styled.div`
    min-height: 500px;
    max-width: 1200px;
    padding: 20px;
    margin: 0 auto;
    background-color: ${colors.primaryBlue};
    border-radius: 10px;
`
const Table = () => {
    const contracts = generateContracts(5)
    console.log(contracts)

    return (
        <Wrapper>
            <TableRow
                rowValues={{
                    buyerName: 'Ime kupca:',
                    contractNumber: 'Broj ugovora:',
                    deadline: 'Rok isporuke:',
                    status: 'Status:',
                }}
            />
            {contracts.map((contract, index) => {
                console.log(convertToCroatianDateFormat(contract.rok_isporuke))
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
                    />
                )
            })}
        </Wrapper>
    )
}

export default Table
