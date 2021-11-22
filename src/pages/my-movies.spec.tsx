import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import { useImageFetch } from 'hooks/fetch.hook'
import { IMovie } from 'models/api.model'
import { act } from 'react-dom/test-utils'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import MyMovies from './my-movies.page'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn()
}))

jest.mock('react-router')

jest.mock('../hooks/movie-top-rated.hook')
jest.mock('../hooks/fetch.hook')

const fakeData = () =>
  new Array(20).fill(1).map(
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
      id: faker.datatype.uuid() as any,
      original_title: faker.name.firstName()
      // video: faker.image.imageUrl()
    })
  )

describe('<MyMovies />', () => {
  let mockRender: any

  const navigate = jest.fn()
  beforeEach(() => {
    mockRender = () => render(<MyMovies />)
    ;(useNavigate as any).mockImplementation(() => navigate)
    ;(useImageFetch as any).mockImplementation(() => ({
      image: faker.image.animals()
    }))
  })

  it('should show list of movies', () => {
    const res = fakeData()
    ;(useSelector as any).mockImplementation(() => res)
    mockRender()
    res.forEach((r) => {
      const movieTitle = `${r.title} (${r.release_date.split('-')[0]})`
      const movie = screen.getByTitle(movieTitle)
      expect(movie).toBeInTheDocument()
    })
  })

  it('should route to movie page for more details', async () => {
    const res = fakeData()
    ;(useSelector as any).mockImplementation(() => res)
    mockRender()
    const movie = res[0]
    await act(async () => {
      const movieTitle = `${movie.title} (${movie.release_date.split('-')[0]})`
      userEvent.click(screen.getByTitle(movieTitle))
    })
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(`/${movie.id}`, { state: movie })
  })
})
