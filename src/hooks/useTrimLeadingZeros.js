import { useMemo } from "react";

/**
 * Hook to remove leading zeros from a number or numeric string.
 * Returns the cleaned value as a number (int or float).
 *
 * @param {string | number} input - The number or string to sanitize.
 * @returns {number} The number without leading zeros.
 */
export const useTrimLeadingZeros = (input) => {
  const cleaned = useMemo(() => {
    if (input === 0 || input === "0") return 0;

    // Convert to string, remove leading zeros
    const sanitized = String(input).replace(/^0+(?=\d)/, "");

    // Return as number (auto handles integer or float)
    return Number(sanitized);
  }, [input]);

  return cleaned;
};
