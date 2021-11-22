import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FilmIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
// import { DuplicateInactiveIcon, EditActiveIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

export default function Avatar() {
  return (
    <Menu as="div" className="inline-block relative text-left">
      <Menu.Button className="inline-flex justify-center items-center">
        <div
          className="overflow-hidden w-8 md:w-12 h-8 md:h-12 bg-center bg-cover rounded-full border-2 border-primary"
          style={{
            backgroundImage:
              'url(https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.media4.hw-static.com%2Fmedia%2F2019%2F08%2Fchristophernolan_71stannualcannesfilmfestival-rendezvouswithchristophernolan_2018-4928x3280.jpg&f=1&nofb=1)'
          }}
        ></div>
        <p className="py-1 px-3 font-bold">Hey Chris !</p>

        <ChevronDownIcon
          className="-mr-1 ml-2 w-5 h-5 text-primary hover:text-primary"
          aria-hidden="true"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 min-w-[200px] bg-surface-muted rounded-xl origin-top-right focus:outline-none">
          <div className="py-1 px-3 text-sm text-color-muted right-arrow-top">
            <Menu.Item>
              <NavLink
                to="/my-movies"
                className={({ isActive }) =>
                  classNames(
                    'group flex items-center py-2 w-full text-base rounded-sm hover:text-primary-muted',
                    {
                      'text-primary': isActive
                    }
                  )
                }
              >
                <FilmIcon className="mr-2 w-4 h-4" />
                My Movies
              </NavLink>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
