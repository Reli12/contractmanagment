import IContract from '../types/contract.types'

const generateContracts = (numContracts: number): IContract[] => {
    const contracts: IContract[] = []
    const statusOptions: Array<IContract['status']> = ['KREIRANO', 'NARUČENO', 'ISPORUČENO']
    const customerNames: string[] = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown']
    const productList: Array<Array<number>> = [
        [1, 2, 3],
        [3, 4, 5],
        [4, 2],
        [1, 3, 4],
    ]

    for (let i = 0; i < numContracts; i++) {
        const contract: IContract = {
            id: i + 1,
            kupac: customerNames[Math.floor(Math.random() * customerNames.length)],
            broj_ugovora: `${Math.floor(Math.random() * 10)}/${new Date().getFullYear()}`,
            datum_akontacije: generateRandomDate(),
            rok_isporuke: generateRandomDate(),
            status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
            products: productList[Math.floor(Math.random() * productList.length)],
        }
        contracts.push(contract)
    }

    return contracts
}

const generateRandomDate = (): string => {
    const year = Math.floor(Math.random() * (2025 - 2020 + 1)) + 2020
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export default generateContracts
