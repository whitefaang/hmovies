import React, { ReactElement } from 'react'

export default function NotFound(): ReactElement {
  return (
    <div className="flex flex-col flex-1 gap-y-10 justify-center items-center text-xl">
      <img
        src="/src/public/undraw_page_not_found_re_e9o6.svg"
        alt="Page not found"
        className="mx-auto w-8/12 xl:w-5/12"
      />
      <p className="text-center">Page not found.</p>
    </div>
  )
}
