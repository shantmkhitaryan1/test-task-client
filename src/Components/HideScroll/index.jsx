import { Fade } from '@mui/material'
import { useState } from 'react'
import VisibilitySensor from 'react-visibility-sensor'

export default function HideOnScroll({ children }) {
  const [active, setActive] = useState(false)
  const onChange = isVisible => setActive(isVisible)

  return (
    <VisibilitySensor onChange={onChange}>
      <Fade in={active} timeout={2500}>
        {children}
      </Fade>
    </VisibilitySensor>
  )
}
