import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import { useImageFetch } from 'hooks/fetch.hook'
import useMovieTopRated from 'hooks/movie-top-rated.hook'
import { IMovie } from 'models/api.model'
import { useNavigate } from 'react-router'
import Movie from './movie.component'
import UnknownMovie from './unknown.svg'

jest.mock('react-router')

jest.mock('hooks/movie-top-rated.hook')
jest.mock('../hooks/fetch.hook')

describe('<Movie />', () => {
  let mockRender: any
  let movie: IMovie
  const fakeData = () => ({
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
    // video: faker.image.imageUrl()
    id: 1,
    original_title: faker.name.firstName()
  })

  const navigate = jest.fn()
  beforeEach(() => {
    movie = fakeData()
    mockRender = () => render(<Movie movie={movie} />)
    ;(useNavigate as any).mockImplementation(() => navigate)
    ;(useImageFetch as any).mockImplementation(() => ({
      image: faker.image.animals()
    }))
  })

  it('should show movie block', () => {
    mockRender()
    const movieTitle = `${movie.title} (${movie.release_date.split('-')[0]})`
    expect(screen.getByTitle(movieTitle)).toBeInTheDocument()
  })

  it('should open a movie details overlay', async () => {
    ;(useMovieTopRated as any).mockImplementation(() => fakeData)
    mockRender()
    await act(async () => {
      const movieTitle = `${movie.title} (${movie.release_date.split('-')[0]})`
      userEvent.click(screen.getByTitle(movieTitle))
    })
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(`/${movie.id}`, {
      state: movie
    })
  })
})
