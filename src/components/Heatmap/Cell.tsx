import React from 'react';
import { BackgroundColours } from '../../shared/helperFunctions/getBackgroundColour'

type CellProps = {
    backgroundColour?: BackgroundColours;
}

export const Cell: React.FC<CellProps> = ({ backgroundColour = 'neutral' }) => <div className={`cell ${backgroundColour}`} role="cell"/>