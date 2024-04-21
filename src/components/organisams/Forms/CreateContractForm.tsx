import React, { useMemo, useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Button from '../../atoms/Button/Button'
import CustomInput, { ErrorMessage } from '../../atoms/Input/Input'
import styled from 'styled-components'
import ICreateContract from '../../../types/createForm.interfaces'
import { useProductsContext } from '../../../context/procuctsContext/ProductsContext'
import Select from 'react-select'
import CustomDatePicker from '../../atoms/DatePicker/CustomDatePicker'
import formatDate from '../../../utilities/formatDate'
import { useContractContext } from '../../../context/contractsContext/ContractContext'
import Status from '../../../constants/status'
import { useNavigate } from 'react-router-dom'

interface IFiltersForm {}

const WrapperForm = styled.div`
    display: flex;
    flex-direction: column;
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
`
const StyleP = styled.p`
    margin: 0 0 5px 0;
`

const validationSchema: Yup.Schema<Partial<ICreateContract>> = Yup.object().shape({
    name: Yup.string().required('Ime je obavezno polje').min(1, 'Minimalna duljina imena je jedan znak'),
    lastName: Yup.string().required('Prezime je obavezno polje').min(1, 'Minimalna duljina prezime je jedan znak'),
    brojUgovora: Yup.string()
        .required('Broj ugovora je obavezno polje')
        .matches(/^\d+\/\d{4}$/, 'Broj ugovora mora biti u formatu "N/NNNN..."'),
    products: Yup.array().of(Yup.number().required()),
})

const CreateContractForm = ({}: IFiltersForm) => {
    const { products } = useProductsContext()
    const { addNewContract } = useContractContext()
    const navigate = useNavigate()

    const [errorToShow, setErrorToShow] = useState<{
        datumAkontacije: boolean
        rokIsporuke: boolean
        products: boolean
    }>({ datumAkontacije: false, rokIsporuke: false, products: false })

    const initialValues: ICreateContract = {
        name: '',
        lastName: '',
        brojUgovora: '',
        datumAkontacije: '',
        rokIsporuke: '',
        products: [] as Array<number>,
    }

    const handleSubmit = (values: ICreateContract) => {
        console.log(values)
        if (values.datumAkontacije === '') {
            setErrorToShow((prev) => ({ ...prev, datumAkontacije: true }))
            return
        }
        if (values.rokIsporuke === '') {
            setErrorToShow((prev) => ({ ...prev, rokIsporuke: true }))
            return
        }
        if (values.products?.length === 0 || values.products === undefined) {
            setErrorToShow((prev) => ({ ...prev, products: true }))
            return
        }
        addNewContract({
            kupac: `${values.name} ${values.lastName}`,
            id: 1,
            broj_ugovora: values.brojUgovora,
            datum_akontacije: values.datumAkontacije,
            rok_isporuke: values.rokIsporuke,
            status: Status.created,
            products: values.products,
        })
        navigate('/')
    }

    const productOptions = useMemo(() => {
        let opt: Array<{ value: string; label: string }> = []
        products.map((item) => opt.push({ label: `${item.naziv}-> ${item.dobavljač}`, value: item.id.toString() }))
        return opt
    }, [products])

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ setFieldValue }) => (
                <Form>
                    <WrapperForm>
                        <h1>Kreiranje novoga ugovora</h1>
                        <WrapperInput>
                            <CustomInput label={'Ime kupca:'} type={'text'} name={'name'} />
                        </WrapperInput>
                        <WrapperInput>
                            <CustomInput label={'Ime prezime:'} type={'text'} name={'lastName'} />
                        </WrapperInput>
                        <WrapperInput>
                            <CustomInput label={'Broj ugovora:'} type={'text'} name={'brojUgovora'} />
                        </WrapperInput>
                        <div>
                            <StyleP>Datum akontacije:</StyleP>
                            <CustomDatePicker
                                handleSelectedDate={(date) => {
                                    setErrorToShow((prev) => ({ ...prev, datumAkontacije: false }))
                                    setFieldValue('datumAkontacije', formatDate(date, true))
                                }}
                            />
                            {errorToShow.datumAkontacije && <ErrorMessage>Odaberite datum akontacije</ErrorMessage>}
                        </div>
                        <div>
                            <StyleP>Rok isporuke:</StyleP>
                            <CustomDatePicker
                                handleSelectedDate={(date) => {
                                    setErrorToShow((prev) => ({ ...prev, rokIsporuke: false }))
                                    setFieldValue('rokIsporuke', formatDate(date, true))
                                }}
                                minDate={new Date()}
                            />
                            {errorToShow.rokIsporuke && <ErrorMessage>Odaberite datum roka isporuke</ErrorMessage>}
                        </div>
                        <Select
                            placeholder={'Odaberi proizvode'}
                            isMulti
                            name="colors"
                            options={productOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={(change) => {
                                const productsForContract: Array<Number> = []
                                change.map((item) => productsForContract.push(parseInt(item.value)))
                                if (change) {
                                    setErrorToShow((prev) => ({ ...prev, products: false }))
                                } else {
                                    setErrorToShow((prev) => ({ ...prev, products: true }))
                                }
                                setFieldValue('products', productsForContract)
                            }}
                        />
                        {errorToShow.products && <ErrorMessage>Odaberite minimum jedan proizvod</ErrorMessage>}
                        <Button label={'Kreiraj novi ugovor'} />
                    </WrapperForm>
                </Form>
            )}
        </Formik>
    )
}

export default CreateContractForm
