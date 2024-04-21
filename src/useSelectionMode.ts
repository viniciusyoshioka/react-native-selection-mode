import { useCallback, useState } from "react"


export interface SelectionMode<T> {

  /**
   * Indicates whether the selection mode is active or not.
   */
  isSelectionMode: boolean

  /**
   * @returns The selected data as array.
   */
  getSelectedData: () => T[]

  /**
   * Sets the selected data.
   *
   * Useful if you want to toggle the selection or handle the selected data
   * in a complex way.
   *
   * - If the selection mode is active and the new value is an empty set,
   * the selection mode will be deactivated.
   * - If the selection mode is not active and the new value is not an empty set,
   * the selection mode will be activated.
   *
   * **Attention**:
   * - This function uses the Set data structure. The type of its params may change
   * in the future according to the internal implementation.
   * - The value passed to this function will replace the current selected data.
   *
   * @param newValue The new selected data. Can be a Set or a function that receives
   * the current selected data and returns a one. Similar to the `setState` function.
   */
  setNewSelectedData: (newValue: Set<T> | ((current: Set<T>) => Set<T>)) => void

  /**
   * @returns The number of selected items.
   */
  length: () => number

  /**
   * Checks if the item is selected.
   *
   * @param item The item to be checked.
   *
   * @returns `true` if the item is selected, `false` otherwise.
   */
  isSelected: (item: T) => boolean

  /**
   * Selects the item.
   *
   * - If the item is already selected, nothing happens.
   * - If the selection mode is not active, it will be activated.
   *
   * @param item The item to be selected.
   */
  select: (item: T) => void

  /**
   * Deselects the item.
   *
   * - If the item is not selected, nothing happens.
   * - If there is no item selected after deselect, the selection
   * mode will be deactivated.
   *
   * @param item The item to be deselected.
   */
  deselect: (item: T) => void

  /**
   * Exits the selection mode and deselects all items.
   */
  exitSelection: () => void
}


export function useSelectionMode<T>(): SelectionMode<T> {


  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [selectedData, setSelectedData] = useState(new Set<T>())


  const getSelectedData = useCallback(() => {
    return Array.from(selectedData)
  }, [selectedData])

  const setNewSelectedData = useCallback((
    newValue: Set<T> | ((current: Set<T>) => Set<T>)
  ) => {
    if (typeof newValue === "function") {
      newValue = newValue(selectedData)
    }

    if (isSelectionMode && newValue.size === 0) {
      setIsSelectionMode(false)
    }
    if (!isSelectionMode && newValue.size > 0) {
      setIsSelectionMode(true)
    }
    setSelectedData(newValue)
  }, [selectedData, isSelectionMode])

  const length = useCallback(() => {
    return selectedData.size
  }, [selectedData])

  const isSelected = useCallback((item: T) => {
    return selectedData.has(item)
  }, [selectedData])

  const select = useCallback((item: T) => {
    if (!isSelectionMode) {
      setIsSelectionMode(true)
    }

    setSelectedData(current => {
      const newSelectedData = new Set(current)
      newSelectedData.add(item)
      return newSelectedData
    })
  }, [isSelectionMode])

  const deselect = useCallback((item: T) => {
    if (!selectedData.has(item)) {
      return
    }

    const newSelectedData = new Set(selectedData)
    newSelectedData.delete(item)
    setSelectedData(newSelectedData)

    if (isSelectionMode && newSelectedData.size === 0) {
      setIsSelectionMode(false)
    }
  }, [selectedData, isSelectionMode])

  const exitSelection = useCallback(() => {
    setIsSelectionMode(false)
    setSelectedData(current => {
      current.clear()
      return current
    })
  }, [])


  return {
    isSelectionMode,
    getSelectedData,
    setNewSelectedData,
    length,
    isSelected,
    select,
    deselect,
    exitSelection,
  }
}
