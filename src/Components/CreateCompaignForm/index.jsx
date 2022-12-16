import { Button, Grid, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function CreateCompaignForm({
  name,
  description,
  goalAmount,
  expiresIn,
  handleChange,
  submitHandler,
  handleDate,
}) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      gap={4}
      sx={{ pt: 10 }}
    >
      <Typography variant="h3">Enter your data, please</Typography>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        width={400}
        gap={4}
        sx={{ pt: 4 }}
      >
        <TextField
          required
          fullWidth
          type="text"
          label="Name"
          variant="outlined"
          value={name}
          onChange={evt => handleChange(evt, 'name')}
        />
        <TextField
          required
          fullWidth
          type="text"
          label="Description"
          variant="outlined"
          value={description}
          onChange={evt => handleChange(evt, 'description')}
        />
        <TextField
          required
          fullWidth
          type="number"
          label="Goal"
          variant="outlined"
          value={goalAmount}
          onChange={evt => handleChange(evt, 'goalAmount')}
          sx={{
            '&:before': {
              content: '"$"',
              fontSize: '22px',
              position: 'absolute',
              top: 0,
              right: 0,
              transform: 'translate(-300%, 35%)',
            },
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Expiration date"
            value={expiresIn}
            variant="outlined"
            onChange={handleDate}
            renderInput={params => {
              return <TextField {...params} variant="outlined" fullWidth />
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Button variant="outlined" size="large" sx={{ px: 5 }} onClick={submitHandler}>
        Create
      </Button>
    </Grid>
  )
}
