import { render, screen } from '@testing-library/react'
import faker from 'faker'
import useMovieTopRated from 'hooks/movie-top-rated.hook'
import { IMovie } from 'models/api.model'
import { useNavigate } from 'react-router'
import Dashboard from './dashboard.page'

jest.mock('react-router')

jest.mock('hooks/movie-top-rated.hook', () => jest.fn())

const fakeData = () => ({
  data: new Array(20).fill(1).map(
    (): Partial<IMovie> => ({
      backdrop_path: faker.image.people(),
      poster_path: faker.image.people(),
      title: faker.name.firstName(),
      popularity: faker.datatype.number({
        max: 5,
        min: 0
      }),
      vote_average: faker.datatype.number({
        max: 5,
        min: 0
      }),
      vote_count: faker.datatype.number(),
      original_language: faker.name.lastName(),
      release_date: faker.date.past().toString(),
      overview: faker.lorem.paragraphs()
      // video: faker.image.imageUrl()
    })
  ),
  status: 'success',
  pageInfo: {
    page: 1,
    totalPages: faker.datatype.number(),
    totalResults: faker.datatype.number()
  }
})

describe('<MyMovies />', () => {
  let mockRender: any
  const to = jest.fn()

  beforeEach(() => {
    mockRender = () => render(<Dashboard />)
    ;(useNavigate as any).mockImplementation(() => ({
      useNavigate: jest.fn().mockImplementation(() => ({ to }))
    }))
  })

  it('should show list of movies', () => {
    const res1 = fakeData()
    ;(useMovieTopRated as any).mockImplementation(() => ({
      ...res1
    }))
    mockRender()
    res1.data.forEach((r) => {
      const movie = screen.getByTitle(r.title || '')
      expect(movie).toBeInTheDocument()
    })
  })

  it('should show failure to load movies', () => {
    ;(useMovieTopRated as any).mockImplementation(() => ({ status: 'failed' }))
    mockRender()
    expect(screen.getByAltText('Unable to load movies')).toBeVisible()
  })

  it('should show loader while loading movies', () => {
    ;(useMovieTopRated as any).mockImplementation(() => ({ status: 'loading' }))
    mockRender()
    expect(screen.getByAltText('Loading ..')).toBeVisible()
  })

  it('should route to movie page for more details', () => {
    const res = fakeData()
    ;(useMovieTopRated as any).mockImplementation(() => res)
    mockRender()
    const movie = res.data[0]
    screen.getByTitle(movie.title || '').click()
    expect(to).toHaveBeenCalledTimes(1)
    expect(to).toHaveBeenCalledWith(`/${movie.id}`)
  })
})
