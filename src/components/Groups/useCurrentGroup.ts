import { useState } from "react"
import { FirestoreGroupType } from "./FirestoreGroupType"

export function useCurrentGroup() {
  const [currentGroup, setCurrentGroup] = useState<FirestoreGroupType | null>(null)

  return {
    currentGroup,
    setCurrentGroup,
  }
}