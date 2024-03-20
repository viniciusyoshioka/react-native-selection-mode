import { Pressable, StyleSheet, Text } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { SelectableItem, useSelectableItem } from "react-native-selection-mode"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"


export interface ListItemProps extends SelectableItem {
    text: string
}


export function ListItem(props: ListItemProps) {


    const backgroundColor = "rgb(0, 0, 0)"
    const rippleColor = "rgba(200, 200, 200, 0.3)"

    const { onPress, onLongPress } = useSelectableItem(props)


    const longPressGesture = Gesture.LongPress()
        .maxDistance(30)
        .minDuration(400)
        .onStart(event => onLongPress())


    function UnkmarkedIcon() {
        return (
            <Icon
                name={"checkbox-blank-outline"}
                size={24}
                color={"rgb(221, 221, 221)"}
                style={{ marginRight: 16 }}
            />
        )
    }

    function MarkedIcon() {
        return (
            <Icon
                name={"checkbox-marked"}
                size={24}
                color={"rgb(95, 145, 255)"}
                style={{ marginRight: 16 }}
            />
        )
    }

    function SelectionIcon() {
        if (!props.isSelectionMode) return null
        if (props.isSelected) return <MarkedIcon />
        return <UnkmarkedIcon />
    }


    return (
        <GestureDetector gesture={longPressGesture}>
            <Pressable
                onPress={onPress}
                style={[styles.button, { backgroundColor }]}
                android_ripple={{ color: rippleColor }}
            >
                <SelectionIcon />

                <Text
                    style={styles.text}
                    children={props.text}
                />
            </Pressable>
        </GestureDetector>
    )
}


const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        width: "100%",
        height: 64,
        paddingHorizontal: 16,
    },
    text: {
        fontSize: 15,
        color: "#ddd",
    },
})
