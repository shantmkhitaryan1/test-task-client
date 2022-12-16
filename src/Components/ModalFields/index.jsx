import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useSelector } from 'react-redux'

export default function ModalFields({
  filteredCompaign,
  goalAmount,
  donatorName,
  handleSubmitDonatorData,
  handleChangeDonatorData,
}) {
  const { loading } = useSelector(state => state.compaign)

  return (
    <>
      <Typography variant="h6" component="h2">
        Compaign name - {filteredCompaign.name}
      </Typography>
      <Typography variant="h6" component="h2">
        Compaign description - {filteredCompaign.description}
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Expiration date - {new Date(filteredCompaign.expiresIn).toLocaleDateString()}
      </Typography>
      <Box sx={{ my: 2, display: 'flex' }} justifyContent="space-between" alignItems="center">
        <Box
          sx={{ display: 'flex' }}
          justifyContent="space-between"
          alignItems="center"
          flexDirection="column"
        >
          <TextField
            required
            type="number"
            label="Amount"
            variant="outlined"
            value={goalAmount}
            onChange={evt => handleChangeDonatorData(evt, 'goalAmount')}
            sx={{
              '&:before': {
                content: '"$"',
                fontSize: '22px',
                position: 'absolute',
                top: 0,
                right: 0,
                transform: 'translate(-300%, 35%)',
              },
              my: 2,
            }}
          />
          <TextField
            type="text"
            label="What is your name?"
            variant="outlined"
            value={donatorName}
            onChange={evt => handleChangeDonatorData(evt, 'donatorName')}
          />
        </Box>
        <Button
          variant="outlined"
          size="large"
          disabled={loading}
          sx={{ px: 5, mx: 5 }}
          onClick={handleSubmitDonatorData}
        >
          Donate
        </Button>
      </Box>
    </>
  )
}
