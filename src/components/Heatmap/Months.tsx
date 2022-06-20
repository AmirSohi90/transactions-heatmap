import React from "react";
import { Month } from "./Month";
import { getNumberOfDaysInTheYear } from "../../shared/helperFunctions/formatDates";

export const Months: React.FC = () => {
    const months = Array.from(new Array(getNumberOfDaysInTheYear()));

    return <div className="months-wrapper">
        {months.map((_, index) => <Month key={index} index={index}/>)}
    </div>
}

