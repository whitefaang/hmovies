import { IMovie, IMovieSearchPage } from 'models/api.model'
import { PageInfo } from 'models/movie.model'
import { useEffect, useState } from 'react'
import useArray from './array.hook'
import useDebounce from './debounce.hook'
import useFetch, { RequestStatus } from './fetch.hook'

function useMovieSearch(): {
  data: IMovie[]
  status: RequestStatus
  searchKey: string
  pageInfo?: PageInfo
  setSearchKey: (key: string) => void
  next: () => void
} {
  const movieState = useArray<IMovie>()
  const [pageInfo, setPageInfo] = useState<PageInfo>()
  const [searchKey, setSearchKey] = useState('')
  const sKey = useDebounce(searchKey, 2000)
  const movies = useFetch<IMovieSearchPage>()

  const fetchRecords = (query: string) => {
    movies
      .exec(`https://api.themoviedb.org/3/search/movie?language=en-US${query}`)
      .then((res) => {
        if (query.match(/&query/i)) {
          movieState.set(res.results)
        } else {
          movieState.concat(res.results)
        }
        setPageInfo({
          page: res.page,
          totalPages: res.total_pages,
          totalResults: res.total_results
        })
      })
  }

  const next = () => {
    const nextPage = (pageInfo?.page || 0) + 1
    fetchRecords(`&page=${nextPage}`)
  }

  useEffect(() => {
    const query = sKey ? `&query=${sKey}` : ''
    if (query) {
      fetchRecords(query)
    }
  }, [sKey])

  return {
    data: movieState.value,
    status: movies.status,
    setSearchKey,
    pageInfo,
    searchKey,
    next
  }
}

export default useMovieSearch
