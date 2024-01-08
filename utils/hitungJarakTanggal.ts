export function calculateDateDifference(date1: Date, date2: Date): number {
  const timeDifference = Math.abs(date2.getTime() - date1.getTime())
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
  return daysDifference
}
