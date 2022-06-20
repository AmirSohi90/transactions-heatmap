import React from "react";
import dates from '../../shared/constants/dates'

type MonthProps = {
    index: number;
}

enum Monthly {
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
}

export const Month: React.FC<MonthProps> = ({ index }) => {
    const date = new Date(dates.startDate.getFullYear(), dates.startDate.getMonth(), dates.startDate.getDate() + (index * 7));
    const month = date.getMonth();
    return (
        <span className={`month ${Monthly[month]}`}>{Monthly[month]}</span>
    )
}