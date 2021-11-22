import classNames from 'classnames'
import styled from 'styled-components'

interface Props {
  size: 'sm' | 'md' | 'lg'
}

export const Header = styled.div.attrs<Props>(({ className, size = 'md' }) => ({
  className: classNames(className, {
    'text-sm': size === 'sm',
    'text-md': size === 'lg',
    'text-2xl': size === 'md'
  })
}))``
