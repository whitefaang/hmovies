import { IMovieDetail } from 'models/api.model'
import { useEffect, useState } from 'react'
import useFetch, { RequestStatus } from './fetch.hook'

export default function useMovieDetail(id: string): {
  status: RequestStatus
  data: IMovieDetail | undefined
} {
  const movie = useFetch()
  const [movieState, setMovieState] = useState<IMovieDetail>()
  useEffect(() => {
    movie.exec(`https://api.themoviedb.org/3/movie/${id}`).then((res) => {
      setMovieState(res)
    })
  }, [])

  return {
    data: movieState,
    status: movie.status
  }
}
