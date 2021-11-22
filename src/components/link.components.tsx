import styled from 'styled-components'

import { Link as RLink } from 'react-router-dom'

const Link = styled(RLink).attrs(({ className }) => ({
  className: 'text-primary hover:text-primary-muted ' + className
}))``

export default Link
