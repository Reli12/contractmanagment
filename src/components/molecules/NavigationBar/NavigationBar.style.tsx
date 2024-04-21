import styled, { css } from 'styled-components'
import colors from '../../../typography/colors'

export const NavWrapper = styled.div`
    height: 60px;
    width: 100vw;
    background-color: ${colors.platinum};
    display: flex;
    align-items: center;
    padding: 0 20px;
`

export const StyledNavLink = styled.p<{ $isActive: boolean }>`
    text-decoration: none;
    color: ${colors.black};
    cursor: pointer;
    font-size: 18px;
    margin-right: 20px;
    transition: color 0.3s ease;

    &:hover {
        color: ${colors.primaryBlue}; /* Change color on hover */
    }
    ${(props) =>
        props.$isActive &&
        css`
            text-decoration: underline;
        `}
`
