import { useCallback, useState } from "react"


export interface SelectionMode<T> {

  /**
   * Indicates whether the selection mode is active or not.
   */
  isSelectionMode: boolean

  /**
   * Sets the selection mode.
   *
   * If you deactivate the selection mode, the selected data will not
   * be deselected. You have to do it manually or call `exitSelection`,
   * which is recommended.
   *
   * **Attention**: Its not recommended to use this function to change
   * the selection mode. It may be removed in the future.
   */
  setIsSelectionMode: React.Dispatch<React.SetStateAction<boolean>>

  /**
   * The array that stores the selected data.
   */
  selectedData: T[]

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
   * array. Prefer primitive types like `string` or `number`.
   */
  setSelectedData: React.Dispatch<React.SetStateAction<T[]>>

  /**
   * Selects the item.
   *
   * If the selection mode is not active, it will be activated.
   *
   * @param item The item to be selected. It will be added to the
   * `selectedData` array. The item will be added only if it is not
   * already selected.
   *
   * **Obs.**: When using selection mode, its recommended to select the
   * items id instead of items value. Use the items data from the original
   * array. Prefer primitive types like `string` or `number`.
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
   * the `selectedData` array. If there is more than one occurrence
   * of the item, only the first occurrence will be removed. This
   * can be a problem if you have duplicated items in the array
   * (e.g. through incorrect usage of `setSelectedData`).
   *
   * **Obs.**: When using selection mode, its recommended to select the
   * items id instead of items value. Use the items data from the original
   * array. Prefer primitive types like `string` or `number`.
   */
  deselect: (item: T) => void

  /**
   * Exits the selection mode and deselect all items.
   */
  exitSelection: () => void
}


export function useSelectionMode<T>(): SelectionMode<T> {


  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [selectedData, setSelectedData] = useState<T[]>([])


  const select = useCallback((item: T) => {
    if (!isSelectionMode) {
      setIsSelectionMode(true)
    }
    if (!selectedData.includes(item)) {
      setSelectedData(current => [...current, item])
    }
  }, [isSelectionMode, selectedData])

  const deselect = useCallback((item: T) => {
    const index = selectedData.indexOf(item)
    if (index === -1) {
      return
    }

    const newSelectedData = [...selectedData]
    newSelectedData.splice(index, 1)
    setSelectedData(newSelectedData)

    if (isSelectionMode && newSelectedData.length === 0) {
      setIsSelectionMode(false)
    }
  }, [selectedData, isSelectionMode])

  const exitSelection = useCallback(() => {
    setIsSelectionMode(false)
    setSelectedData([])
  }, [])


  return {
    isSelectionMode,
    setIsSelectionMode,
    selectedData,
    setSelectedData,
    select,
    deselect,
    exitSelection,
  }
}
