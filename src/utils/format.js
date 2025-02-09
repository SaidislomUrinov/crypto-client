const format = (balance, min=2, max=2) => {
    // return balance?.toLocaleString(undefined, { minimumFractionDigits: min, maximumFractionDigits: max });
    return balance?.toFixed(min)
};
export default format