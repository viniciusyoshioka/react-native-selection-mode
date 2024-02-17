import { GestureHandlerRootView } from "react-native-gesture-handler"

import { ListScreen } from "./ListScreen"


export function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ListScreen />
        </GestureHandlerRootView>
    )
}
