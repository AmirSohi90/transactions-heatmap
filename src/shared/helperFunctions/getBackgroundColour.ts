type BackGroundColourInput = {
    numberOfTransactions: number;
    successfulTotal: number;
    highestSuccessfulTotal: number;
    failedTotal: number;
    highestFailedTotal: number;
}

export enum BackgroundColours {
    DARK_GREEN = 'dark-green',
    LIGHT_GREEN = 'light-green',
    DARK_RED = 'dark-red',
    LIGHT_RED = 'light-red',
    NEUTRAL = 'neutral'
}

export const getBackgroundColour = ({
                                        numberOfTransactions,
                                        successfulTotal,
                                        highestSuccessfulTotal,
                                        failedTotal,
                                        highestFailedTotal
                                    }: BackGroundColourInput): BackgroundColours => {
    if (numberOfTransactions > 0 || (numberOfTransactions === 0 && successfulTotal > failedTotal)) {
        return successfulTotal / highestSuccessfulTotal > 0.5 ? BackgroundColours.DARK_GREEN : BackgroundColours.LIGHT_GREEN;
    } else if (numberOfTransactions < 0 || numberOfTransactions === 0 && successfulTotal < failedTotal) {
        return failedTotal / highestFailedTotal > 0.5 ? BackgroundColours.DARK_RED : BackgroundColours.LIGHT_RED;
    }
    return BackgroundColours.NEUTRAL;
}