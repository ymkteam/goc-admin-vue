export const generateId = () => {
  const uniqueId = Math.random()
    .toString(36)
    .substring(2)
  return uniqueId
}
