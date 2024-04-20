export default interface IProduct {
    id: number
    naziv: string
    dobavljač: string
    status: 'KREIRANO' | 'NARUČENO' | 'ISPORUČENO'
}
//status nije potreban kod svakoga artikla
//tipa ako se ima jedan repozitorij gdje se nalaze svi artikli oni mogu biti naručeni
//za različite ugovore te jedan artikl može imati više statusa
//status: 'KREIRANO' | 'NARUČENO' | 'ISPORUČENO'
