import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface ICustomDatePicker {
    minDate?: Date
    handleSelectedDate: (date: Date) => void
}

const CustomDatePicker = ({ minDate, handleSelectedDate }: ICustomDatePicker) => {
    const [selectedDate, setSelectedDate] = useState(minDate || new Date())

    const onChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date)
            handleSelectedDate(date)
        }
    }

    return <DatePicker minDate={minDate} selected={selectedDate} onChange={onChange} dateFormat="dd-MM-yyyy" />
}

export default CustomDatePicker
