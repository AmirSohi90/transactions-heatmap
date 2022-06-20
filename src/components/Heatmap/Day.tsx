import React from "react";

type DayProps = {
    index: number;
}

enum DayNames {
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thur',
    'Fri',
    'Sat'
}

export const Day: React.FC<DayProps> = ({ index }) => {
    return <span className="weekday">{DayNames[index]}</span>
}