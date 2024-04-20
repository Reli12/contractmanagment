import styled from 'styled-components'
import colors from '../../../typography/colors'

export const NavWrapper = styled.div`
    height: 60px;
    width: 100vw;
    background: ${colors.platinum};//TODO refactor it
    display: flex;
    align-items: center;
    padding: 10px;
`

export const StyledNavLink = styled.a`
    text-decoration: none;
    color: black; //TODO refactor it
    cursor: pointer;
    font-size: 25px;
`
