export function exponentialToNumber(exponential: any): string {
    // Ensure the input is a string to handle all cases correctly
    let str = exponential.toString();
    
    if (str.includes('e') || str.includes('E')) {
        // Split the string at 'e' or 'E'
        let parts = str.split(/[eE]/);
        let base = parts[0];

        return Number(base).toFixed(6)
    } else {
        // If the number is already in normal form and potentially very large, return as is
        return str;
    }
}
