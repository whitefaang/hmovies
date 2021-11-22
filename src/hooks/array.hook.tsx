import { useState } from 'react'

function useArray<T>(prop?: T[]): {
  value: T[]
  set: (list: T[]) => void
  push: (record: T) => void
  concat: (records: T[]) => void
  remove: (idx: number) => void
} {
  const [array, setArray] = useState(prop || [])
  const push = (record: T) => {
    setArray((prev) => {
      prev.push(record)
      return prev
    })
  }
  const concat = (records: T[]) => {
    setArray((prev) => prev.concat(records))
  }
  const remove = (idx: number) => {
    setArray((prev) => prev.splice(idx, 1))
  }
  return {
    value: array,
    push,
    remove,
    concat,
    set: setArray
  }
}

export default useArray
