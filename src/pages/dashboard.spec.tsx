import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import { useImageFetch } from 'hooks/fetch.hook'
import { IMovie } from 'models/api.model'
import { useNavigate } from 'react-router'
import useMovieTopRated from '../hooks/movie-top-rated.hook'
import Dashboard from './dashboard.page'

jest.mock('react-router')

jest.mock('../hooks/movie-top-rated.hook')
jest.mock('../hooks/fetch.hook')

const fakeData = () => ({
  data: new Array(20).fill(1).map(
    (): IMovie => ({
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
      overview: faker.lorem.paragraphs(),
      id: parseInt(faker.datatype.uuid()),
      original_title: faker.name.firstName()
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

describe('<Dashboard />', () => {
  let mockRender: any
  const navigate = jest.fn()
  beforeEach(() => {
    mockRender = () => render(<Dashboard />)
    ;(useNavigate as any).mockImplementation(() => navigate)
    ;(useImageFetch as any).mockImplementation(() => ({
      image: faker.image.animals()
    }))
  })

  it('should show list of movies', () => {
    const res1 = fakeData()
    const res2 = fakeData()
    const next = jest.fn().mockImplementation(() => res2)
    ;(useMovieTopRated as any).mockImplementation(() => ({ ...res1, next }))
    mockRender()
    res1.data.forEach((r) => {
      const movie = screen.getByTitle(r.title || '')
      expect(movie).toBeInTheDocument()
    })
    // window.scrollTo(0, document.body.scrollHeight)
    // res1.data.concat(res2.data).forEach((r) => {
    //   const movie = screen.getByTitle(r.title || '')
    //   expect(movie).toBeInTheDocument()
    // })
  })

  it('should show failure to load movies', () => {
    ;(useMovieTopRated as any).mockImplementation(() => ({ status: 'failed' }))
    mockRender()
    expect(screen.getByAltText('Unable to load movies')).toBeVisible()
  })

  it('should show loader while loading movies', () => {
    ;(useMovieTopRated as any).mockImplementation(() => ({
      status: 'loading',
      data: []
    }))
    mockRender()
    expect(screen.getByTestId('loader')).toBeVisible()
  })

  it('should route to movie page for more details', async () => {
    const res = fakeData()
    ;(useMovieTopRated as any).mockImplementation(() => res)
    mockRender()
    const movie = res.data[0]
    await act(async () => {
      userEvent.click(screen.getByTitle(movie.title))
    })
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(`/${movie.id}`, { state: movie })
  })
})
