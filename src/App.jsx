import WorkIcon from '@mui/icons-material/Work';
import { Avatar, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, Modal, Backdrop, Fade, Box, Typography, TextField, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { donateCompaign, getAllCompaigns } from 'Redux/compaign.slice';
import { useRedirect } from 'Hooks/location';
import Navbar from 'Navbar';
import WalletCard from 'WalletCard';
import './App.css'

export default function App() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [filteredCompaign, setFilteredCompaign] = useState(false);
  const [donatorBalance, setDonatorBalance] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');
  const initialDonatorState = useMemo(() => ({
    goalAmount: 0,
    donatorName: '',
    address: '',
  }), []);
  const [donatorState, setDonatorState] = useState(initialDonatorState);
  const { compaigns, loading }  = useSelector(state => state.compaign)
  const { navigateHome } = useRedirect();
  const dispatch = useDispatch();

  const modalOpenHandler = (item) => {
    setDonateModalOpen(true)
    setFilteredCompaign(item)
  }

  const modalCloseHandler = (item) => {
    setDonateModalOpen(false)
    setDonatorState(initialDonatorState)
    setErrorMessage('');
    setDonatorBalance(0)
  }

  const handleDonatorBalance = (value) => {
    setDonatorBalance(value)
  }

  const handleChangeDonatorData = (evt, type, value) => {
    const newValue = value || evt.target.value;
      if ((type === 'goalAmount' && newValue.length>10)
          || (type==='donatorName' && newValue.length>20)) return;
      setDonatorState(prev => ({
          ...prev,
          [type]: newValue
      }))
  }

  const handleSubmitDonatorData = () => {
    if (!(+donatorState.goalAmount)) {
      setErrorMessage('Goal is invalid');
      return;
    }
    else if (!donatorState.donatorName.trim()) {
      setErrorMessage('Enter your name, please');
      return;
    }
    else if (!donatorState.address) {
      setErrorMessage('Connect your metamask address, please');
      return;
    }
    else if (donatorBalance<donatorState.goalAmount) {
      setErrorMessage('Balance error');
      return;
    }
    else {
      setErrorMessage('');
      dispatch(donateCompaign({ ...donatorState, compaignId: filteredCompaign.id, navigateHome }))
        .then(modalCloseHandler)
        .catch(modalCloseHandler)
    }
  }

  useEffect(() => {
    const signal = dispatch(getAllCompaigns())
    return () => {
      signal.abort()
    };
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        alignContent='center'
        gap={4}
        sm={11}
        item
        md={8}
        sx={{pt: 10, margin: '0 auto' }}>
          <List sx={{ 
              width: '100%', 
              overflowY: 'auto', 
              borderRadius: '10px', 
              bgcolor: 'background.paper',
            }}>
            {compaigns.map((each) => (
              <ListItem key={each.id}  >
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
                      size='large'
                      sx={{px: 5}}
                      onClick={() => modalOpenHandler(each)}>
                          Donate
                  </Button>
              </ListItem>
            ))}
          </List>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={donateModalOpen}
            onClose={modalCloseHandler}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={donateModalOpen}>
              <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80%',
                  maxWidth: 700,
                  minWidth: 500,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
                }} >
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Compaign name - {filteredCompaign.name}
                </Typography>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Compaign description - {filteredCompaign.description}
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Expiration date - {new Date(filteredCompaign.expiresIn).toLocaleDateString()}
                </Typography>
                <Box sx={{my: 2, display: 'flex'}} justifyContent="space-between" alignItems='center' >
                  <Box sx={{ display: 'flex'}} justifyContent="space-between" alignItems='center' flexDirection='column'>
                    <TextField
                          required
                          type="number"
                          label="Amount"
                          variant="outlined"
                          value={donatorState.goalAmount}
                          onChange={(evt) => handleChangeDonatorData(evt, 'goalAmount')}
                          sx={{
                              '&:before': {
                                  content: '"$"',
                                  fontSize: '22px',
                                  position: 'absolute',
                                  top: 0,
                                  right: 0,
                                  transform: 'translate(-300%, 35%)',
                              },
                              my: 2
                          }}
                      />
                    <TextField
                      type="text"
                      label="What is your name?"
                      variant="outlined"
                      value={donatorState.donatorName}
                      onChange={(evt) => handleChangeDonatorData(evt, 'donatorName')}
                      />
                  </Box>
                  <Button
                      variant="outlined"
                      size='large' 
                      disabled={loading}
                      sx={{px: 5, mx: 5}}
                      onClick={handleSubmitDonatorData}
                      >
                          Donate
                  </Button>
                </Box>
                <Divider />
                <WalletCard 
                  errMessage={errorMessage}
                  donatorAddressChangeHandler={(value) => handleChangeDonatorData(null, 'address', value)}
                  handleDonatorBalance={handleDonatorBalance} />
              </Box>
            </Fade>
          </Modal>
      </Grid>
    </>
  )
}
