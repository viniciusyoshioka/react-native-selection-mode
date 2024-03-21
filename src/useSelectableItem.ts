
export interface SelectableItem {

  /**
   * Function called when the item is clicked and the component is not
   * in selection mode. Similar to `onPress`.
   */
  onClick: () => void

  /**
   * When in selection mode, this function is called when the item is
   * not selected and is pressed.
   *
   * If you want to select the item, you still have to call
   * `useSelectionMode().select()` manually. If needed, its also possible
   * to execute other actions.
   */
  onSelect: () => void

  /**
   * When in selection mode, this function is called when the item is
   * is selected and is pressed.
   *
   * If you want to deselect the item, you still have to call
   * `useSelectionMode().deselect()` manually. If needed, its also possible
   * to execute other actions.
   */
  onDeselect: () => void

  /**
   * Indicates the selection mode state to the component.
   */
  isSelectionMode: boolean

  /**
   * Indicates if the component is selected.
   */
  isSelected: boolean
}


export interface UseSelectableItem {

  /**
   * This function should be passed to the components `onPress` or `onClick`
   * prop. It handles whether to call `onClick`, `onSelect` or `onDeselect`
   * from `SelectableItem`.
   */
  onPress: () => void

  /**
   * This function should be called when the component receives a long press
   * or when you want to select the item and activate the selection mode.
   *
   * The difference between `onLongPress` and `SelectionMode.select` is that
   * `onLongPress` will only select the item and activate the selection mode
   * if the selection mode is not active when called.
   */
  onLongPress: () => void
}


export function useSelectableItem<T extends SelectableItem>(props: T): UseSelectableItem {


  function onPress() {
    if (!props.isSelectionMode) {
      props.onClick()
    } else if (!props.isSelected) {
      props.onSelect()
    } else if (props.isSelected) {
      props.onDeselect()
    }
  }

  function onLongPress() {
    if (!props.isSelectionMode) {
      props.onSelect()
    }
  }


  return { onPress, onLongPress }
}
