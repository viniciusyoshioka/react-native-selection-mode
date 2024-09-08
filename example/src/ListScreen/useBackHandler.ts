import { useEffect } from "react"
import { BackHandler } from "react-native"


export type BackHandlerCallback = () => boolean | null | undefined


export function useBackHandler(callback: BackHandlerCallback) {
  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", callback)
    return () => subscription.remove()
  }, [callback])
}
