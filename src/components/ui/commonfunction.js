export const isBookmarked = (contractRowKey, bookMarks) => {
    return bookMarks.some(b => b.objectID === contractRowKey);
  }