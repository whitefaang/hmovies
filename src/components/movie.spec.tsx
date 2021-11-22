import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import useMovieTopRated from 'hooks/movie-top-rated.hook'
import { IMovie } from 'models/api.model'
import Movie from './movie.component'

jest.mock('react-router')

jest.mock('hooks/movie-top-rated.hook')

describe('<Movie />', () => {
  let mockRender: any
  const to = jest.fn()
  const fakeData: IMovie = {
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
  }
  beforeEach(() => {
    mockRender = () => render(<Movie movie={fakeData} />)
  })

  it('should show movie block', () => {
    mockRender()
    expect(screen.getByTitle(fakeData.title)).toBeInTheDocument()
  })

  it('should show movie with an empty poster as thumbnail', () => {
    fakeData.poster_path = ''
    mockRender()
    expect(screen.getByAltText(fakeData.title)).toHaveAttribute(
      'src',
      '/empty-poster.png'
    )
  })

  it('should open a movie details overlay', async () => {
    ;(useMovieTopRated as any).mockImplementation(() => fakeData)
    mockRender()
    await act(async () => {
      userEvent.click(screen.getByTitle(fakeData.title))
    })
    screen.getByTitle(fakeData.title || '').click()
    expect(to).toHaveBeenCalledTimes(1)
    expect(to).toHaveBeenCalledWith(`/${fakeData.id}`)
  })
})
