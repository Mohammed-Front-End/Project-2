/**
 * Truncates the given text to the specified maximum length and adds an ellipsis if truncated.
 *
 * @param {string} text - The text to be truncated.
 * @param {number} [max=90] - The maximum length of the truncated text. Defaults to 90.
 * @returns {string} The truncated text with an ellipsis if it exceeds the maximum length.
 */
export function textSlicer(text: string, max: number = 90){
  if (text.length >= max) {
    return `${text.slice(0, max)} ...`
  }else{
    return text
  }
}