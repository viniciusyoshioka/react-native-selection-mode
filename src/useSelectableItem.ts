

export interface SelectableItem {
    onClick: () => void
    onSelect: () => void
    onDeselect: () => void
    isSelectionMode: boolean
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
