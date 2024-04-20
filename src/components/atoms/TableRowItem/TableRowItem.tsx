import styled from 'styled-components'
import colors from '../../../typography/colors'

interface ITableRowItem {
    value?: string | null
}
const StyleTableRowItem = styled.div`
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${colors.white};
`
const TableRowItem = ({ value }: ITableRowItem) => {
    if (value) {
        return <StyleTableRowItem>{value}</StyleTableRowItem>
    }
    return null
}
export default TableRowItem
