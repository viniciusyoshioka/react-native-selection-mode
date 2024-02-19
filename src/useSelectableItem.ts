

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


export function useSelectableItem<T extends SelectableItem>(props: T) {


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
