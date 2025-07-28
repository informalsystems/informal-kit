/**
 * Distributes an array of items evenly across a number of groups.
 * @param array - The array of items to distribute.
 * @param numGroups - The number of groups to distribute the items across.
 * @returns An array of `numGroups` arrays
 * @example
 * const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']
 * const bucketedItems = distributeEvenly(items, 4)
 * console.log(bucketedItems)
 * // Output: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'], ['j', 'k']]
 */
export function distributeEvenly<T>(array: T[], numGroups: number) {
  return array.reduce<T[][]>((acc, item, index) => {
    const groupIndex = index % numGroups
    acc[groupIndex] = [...(acc[groupIndex] ?? []), item]
    return acc
  }, Array(numGroups).fill([]))
}
