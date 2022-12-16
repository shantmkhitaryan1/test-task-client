import { Button, AppBar, Toolbar, IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useRedirect } from 'Hooks/location'

export default function Navbar({ signed }) {
  const { navigateHome, navigateToSignIn } = useRedirect()

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', mx: 'auto', width: '50%' }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={navigateHome}
        >
          <HomeIcon sx={{ fontSize: 40 }} />
        </IconButton>
        {signed ? (
          <AccountCircle sx={{ fontSize: 40, cursor: 'pointer' }} />
        ) : (
          <Button color="inherit" onClick={navigateToSignIn}>
            Create
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
