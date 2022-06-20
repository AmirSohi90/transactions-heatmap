import React from 'react';
import { Day } from "./Day";

export const Days: React.FC = () => {
    const weekdays = Array.from(new Array(7))

    return <div className="days-wrapper">
        {weekdays.map((_, index) => <Day key={index} index={index}/>)}
    </div>
}