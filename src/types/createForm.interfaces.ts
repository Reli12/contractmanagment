interface ICreateContract {
    name: string
    lastName: string
    brojUgovora: string
    datumAkontacije: string
    rokIsporuke: string
    products?: Array<number>
}

export default ICreateContract
