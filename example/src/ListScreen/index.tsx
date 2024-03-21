import { useState } from "react"
import { Alert, FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native"
import { useSelectionMode } from "react-native-selection-mode"

import { Header } from "./Header"
import { ListItem } from "./ListItem"
import { useBackhandler } from "./useBackhandler"


export function ListScreen() {


  const [listData, setListData] = useState(() => Array(30).fill(0))
  const listSelection = useSelectionMode<number>()


  useBackhandler(() => {
    if (listSelection.isSelectionMode) {
      listSelection.exitSelection()
      return true
    }
    return false
  })


  function toggleSelection() {
    listSelection.setSelectedData(current => {
      const newSelectedData: number[] = []
      listData.forEach((_, index) => {
        if (!current.includes(index)) {
          newSelectedData.push(index)
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
        isSelected={listSelection.selectedData.includes(index)}
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
        selectedCount={listSelection.selectedData.length}
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
