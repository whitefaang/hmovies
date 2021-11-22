import { Transition } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { IMovie } from 'models/api.model'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import LazyImage from './lazy-image.component'
import Link from './link.components'

interface Props {
  movie: IMovie
  className?: string
}

export default function Movie({ movie, className = '' }: Props): ReactElement {
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null)
  const [showSummary, setShowSumary] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()

  const openMovie = () => {
    navigate(`/${movie.id}`, {
      state: movie
    })
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.onmousemove = (e) => {
        setShowSumary(true)
        setMouse({
          x: e.clientX,
          y: e.clientY
        })
      }

      ref.current.onmouseleave = () => {
        setShowSumary(false)
        setTimeout(() => {
          setMouse(null)
        }, 500)
      }
    }
  }, [])

  const movieTitle = `${movie.title} (${movie.release_date.split('-')[0]})`

  return (
    <Link to={`/${movie.id}`} className="text-color">
      <div
        ref={ref}
        title={movieTitle}
        className={classNames(
          'rounded-xl shadow-2xl cursor-pointer hover:shadow-3xl',
          className
        )}
        // onClick={openMovie}
      >
        <Transition
          show={showSummary}
          className="fixed z-50"
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          style={{
            position: 'fixed',
            left: mouse?.x,
            top: mouse?.y
          }}
        >
          <div className="z-10 w-[500px] !text-color bg-surface-muted shadow-2xl">
            <LazyImage src={movie.backdrop_path} alt={movie.title} />
            <div className="flex relative justify-between px-2">
              <p className="p-1 w-10/12 font-header text-3xl">{movie.title}</p>
              <div className="absolute right-4 bottom-1/4 p-1.5 w-20 bg-surface-muted">
                <LazyImage src={movie.poster_path} alt={movie.title} />
              </div>
            </div>
            <p className="flex gap-2 items-center px-3 text-2xl font-bold">
              {movie.vote_average}
              <StarIcon className="w-8 h-8" />
            </p>
            <p className="p-3 max-w-prose font-content">{movie.overview}</p>
          </div>
        </Transition>

        <LazyImage
          className="lg:min-h-[300px]"
          src={movie.poster_path}
          alt={movie.title}
        />
        <p className="py-1 font-bold">{movieTitle} </p>
      </div>
    </Link>
  )
}
