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
    return <div className="weekday"><p>{DayNames[index]}</p></div>
}