import WorkIcon from '@mui/icons-material/Work'
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { useSelector } from 'react-redux'
import HideOnScroll from 'Components/HideScroll'

export default function CompaignList({ modalOpenHandler }) {
  const { compaigns } = useSelector(state => state.compaign)

  return (
    <>
      <List
        sx={{
          width: '100%',
          height: '70vh',
          overflowY: 'auto',
          borderRadius: '10px',
          bgcolor: 'background.paper',
        }}
      >
        {compaigns.map(each => (
          <HideOnScroll key={each.id}>
            <ListItem key={each.id}>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Name" secondary={each.name} />
              <ListItemText primary="Description" secondary={each.description} />
              <ListItemText primary="Goal" secondary={`${each.goalAmount}$`} />
              <ListItemText primary="Expiration date" secondary={each.expiresIn} />
              <Button
                variant="outlined"
                size="large"
                sx={{ px: 5 }}
                onClick={() => modalOpenHandler(each)}
              >
                Donate
              </Button>
            </ListItem>
          </HideOnScroll>
        ))}
      </List>
    </>
  )
}
