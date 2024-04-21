import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import styled from 'styled-components'
import CustomDatePicker from '../../atoms/DatePicker/CustomDatePicker'
import formatDate from '../../../utilities/formatDate'
import Dropdown from '../../atoms/Dropdown/Dropdown'
import Button from '../../atoms/Button/Button'
import StatusType from '../../../types/status.type'
import IContract from '../../../types/contract.types'
import Status from '../../../constants/status'
import { useContractContext } from '../../../context/contractsContext/ContractContext'
import { ErrorMessage } from '../../atoms/Input/Input'
interface IEditContractValues {
    contract: IContract
    cancelEditing: (cancel: boolean) => void
}

interface IEditContract {
    status: StatusType
    rok_isporuke: string
}

const Wrapper = styled.div`
    display: flex;
    gap: 20px;
`
const StyledP = styled.div`
    font-weight: bold;
    margin: 0 0 10px 0;
`
const EditContractValues = ({ contract, cancelEditing }: IEditContractValues) => {
    const navigate = useNavigate()
    const { updateContract } = useContractContext()
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')
    const initialValues: IEditContract = {
        status: contract.status,
        rok_isporuke: contract.rok_isporuke,
    }

    const options = useMemo(() => {
        const isOptnionAvailable = (label: StatusType) => {
            if (contract.status === Status.created && label === Status.delivered) {
                return true
            }
            if (contract.status === Status.ordered && label === Status.created) {
                return true
            }
        }
        return [
            {
                label: Status.created,
                value: Status.created,
                disabled: isOptnionAvailable(Status.created),
            },
            {
                label: Status.ordered,
                value: Status.ordered,
                disabled: isOptnionAvailable(Status.ordered),
            },
            {
                label: Status.delivered,
                value: Status.delivered,
                disabled: isOptnionAvailable(Status.delivered),
            },
        ]
    }, [contract])

    const handleSubmit = (values: IEditContract) => {
        if (values.status !== contract.status || values.rok_isporuke !== contract.rok_isporuke) {
            try {
                updateContract({ contract: contract, contractStatus: values.status, rok_isporuke: values.rok_isporuke })
                navigate('/', { replace: true })
            } catch (e) {
                console.log(e)
                setShowErrorMessage(true)
            }
        }
    }
    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ setFieldValue }) => (
                    <Form>
                        <Wrapper>
                            <div>
                                <StyledP>Rok isporuke:</StyledP>
                                <CustomDatePicker
                                    handleSelectedDate={(date) => {
                                        setFieldValue('rok_isporuke', formatDate(date, false))
                                    }}
                                    minDate={new Date(initialValues.rok_isporuke)}
                                />
                            </div>
                            <Dropdown
                                value={selectedValue}
                                onChange={(value) => {
                                    setFieldValue('status', value)
                                    setSelectedValue(value)
                                }}
                                placeholder="Odaberi opciju stanja ugovora"
                                options={options}
                            />
                            <Button label={'Ažuriraj ugovor'} type={'submit'} />
                            <Button
                                onClick={() => {
                                    cancelEditing(true)
                                }}
                                label={'Otkaži'}
                                type={'button'}
                            />
                            {showErrorMessage && (
                                <ErrorMessage>Nešto je pošlo po krivu pokušajte ponovno kasnije.</ErrorMessage>
                            )}
                        </Wrapper>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default EditContractValues
