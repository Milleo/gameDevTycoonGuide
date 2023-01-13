const convertNumberToSymbols = (value) => {
    let symbol = "+";
    if(value <= 1){
        symbol = "-";
        return symbol.repeat(3 - value);
    }
    return symbol.repeat(value - 1);
}

export { convertNumberToSymbols };