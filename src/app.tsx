import Avatar from 'components/avatar.component'
import Logo from 'components/logo.component'
import NotFound from 'pages/404.page'
import Dashboard from 'pages/dashboard.page'
import Movie from 'pages/movie.page'
import MyMovies from 'pages/my-movies.page'
import { Route, Routes } from 'react-router-dom'
import { HeartIcon } from '@heroicons/react/solid'
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex sticky top-0 z-50 justify-between p-4 bg-surface bg-opacity-90">
        <Logo />
        <Avatar />
      </header>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:movieId" element={<Movie />} />
        <Route path="/my-movies" element={<MyMovies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="my-5">
        <p className="flex justify-center items-center font-semibold">
          Made with
          <HeartIcon className="mx-1 w-5 h-5 text-primary" />
          by
          <a
            href="https://mrahil.me"
            className="mx-1.5 text-primary hover:text-primary-muted"
            target="_blank"
            rel="noreferrer"
          >
            Rahil
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
