import { render, screen } from '@testing-library/react'
import faker from 'faker'
import { IMovie } from 'models/api.model'
import MovieDetail from './movie-detail.component'

describe('<MovieDetail />', () => {
  let mockRender: any
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
    mockRender = () => render(<MovieDetail />)
  })

  it('should show movie with an empty poster as thumbnail', () => {
    fakeData.poster_path = ''
    fakeData.backdrop_path = ''
    mockRender()
    expect(screen.getByAltText(fakeData.title)).toHaveAttribute(
      'src',
      '/empty-poster.png'
    )
    expect(screen.getByAltText(`${fakeData.title} Backdrop`)).toHaveAttribute(
      'src',
      '/empty-backdrop.png'
    )
  })

  it.todo('should show full movie details')
  it.todo('should show recommened movies thumbnail')
})
