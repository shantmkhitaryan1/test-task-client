import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "Redux/auth.slice";
import { useRedirect } from "Hooks/location";
import Navbar from "Navbar";

export default function SignIn() {
    const [state, setState] = useState({
        username: '',
        password: ''
    })
    const dispatch = useDispatch();
    const { navigateToCreate } = useRedirect();

    const handleChange = (evt, type) => {
        if (evt.target.value.length > 30) return;
        setState(prev => ({
            ...prev,
            [type]: evt.target.value
        }))
    }

    const submitHandler = () => {
        if (Object.values(state).some(item => !item.trim())) return;
        dispatch(signIn({ ...state, navigateToCreate }));
    }

    return (
        <>
            <Navbar signed={true} />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                alignContent='center'
                gap={4}
                sx={{pt: 10}}>
                    <Typography variant='h3'>Enter your data, please</Typography>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        alignContent='center'
                        width={400}
                        gap={4}
                        sx={{pt: 4}} >
                            <TextField
                                required
                                fullWidth
                                type="text"
                                label="Name"
                                variant="outlined"
                                value={state.username}
                                onChange={(evt) => handleChange(evt, 'username')}
                            />
                            <TextField
                                required
                                fullWidth
                                type="password"
                                label="Password"
                                variant="outlined"
                                value={state.password}
                                onChange={(evt) => handleChange(evt, 'password')}
                            />
                    </Grid>
                    <Button
                        variant="outlined"
                        size='large'
                        sx={{px: 5}}
                        onClick={submitHandler}>
                            Sign in
                    </Button>
            </Grid>
        </>
    )
}