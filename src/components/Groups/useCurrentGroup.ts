import { useState } from "react"
import { GroupType } from "./GroupType"

export function useCurrentGroup() {
  const [currentGroup, setCurrentGroup] = useState<GroupType | null>(null)

  return {
    currentGroup,
    setCurrentGroup,
  }
}