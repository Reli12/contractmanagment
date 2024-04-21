import React from 'react'
import styled from 'styled-components'

interface Option {
    label: string
    value: string
    disabled?: boolean
}

interface DropdownProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    options: Option[]
}

const Select = styled.select`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`

const Dropdown = ({ value, onChange, placeholder, options }: DropdownProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value)
    }

    return (
        <Select value={value} onChange={handleChange}>
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}
            {options.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                </option>
            ))}
        </Select>
    )
}

export default Dropdown
