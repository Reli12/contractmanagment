export default interface IArticle {
    id: number
    naziv: string
    dobavljač: string
    status: 'KREIRANO' | 'NARUČENO' | 'ISPORUČENO'
}
