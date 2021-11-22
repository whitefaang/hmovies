import Movie from 'components/movie.component'
import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import Link from 'components/link.components'
import { uiSelect } from 'store/ui.slice'
import Empty from './empty.svg'

export default function MyMovies(): ReactElement {
  const myMovies = useSelector(uiSelect.getMyMovies)

  if (myMovies.length === 0) {
    return (
      <div className="flex flex-col flex-1 gap-y-10 justify-center items-center text-xl">
        <img
          src={Empty}
          alt="You havent rated any movies yet"
          className="mx-auto w-8/12 xl:w-5/12"
        />
        <p className="text-center">
          You havent rated any movies yet.
          <Link to="/" className="px-2">
            Get Started.
          </Link>
        </p>
      </div>
    )
  }

  return (
    <>
      <div
        id="my-movies"
        className="grid flex-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-7 2xl:gap-10 p-2 py-5 mx-auto w-11/12 md:w-10/12 xl:w-9/12"
      >
        {myMovies.map((movie) => {
          return <Movie key={movie.id} movie={movie} />
        })}
      </div>
    </>
  )
}
