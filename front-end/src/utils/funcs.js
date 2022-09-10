/**
 * It takes a string as an argument and returns the same string with the first letter capitalized.
 * @param str - The string to capitalize.
 */
export const capitalizeFirstLetter = (str) => {
    let res=str+'';
    return res.charAt(0)+res.slice(1).toLowerCase();
}
