export function exponentialToNumber(exponential: number, decimals: number): number {

    // Ensure the input is a string to handle all cases correctly
    let str =   floorToDecimalPlaces(Number(exponential.toString())/ 10**decimals);

    return str;
}

export function floorToDecimalPlaces(num: number) {
    return Math.floor(num * 10000) / 10000;
}