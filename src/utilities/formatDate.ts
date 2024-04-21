const formatDate = (date: Date | number, isDifferentFormat?: boolean): string => {
    let dateObj: Date

    if (date instanceof Date) {
        dateObj = date
    } else {
        dateObj = new Date(date)
    }

    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')

    // Concatenate and return formatted date
    return isDifferentFormat ? `${day}-${month}-${year}` : `${year}-${month}-${day}`
}

export default formatDate
