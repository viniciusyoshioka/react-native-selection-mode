import { useCallback, useState } from "react"


export interface SelectionMode<T> {

  /**
   * Indicates whether the selection mode is active or not.
   */
  isSelectionMode: boolean

  /**
   * Sets the selected data.
   *
   * Useful if you want to toggle the selection.
   *
   * **Attention**:
   * - This function does not check if the item is already selected.
   * - The value passed to this function will replace the current value.
   * - It does not change the selection mode, so, only use if you don't need
   * to change it.
   * - Another option is to call `setIsSelectionMode` with the new value when
   * changing the selected data with this function. However, the usage of
   * `setIsSelectionMode` is not recommended.
   *
   * **Obs.**: When using selection mode, its recommended to select the
   * items id instead of items value. Use the items data from the original
   * set. Prefer primitive types like `string` or `number`.
   */
  setSelectedData: React.Dispatch<React.SetStateAction<Set<T>>>

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
   * If the selection mode is not active, it will be activated.
   *
   * @param item The item to be selected. It will be added to the
   * `selectedData` set.
   *
   * **Obs.**: When using selection mode, its recommended to select the
   * items id instead of items value. Use the items data from the original
   * set. Prefer primitive types like `string` or `number`.
   */
  select: (item: T) => void

  /**
   * Deselects the item.
   *
   * - If the item is not selected, nothing happens.
   * - If there is no item selected after deselect, the selection
   * mode will be deactivated.
   *
   * @param item The item to be deselected. It will be removed from
   * the `selectedData` set.
   *
   * **Obs.**: When using selection mode, its recommended to select the
   * items id instead of items value. Use the items data from the original
   * set. Prefer primitive types like `string` or `number`.
   */
  deselect: (item: T) => void

  /**
   * Exits the selection mode and deselect all items.
   */
  exitSelection: () => void
}


export function useSelectionMode<T>(): SelectionMode<T> {


  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [selectedData, setSelectedData] = useState(new Set<T>())


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
    setSelectedData,
    length,
    isSelected,
    select,
    deselect,
    exitSelection,
  }
}
