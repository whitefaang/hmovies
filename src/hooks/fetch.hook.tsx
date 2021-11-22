import { TOKEN } from 'constants/api'
import { useEffect, useRef, useState } from 'react'

export type RequestStatus = 'init' | 'loading' | 'failed' | 'success'

const useImageFetch = (src: string): { image: string; loading: boolean } => {
  const [loading, setLoading] = useState(true)
  const [base64, setBase64] = useState(`https://image.tmdb.org/t/p/w92/${src}`)
  useEffect(() => {
    const ac = new AbortController()
    fetch(`https://image.tmdb.org/t/p/original/${src}`, { signal: ac.signal })
      .then((res) => res.blob())
      .then((res) => {
        const reader = new FileReader()
        reader.readAsDataURL(res)
        reader.onloadend = function () {
          const base64data = reader.result
          if (base64data) {
            setBase64(base64data as string)
          }
          setLoading(false)
        }
      })
      .catch((e) => {
        if (e.name !== 'AbortError') {
          console.error(e)
        }
      })
    return () => ac.abort()
  }, [])
  return { image: base64, loading }
}

export { useImageFetch }

export default function useFetch<T = any>(): {
  exec: (input: RequestInfo, init?: RequestInit | undefined) => Promise<T>
  status: RequestStatus
} {
  const [status, setStatus] = useState<RequestStatus>('init')
  const ac = useRef(new AbortController())
  const exec = async (input: RequestInfo, init: RequestInit = {}) => {
    setStatus('loading')
    const common: RequestInit = {
      headers: {
        Authorization: TOKEN
      },
      signal: ac.current.signal
    }
    const myInit = Object.assign(init, common)
    const res = await fetch(input, myInit).catch((e) => {
      if (e.name !== 'AbortError') {
        console.error(e)
      }
    })
    if (!res?.ok) {
      setStatus('failed')
    } else {
      setStatus('success')
    }
    const json = await res?.json()
    return json
  }
  useEffect(() => {
    const acRef = ac.current
    return () => acRef.abort()
  }, [])

  return { exec, status }
}