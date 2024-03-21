import { useEffect } from "react"
import { BackHandler } from "react-native"


export type BackhandlerCallback = () => boolean | null | undefined


export function useBackhandler(callback: BackhandlerCallback) {
  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", callback)
    return () => subscription.remove()
  }, [callback])
}
