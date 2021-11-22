export interface IMovie {
  // adult: boolean
  backdrop_path: string
  // genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  // video: boolean
  vote_average: number
  vote_count: number
}
export interface IMovieSearchPage {
  page: number
  results: IMovie[]
  total_pages: number
  total_results: number
}

export interface IGenre {
  id: number
  name: string
}

export interface IMovieDetail {
  adult: boolean
  backdrop_path: string
  belongs_to_collection?: any
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: Productioncompany[]
  production_countries: Productioncountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: Spokenlanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  myRating?: number
}

export interface Spokenlanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface Productioncountry {
  iso_3166_1: string
  name: string
}

export interface Productioncompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface Genre {
  id: number
  name: string
}
