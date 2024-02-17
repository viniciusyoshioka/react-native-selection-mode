import { useState } from "react"
import { Alert, FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native"
import { useSelectionMode } from "react-native-selection-mode"

import { ListItem } from "./ListItem"


function getListData(): string[] {
    return Array(30).fill(0)
}


export function ListScreen() {


    const [listData, setListData] = useState(getListData)
    const listSelection = useSelectionMode<number>()


    function renderListItem({ item, index }: ListRenderItemInfo<string>) {
        return (
            <ListItem
                text={`Index: ${index}`}
                index={index}
                isSelectionMode={listSelection.isSelectionMode}
                isSelected={listSelection.selectedData.includes(index)}
                onClick={() => Alert.alert("Item clicked", `You clicked item at index: ${index}`)}
                onSelect={() => listSelection.select(index)}
                onDeselect={() => listSelection.deselect(index)}
            />
        )
    }


    return (
        <View style={styles.background}>
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
