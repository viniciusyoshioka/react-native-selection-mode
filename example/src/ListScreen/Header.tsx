import { useEffect } from "react"
import { StatusBar } from "react-native"
import { Appbar } from "react-native-paper"


export interface HeaderProps {
  isSelectionMode: boolean
  selectedCount: number
  exitSelectionMode: () => void
  toggleSelection: () => void
}


export function Header(props: HeaderProps) {


  function getTitle() {
    if (props.isSelectionMode) {
      return `${props.selectedCount} selected`
    }
    return "Selection mode example"
  }


  useEffect(() => {
    StatusBar.setBackgroundColor("rgb(30, 30, 30)")
  }, [])


  return (
    <Appbar.Header style={{ backgroundColor: "rgb(30, 30, 30)" }}>
      {props.isSelectionMode && (
        <Appbar.Action
          icon={"close"}
          onPress={props.exitSelectionMode}
        />
      )}

      <Appbar.Content title={getTitle()} />

      {props.isSelectionMode && (
        <Appbar.Action
          icon={"swap-horizontal"}
          onPress={props.toggleSelection}
        />
      )}
    </Appbar.Header>
  )
}
