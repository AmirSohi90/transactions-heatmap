Plan of action:

There will be two sides to this. Formatting the data and creating the heatmap chart.

1 - first take the transactions and format them to my liking

Thinking of having an object of objects where the key is the date, total of successful amounts and total of failed amounts and the number of successful/failed transactions.

Structure could look like the following:

``"2019-01-01: {
    date: string;
    successfulAmount: number;
    failedAmount: number;
    numberOfTransactions: number;
}``

The numnberOfTransactions will increase by 1 if transaction is successful and decrease by 1 if failed.

The failed/successfulAmount will be the total

This will be called when the component mounts and to avoid it being called more than once will check if value is `null`.

2 - Render the correct number of cells. Will need to render the number of days in the year, range from a start and end date

Will need to render the days on the side and months on the top

EDGE CASE TO THINK ABOUT: when rendering the cells need to make sure that the day starts on the correct day i.e. 2019 starts on a Tuesday but if you render the cells as is it'd start on a Sunday. Will need to render some empty cells

3 - The background colour of the cell needs to be determined by a factor. Might be worth taking the day with the highest amount of successful transactions (with a successful day) and the highest amount of failed transactions (with a failed day) and comparing it to that

- If it's more than half we can do one colour, if it's less than half do another. Should be 4 colours in total.

EDGE CASE TO THINK ABOUT - neutral days. If it comes out to no transactions or the numberOfTransactions is 0 compare the total amounts of the two and whichever is higher use that as the basis of above

EDGE CASE TO THINK ABOUT - neutral days + same amounnt of high and low transactions totals. Keep it a neutral colour


After finishing:

Things I'd have liked to have done with more time:

- test coverage over reducer
- implement eslint
- better styling tool like sass or StyledComponents
- With loads more time a small backend application to format the data after making a get request. I feel like it shouldn't be done on the front end due to how much formatting needs to be done
