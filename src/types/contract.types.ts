/*
Moguči imprvment kod tipa podataka
interface IContractArticle {
    articleId: number
    status: 'KREIRANO' | 'NARUČENO' | 'ISPORUČENO'
}*/
import StatusType from './status.type'

export default interface IContract {
    id: number
    kupac: string
    broj_ugovora: string
    datum_akontacije: string
    rok_isporuke: string
    status: StatusType
    products?: Array<number> | number //reference on the articles that is on the contract
}
