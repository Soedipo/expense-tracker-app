/**
 * Hook to remove leading zeros from a number or numeric string.
 * Returns the cleaned value as a number (int or float).
 *
 * @param {string | number} input - The number or string to sanitize.
 * @returns {number} The number without leading zeros.
 */
export const useSanitize = () => {
  const trimLeadingZeros = (input) => {
    if (typeof input === "number") {
      return input; // No leading zeros to trim
    }

    if (typeof input !== "string") {
      return 0; // Return 0 for non-string inputs
    }

    // Trim leading zeros and convert to number
    const trimmed = input.replace(/^0+/, "");
    return trimmed;
  };

  return { trimLeadingZeros };
};
