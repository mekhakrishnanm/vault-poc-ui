export function exponentialToNumber(exponential: any): string {
    // Ensure the input is a string to handle all cases correctly
    let str = exponential.toString();
    console.log("🚀 ~ exponentialToNumber ~ str:", str)
    
    if (str.includes('e') || str.includes('E')) {
        // Split the string at 'e' or 'E'
        let parts = str.split(/[eE]/);
        let base = parts[0];

        return Number(base).toFixed(6)

        // let exponent = parseInt(parts[1], 10);

        // // Handle the decimal and adjust for exponent
        // let decimalSplit = base.split('.');
        // let decimalLength = decimalSplit.length > 1 ? decimalSplit[1].length : 0;

        // if (exponent >= 0) {
        //     let totalLength = decimalLength + exponent;
        //     let adjustedBase = base.replace('.', '');

        //     // Pad the number with zeros if necessary
        //     while (adjustedBase.length < totalLength) {
        //         adjustedBase += '0';
        //     }

        //     return adjustedBase;
        // } else {
        //     // Handle negative exponent which implies a fraction
        //     let zeros = Math.abs(exponent) - decimalLength;
        //     let result = '0.';
        //     while (zeros > 1) {
        //         result += '0';
        //         zeros--;
        //     }
        //     return result + base.replace('.', '');
        // }
    } else {
        // If the number is already in normal form and potentially very large, return as is
        return str;
    }
}
