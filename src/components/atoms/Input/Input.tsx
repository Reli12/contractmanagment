import React from 'react'
import { useField } from 'formik'
import styled from 'styled-components'

interface ICustomInput {
    label: string
    placeholder?: string
    type: string
    name: string
}

const Wrapper = styled.div`
    margin-bottom: 20px;
`

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`

const ErrorMessage = styled.div`
    color: red;
    margin-top: 5px;
`

const CustomInput: React.FC<ICustomInput> = ({ label, placeholder, type, name }) => {
    const [field, meta] = useField(name)

    return (
        <Wrapper>
            <Label htmlFor={name}>{label}</Label>
            <Input {...field} type={type} placeholder={placeholder} aria-label={label} />
            {meta.touched && meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
        </Wrapper>
    )
}

export default CustomInput
