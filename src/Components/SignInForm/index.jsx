import { Button, Grid, TextField, Typography } from '@mui/material'

export default function SignInForm({ username, password, handleChange, submitHandler }) {
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
          value={username}
          onChange={evt => handleChange(evt, 'username')}
        />
        <TextField
          required
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={evt => handleChange(evt, 'password')}
        />
      </Grid>
      <Button variant="outlined" size="large" sx={{ px: 5 }} onClick={submitHandler}>
        Sign in
      </Button>
    </Grid>
  )
}
