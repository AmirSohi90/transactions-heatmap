import dates from '../constants/dates'

export const getNumberOfDaysInTheYear = (): number => {
    const difference = dates.endDate.getTime() - dates.startDate.getTime()
    const totalDays = Math.ceil(difference / (1000 * 3600 * 24))
    return totalDays
}

export const formatDateToYYYYMMDD = (index: number): string => {
    const date = new Date(dates.startDate.getFullYear(), dates.startDate.getMonth(), dates.startDate.getDate() + index);
    return date.toISOString().split('T')[0]
};