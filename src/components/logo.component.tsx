import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export default function Logo(): ReactElement {
  return (
    <Link to="/" className="font-monoton text-3xl md:text-5xl">
      H
    </Link>
  )
}
