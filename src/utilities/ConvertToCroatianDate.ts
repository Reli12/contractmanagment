const convertToCroatianDateFormat = (dateString: string) => {
    return dateString.split('-').reverse().join(".")
}

export default convertToCroatianDateFormat
