import styled, { css } from 'styled-components'
import TableRowItem from '../../atoms/TableRowItem/TableRowItem'
import convertToCroatianDateFormat from '../../../utilities/ConvertToCroatianDate'
import StatusType from '../../../types/status.type'
import Status from '../../../constants/status'
import StatusElement from '../../atoms/Status/StatusElement'

interface ITableRow {
    rowValues: Record<string, any>
    haveBottomBorder?: boolean
    index?: number
}

interface Iprops {
    $haveBottomBorder?: boolean
}
const Wrapper = styled.div<Iprops>`
    height: 75px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    ${(props) =>
        props.$haveBottomBorder &&
        css`
            border-bottom: solid 1px lightgray;
        `}
`

const TableRow = ({ rowValues, haveBottomBorder = true, index = 1 }: ITableRow) => {
    const displayRightValue = (value: string, index: number) => {
        switch (value) {
            case 'deadline':
                return <TableRowItem value={convertToCroatianDateFormat(rowValues[value])} key={index} />
            case 'status':
                return <TableRowItem value={<StatusElement status={rowValues[value]} />} key={index} />
            default:
                return <TableRowItem value={rowValues[value]} key={index} />
        }
    }
    return (
        <Wrapper key={index} $haveBottomBorder={haveBottomBorder}>
            {Object.keys(rowValues).map((value, index) => {
                return displayRightValue(value, index)
            })}
        </Wrapper>
    )
}

export default TableRow
