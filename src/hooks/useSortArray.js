export const useSortArray = (array, order = "asc") => {
  const sortArray = (array, order) => {
    return [...array].sort((a, b) => {
      const dateA = new Date(a.transactionDate);
      const dateB = new Date(b.transactionDate);

      if (order === "asc") return dateB - dateA; // Sort in descending order
      else if (order === "desc") return dateA - dateB; // Sort in ascending order
      else return 0; // No sorting
    });
  };

  return sortArray(array, order);
};
