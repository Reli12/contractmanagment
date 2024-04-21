import React from 'react'
import styled from 'styled-components'
import colors from '../../../typography/colors'

interface IButton {
    label: string
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset' | undefined
}

const StyleButton = styled.button`
    background-color: ${colors.secondaryBlue};
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${colors.secondaryDarkerBlue};
    }
`

const Button = ({ onClick, label, type = 'submit' }: IButton) => {
    return (
        <StyleButton onClick={onClick} type={type}>
            {label}
        </StyleButton>
    )
}

export default Button
