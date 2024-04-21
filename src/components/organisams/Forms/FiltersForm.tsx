import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Button from '../../atoms/Button/Button'
import CustomInput from '../../atoms/Input/Input'
import Dropdown from '../../atoms/Dropdown/Dropdown'
import styled from 'styled-components'
import FilterStatus from '../../../constants/filterStatus'
import FilterForm from '../../../types/filterForm.interface'

interface IFiltersForm {
    resetFilters: () => void
    handleFiltering: ({ filterValue, statusFilter }: FilterForm) => void
}

const WrapperForm = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    label {
        margin-bottom: 0;
    }
    padding: 20px;
`

const WrapperInput = styled.div`
    width: 250px;
    margin-right: 20px;
`

const validationSchema: Yup.Schema<FilterForm> = Yup.object().shape({
    filterValue: Yup.string(),
    statusFilter: Yup.string().oneOf(Object.values(FilterStatus)),
})

const FiltersForm = ({ resetFilters, handleFiltering }: IFiltersForm) => {
    const [selectedValue, setSelectedValue] = useState('')
    const initialValues: FilterForm = {
        filterValue: '',
        statusFilter: FilterStatus.noValue,
    }
    const options = [
        { label: 'Aktivni', value: FilterStatus.active },
        { label: 'Neaktivni', value: FilterStatus.inactive },
        { label: 'Resetiraj', value: FilterStatus.noValue },
    ]
    const handleSubmit = (values: FilterForm) => {
        handleFiltering(values)
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ setFieldValue }) => (
                <Form>
                    <WrapperForm>
                        <WrapperInput>
                            <CustomInput
                                label={'Unesite vrijednost za filtriranje:'}
                                type={'text'}
                                name={'filterValue'}
                            />
                        </WrapperInput>
                        <Dropdown
                            value={selectedValue}
                            onChange={(value) => {
                                setSelectedValue(value)
                                setFieldValue('statusFilter', value)
                            }}
                            placeholder="Odaberi opciju stanja ugovora"
                            options={options}
                        />
                        <Button label={'Filtriraj'} />
                        <Button
                            onClick={() => {
                                setFieldValue('statusFilter', '')
                                setFieldValue('filterValue', '')
                                setSelectedValue('')
                                resetFilters()
                            }}
                            label={'Poništi filtere'}
                            type={'button'}
                        />
                    </WrapperForm>
                </Form>
            )}
        </Formik>
    )
}

export default FiltersForm
