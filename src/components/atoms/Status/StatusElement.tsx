import StatusType from '../../../types/status.type'
import Status from '../../../constants/status'
import styled, { css } from 'styled-components'

interface IStatusElement {
    status?: Status
}

const StatusWrapper = styled.div<{ $staus: StatusType }>`
    display: flex;
    gap: 10px;
    align-items: center;
    width: 200px;
    ${(props) =>
        props.$staus === Status.created &&
        css`
            div {
                background: green;
            }
            p {
                color: green;
            }
        `}
    ${(props) =>
        props.$staus === Status.ordered &&
        css`
            div {
                background: yellow;
            }
            p {
                color: yellow;
            }
        `} 
    ${(props) =>
        props.$staus === Status.delivered &&
        css`
            div {
                background: gray;
            }
            p {
                color: gray;
            }
        `}
`
const ColorWrapper = styled.div`
    border-radius: 50%;
    height: 10px;
    width: 10px;
`
const StatusElement = ({ status }: IStatusElement) => {
    if (status !== Status.created && status !== Status.ordered && status !== Status.delivered) {
        return null
    }

    return (
        <StatusWrapper $staus={status}>
            <ColorWrapper />
            <p>{status}</p>
        </StatusWrapper>
    )
}

export default StatusElement
