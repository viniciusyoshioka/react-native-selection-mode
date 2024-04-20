# react-native-selection-mode

Library to handle selection mode.

## Installation

```sh
npm install react-native-selection-mode
# or
yarn add react-native-selection-mode
```

## Observations

There are a few observations to know before using this library:

- Only function components are supported.
- Should work without React Native as long as you can detect the long press gesture or activate the selection mode manually.
- The example app and [Usage](#usage) section contains React Native code. However, you can adapt it if you don't use React Native.

## Usage

- The item component that is shown in your list

    ```tsx
    // ListItem.tsx

    import { Pressable } from "react-native"
    import { Gesture, GestureDetector } from "react-native-gesture-handler"
    import { SelectableItem, useSelectableItem } from "react-native-selection-mode"


    export interface ListItemProps extends SelectableItem {}


    export function ListItem(props: ListItemProps) {


        const { onPress, onLongPress } = useSelectableItem(props)


        const longPressGesture = Gesture.LongPress()
            .maxDistance(30)
            .minDuration(400)
            .onStart(event => onLongPress())


        return (
            <GestureDetector gesture={longPressGesture}>
                <Pressable onPress={onPress}>
                    {/* ... */}
                </Pressable>
            </GestureDetector>
        )
    }
    ```

- The screen, page or component that contains a list

    ```tsx
    // List.tsx

    import { useState } from "react"
    import { ListRenderItemInfo } from "react-native"
    import { useSelectionMode } from "react-native-selection-mode"

    import { ListItem } from "./ListItem"


    export function List() {


        const [data, setData] = useState<number[]>([])
        const listSelection = useSelectionMode<number>()


        function renderItem({ item, index }: ListRenderItemInfo<number>) {
            return (
                <ListItem
                    isSelectionMode={listSelection.isSelectionMode}
                    isSelected={listSelection.isSelected(index)}
                    onClick={() => console.log("Click")}
                    onSelect={() => listSelection.select(index)}
                    onDeselect={() => listSelection.deselect(index)}
                />
            )
        }


        return (
            <FlatList
                data={data}
                renderItem={renderItem}
            />
        )
    }
    ```

## API

### Hook `useSelectionMode`

``` ts
function useSelectionMode<T>(): SelectionMode<T>
```

This is the hook that controls the selection mode. It should be used in you list component.

The returned object is described at [Interface `SelectionMode`](#interface-selectionmode)

### Interface `SelectionMode<T>`

Contains functions that controls the selection and variables about the selection state.

`T` is the data type that represents the selected item.

**Important**: Prefer unique data for each item, such as id, index or uuid. If you choose the item itself, make sure it is not repeated. Otherwise it may cause bugs.

- `isSelectionMode`

    ```ts
    isSelectionMode: boolean
    ```

    Indicates whether the selection mode is active or not.

- `setNewSelectedData`

    ```ts
    function setSelectedData(data: Set<T> | ((current: Set<T>) => Set<T>)): void
    ```

    Sets the selected data.

    Useful if you want to toggle the selection or handle the selected data in a complex way.

    - If the selection mode is active and the new value is an empty set, the selection mode will be deactivated.
    - If the selection mode is not active and the new value is not an empty set, the selection mode will be activated.

    **Attention**:
    - This function uses the Set data structure. The type of its params may change in the future according to the internal implementation.
    - The value passed to this function will replace the current selected data.

    Params:

    - `newValue`: The new selected data. Can be a Set or a function that receives the current selected data and returns a one. Similar to the `setState` function.

- `length`

    ```ts
    function length(): number
    ```

    Returns: The number of selected items.

- `isSelected`

    ```ts
    function isSelected(item: T): boolean
    ```

    Checks if the item is selected.

    Params:

    - `item`: The item to be checked.

    Returns: `true` if the item is selected, `false` otherwise.

- `select`

    ```ts
    function select(item: T): void
    ```

    Selects the item.

    - If the item is already selected, nothing happens.
    - If the selection mode is not active, it will be activated.

    Params:

    - `item`: The item to be selected.

- `deselect`

    ```ts
    function deselect(item: T): void
    ```

    Deselects the item.

    - If the item is not selected, nothing happens.
    - If there is no item selected after deselect, the selection mode will be deactivated.

    Params:

    - `item`: The item to be deselected.

- `exitSelection`

    ```ts
    function exitSelection(): void
    ```

    Exits the selection mode and deselects all items.

### Hook `useSelectableItem`

```ts
function useSelectableItem<T extends SelectableItem>(props: T): UseSelectableItem
```

Consumes the selection mode from [`useSelectionMode`](#hook-useselectionmode) passed to the component through [`SelectableItem` interface](#interface-selectableitem). Its returned object is [`UseSelectableItem`](#interface-useselectableitem). This hook must be called in the items components.

### Interface `SelectableItem`

Contains properties and functions about the selection mode to be handled by [`useSelectableItem`](#hook-useselectableitem).

- `onClick`

    ```ts
    function onClick(): void
    ```

    Function called when the item is clicked and the component is not in selection mode. Similar to `onPress`.

- `onSelect`

    ```ts
    function onSelect(): void
    ```

    When in selection mode, this function is called when the item is not selected and is pressed.

    If you want to select the item, you still have to call `useSelectionMode().select()`.

- `onDeselect`

    ```ts
    function onDeselect(): void
    ```

    When in selection mode, this function is called when the item is is selected and is pressed.

    If you want to deselect the item, you still have to call `useSelectionMode().deselect()`.

- `isSelectionMode`

    ```ts
    isSelectionMode: boolean
    ```

    Indicates the selection mode state to the component.

- `isSelected`

    ```ts
    isSelected: boolean
    ```

    Indicates if the component is selected.

### Interface `UseSelectableItem`

The object's type returned by [`useSelectableItem`](#hook-useselectableitem). It contains functions to be used by a selectable list item. Those functions manages when to call `onClick`, `onSelect` and `onDeselect` according to selection mode and the item's selection, as the same click event can represent diferent action in the context of selection mode.

- `onPress`

    ```ts
    function onPress(): void
    ```

    This function should be passed to the components `onPress` or `onClick` prop. It handles whether to call `onClick`, `onSelect` or `onDeselect` from `SelectableItem`.

- `onLongPress`

    ```ts
    function onLongPress(): void
    ```

    This function should be called when the component receives a long press or when you want to select the item and activate the selection mode.

    The difference between `onLongPress` and `SelectionMode.select` is that `onLongPress` will only select the item and activate the selection mode if the selection mode is not active when called.
