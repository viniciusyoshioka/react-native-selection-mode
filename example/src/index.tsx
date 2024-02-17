import { GestureHandlerRootView } from "react-native-gesture-handler"
import { MD3DarkTheme, PaperProvider } from "react-native-paper"

import { ListScreen } from "./ListScreen"


export function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider theme={MD3DarkTheme}>
                <ListScreen />
            </PaperProvider>
        </GestureHandlerRootView>
    )
}
