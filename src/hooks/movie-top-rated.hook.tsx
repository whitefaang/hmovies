import { IMovie, IMovieSearchPage } from 'models/api.model'
import { PageInfo } from 'models/movie.model'
import { useEffect, useRef, useState } from 'react'
import useArray from './array.hook'
import useFetch, { RequestStatus } from './fetch.hook'

function useMovieTopRated(): {
  data: IMovie[]
  status: RequestStatus
  pageInfo?: PageInfo
  next: () => void
} {
  const movieState = useArray<IMovie>()
  const [pageInfo, setPageInfo] = useState<PageInfo>()
  const movies = useFetch<IMovieSearchPage>()
  const lastRequestedPage = useRef(1)
  const fetchRecords = (query: string) => {
    movies
      .exec(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US${query}`
      )
      .then((res) => {
        movieState.concat(res.results)
        setPageInfo(() => ({
          page: res.page,
          totalPages: res.total_pages,
          totalResults: res.total_results
        }))
      })
  }

  useEffect(() => {
    fetchRecords(`&page=${lastRequestedPage.current}`)
  }, [])

  const next = () => {
    const nextPage = (pageInfo?.page || 0) + 1
    if (
      movies.status !== 'loading' &&
      movies.status !== 'failed' &&
      nextPage === lastRequestedPage.current + 1
    ) {
      lastRequestedPage.current = lastRequestedPage.current + 1
      fetchRecords(`&page=${nextPage}`)
    }
  }

  return {
    data: movieState.value,
    next,
    status: movies.status,
    pageInfo
  }
}

export { useMovieTopRated }

export default useMovieTopRated
