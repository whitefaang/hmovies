import { StarIcon as StarOutline } from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'
import { nanoid } from '@reduxjs/toolkit'
import { IMovieDetail } from 'models/api.model'
import React, { ReactElement, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { uiSelect, uiActions } from 'store/ui.slice'

interface Props {
  movie: IMovieDetail
}

export default function Ratings({ movie }: Props): ReactElement {
  const [rated, setRated] = useState(movie.myRating || 0)

  const myMovie = useSelector(uiSelect.getMyMovies).find(
    (m) => m.id === movie.id
  )

  const myRating = myMovie?.myRating || 0

  const dispatch = useDispatch()

  const rate = (rating: number) => {
    dispatch(uiActions.rateMovie({ movie, rating }))
  }

  return (
    <div className="flex items-center">
      {Array(10)
        .fill(1)
        .map((_, idx) =>
          (rated || myRating) > idx ? (
            <React.Fragment key={nanoid()}>
              <StarIcon
                className="hidden lg:block px-3 w-16 h-16 text-primary cursor-pointer"
                onClick={() => rate(idx + 1)}
                onMouseEnter={() => setRated(idx + 1)}
                onMouseLeave={() => setRated(myRating)}
              />
              <StarIcon
                className="lg:hidden w-16 h-16 text-primary cursor-pointer"
                onClick={() => rate(idx + 1)}
              />
            </React.Fragment>
          ) : (
            <React.Fragment key={nanoid()}>
              <StarOutline
                className="hidden lg:block px-3 w-16 h-16 cursor-pointer"
                onClick={() => rate(idx + 1)}
                onMouseEnter={() => setRated(idx + 1)}
                onMouseLeave={() => setRated(myRating)}
              />
              <StarOutline
                className="lg:hidden w-16 h-16 cursor-pointer"
                onClick={() => rate(idx + 1)}
              />
            </React.Fragment>
          )
        )}{' '}
    </div>
  )
}
