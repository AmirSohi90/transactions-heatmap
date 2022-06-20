import React from "react";
import { Month } from "./Month";

type MonthsProps = {
    numberOfDays: number;
}

export const Months: React.FC<MonthsProps> = ({ numberOfDays }) => {
    const months = Array.from(new Array(Math.floor(numberOfDays / 7)))

    return <div className="months-wrapper">
        {months.map((_, index) => <Month key={index} index={index}/>)}
    </div>
}

