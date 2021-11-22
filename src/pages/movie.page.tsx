import { StarIcon } from '@heroicons/react/solid'
import LazyImage from 'components/lazy-image.component'
import Ratings from 'components/ratings.component'
import useMovieDetail from 'hooks/movie-detail.hook'
import { IMovie, IMovieDetail } from 'models/api.model'
import React, { ReactElement } from 'react'
import { useLocation, useParams } from 'react-router'
export default function Movie(): ReactElement {
  const params = useParams()
  const { state }: { state: IMovie } = useLocation()

  const movie = useMovieDetail(params.movieId as string)

  if (movie.status === 'failed')
    return <p className="text-9xl"> Movie not found</p>

  if ((!state && !movie.data) || movie.status === 'loading') {
    return (
      <div className="">
        <div className="w-full h-[500px] bg-surface-muted animate-pulse"></div>
        <div className="flex relative justify-between p-5">
          <div className="my-2 w-2/12 h-8 bg-surface-muted animate-pulse"></div>
          <div className="absolute right-4 bottom-1/4 p-1.5 w-20 h-[120px] bg-surface-muted"></div>
        </div>
        <div className="grid gap-3 p-5 font-content">
          <div className="w-10/12 h-8 bg-surface-muted animate-pulse"></div>
          <div className="w-10/12 h-8 bg-surface-muted animate-pulse"></div>
          <div className="w-10/12 h-8 bg-surface-muted animate-pulse"></div>
          <div className="w-8/12 h-8 bg-surface-muted animate-pulse"></div>
        </div>
      </div>
    )
  }

  const composedMovie = Object.assign(
    movie.data || {},
    (state as IMovieDetail) || {}
  )

  return (
    <div className="relative drop-shadow-2xl">
      <div className="max-h-[500px]">
        <LazyImage
          src={composedMovie.backdrop_path}
          alt={composedMovie.title}
        />
      </div>
      <div
        className="flex relative -top-1/2 flex-wrap px-2 pb-2 w-full min-h-[50%] text-center md:text-left bg-surface bg-opacity-90"
        style={{
          backgroundImage: 'linear-gradient(to top,#0c1618 30%,transparent)'
        }}
      >
        <div className="py-2 px-4 w-full lg:w-9/12 xl:w-9/12 2xl:w-10/12">
          <div className="flex flex-wrap justify-center">
            <span className="flex-1 my-2 lg:w-10/12 font-header text-5xl lg:text-7xl">
              {composedMovie.title}
            </span>
            <span className="flex justify-center items-center w-full sm:w-max text-3xl font-bold">
              {composedMovie.vote_average}
              <StarIcon className="w-6 lg:w-10 h-6 lg:h-10" />
            </span>
          </div>
          <div className="my-2 lg:text-3xl">
            {composedMovie.original_title}{' '}
            {composedMovie.tagline ? ',' + composedMovie.tagline : ''}
          </div>

          <div className="m-2">
            <Ratings movie={composedMovie} />
          </div>

          <div className="p-3 lg:mt-3 w-full lg:w-10/12 lg:text-2xl">
            {composedMovie.overview}
          </div>
          <div className="p-3 lg:my-2 lg:text-2xl">
            <span className="pr-2">Languages:</span>{' '}
            {composedMovie.spoken_languages
              ?.map((l) => `${l.english_name}`)
              .join(', ')}
          </div>
        </div>
        <div className="w-full lg:w-3/12 xl:w-3/12 2xl:w-2/12">
          <div className="flex relative lg:bottom-1/2 flex-col-reverse lg:flex-col p-1.5 w-full">
            <div className="p-1.5 bg-surface-muted">
              <LazyImage
                src={composedMovie.poster_path}
                alt={composedMovie.title}
                className="bg-surface-muted"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 mb-8 w-full text-xl text-center lg:text-left">
              <span>Release:</span>
              <span>{composedMovie.release_date || '-'}</span>
              <span>Runtime:</span>
              <span>
                {composedMovie.runtime
                  ? `${composedMovie.runtime} minutes`
                  : '-'}
              </span>
              <span> Budget : </span>
              <span>
                {composedMovie.budget ? `$${composedMovie.budget}` : '-'}
              </span>
              <span>Revenue:</span>
              <span>
                {composedMovie.revenue ? `$${composedMovie.revenue}` : '-'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
