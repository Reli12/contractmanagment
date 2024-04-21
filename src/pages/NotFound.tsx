import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100vh;
`
const NotFound = () => {
    return (
        <Wrapper>
            <h1>404 SADRŽAJ NIJE PRONAĐEN</h1>
        </Wrapper>
    )
}

export default NotFound
