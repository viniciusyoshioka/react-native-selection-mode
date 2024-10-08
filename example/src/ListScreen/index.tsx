import { useState } from "react"
import { Alert, FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native"
import { useSelectionMode } from "react-native-selection-mode"

import { Header } from "./Header"
import { ListItem } from "./ListItem"
import { useBackHandler } from "./useBackHandler"


export function ListScreen() {


  const [listData, setListData] = useState(() => Array(30).fill(0))
  const listSelection = useSelectionMode<number>()


  useBackHandler(() => {
    if (listSelection.isSelectionMode) {
      listSelection.exitSelection()
      return true
    }
    return false
  })


  function toggleSelection() {
    listSelection.setNewSelectedData(current => {
      const newSelectedData = new Set<number>()
      listData.forEach((_, index) => {
        if (!current.has(index)) {
          newSelectedData.add(index)
        }
      })
      return newSelectedData
    })
  }

  function renderListItem({ item, index }: ListRenderItemInfo<string>) {
    return (
      <ListItem
        text={`Index: ${index}`}
        isSelectionMode={listSelection.isSelectionMode}
        isSelected={listSelection.isSelected(index)}
        onClick={() => Alert.alert("Item clicked", `You clicked on item at index: ${index}`)}
        onSelect={() => listSelection.select(index)}
        onDeselect={() => listSelection.deselect(index)}
      />
    )
  }


  return (
    <View style={styles.background}>
      <Header
        isSelectionMode={listSelection.isSelectionMode}
        selectedCount={listSelection.length()}
        exitSelectionMode={listSelection.exitSelection}
        toggleSelection={toggleSelection}
      />

      <FlatList
        data={listData}
        renderItem={renderListItem}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
  },
})
