const minMaxSum = (arr) => {
    let minElement = Math.min.apply(null, arr)
    let maxElement = Math.max.apply(null, arr)
    let maxArr = [...arr]
    let minArr = [...arr]
    maxArr.splice(maxArr.indexOf(minElement), 1)
    minArr.splice(minArr.indexOf(maxElement), 1)
    let minSum = minArr.reduce((s,i) => s+i)
    let maxSum = maxArr.reduce((s,i) => s+i)
    console.log(`${minSum} ${maxSum}`)
}