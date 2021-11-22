import classNames from 'classnames'
import { useImageFetch } from 'hooks/fetch.hook'
import React, { ReactElement } from 'react'

interface Props {
  className?: string
  src: string
  alt: string
}

export default function LazyImage({
  src,
  alt,
  className
}: Props): ReactElement {
  const { image, loading } = useImageFetch(src)
  return (
    <img
      className={classNames(className, 'w-full', {
        blur: loading
      })}
      src={image}
      alt={alt}
    />
  )
}
