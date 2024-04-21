import FilterStatus from '../constants/filterStatus'

interface FilterForm {
    filterValue?: string
    statusFilter?: FilterStatus.active | FilterStatus.noValue | FilterStatus.inactive
}

export default FilterForm
