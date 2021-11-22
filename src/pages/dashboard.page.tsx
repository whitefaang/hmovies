import { nanoid } from '@reduxjs/toolkit'
import Movie from 'components/movie.component'
import useMovieTopRated from 'hooks/movie-top-rated.hook'
import React, { ReactElement, useEffect } from 'react'
import Error from './error.svg'

export default function Dashboard(): ReactElement {
  // const movies = useMovieSearch()
  const popular = useMovieTopRated()

  // useEffect(() => {
  //   document.onscroll = () => {
  //     const documentHeight = document.body.scrollHeight
  //     const currentScroll = window.scrollY + window.innerHeight
  //     if (currentScroll === documentHeight) {
  //       popular.next()
  //     }
  //   }
  // }, [popular])

  if (popular.status === 'failed') {
    return (
      <div className="flex flex-col flex-1 gap-y-10 justify-center items-center text-xl">
        <img
          src={Error}
          alt="Unable to load movies"
          className="mx-auto w-8/12 xl:w-5/12"
        />
        <p className="text-center">
          Unable to load movies.
          <a href="/" className="px-2">
            Click here to retry
          </a>
        </p>
      </div>
    )
  }

  if (popular.status === 'loading') {
    return (
      <div
        data-testid="loader"
        className="grid flex-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-7 2xl:gap-10 p-2 py-5 mx-auto w-11/12 md:w-10/12 xl:w-9/12"
      >
        {Array(5)
          .fill(1)
          .map(() => (
            <div key={nanoid()}>
              <div className="w-full h-96 bg-surface-muted animate-pulse"></div>
              <p className="my-2 w-20 h-6 bg-surface-muted animate-pulse"></p>
            </div>
          ))}
      </div>
    )
  }

  return (
    <div
      id="dashboard"
      className="grid flex-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-7 2xl:gap-10 p-2 py-5 mx-auto w-11/12 md:w-10/12 xl:w-9/12"
    >
      {popular.data.map((movie) => {
        return <Movie key={movie.id} movie={movie} />
      })}
    </div>
  )
}
