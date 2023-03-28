export const convertIntoOptionable = (data, col) => {
    let temp = []
    for(const x of data)
    {
        temp.push({
            value: x[col[0]],
            label: x[col[1]]
        })
    }
    return temp
}