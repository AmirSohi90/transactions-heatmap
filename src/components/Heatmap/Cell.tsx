import React from 'react';

type CellProps = {
    backgroundColour?: string;
}

export const Cell: React.FC<CellProps> = ({ backgroundColour = 'neutral' }) => <div className={`cell ${backgroundColour}`} role="cell"/>