import { Button, Grid, TextField, Typography } from "@mui/material";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { createCompaign } from "Redux/compaign.slice";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useRedirect } from "Hooks/location";
import Navbar from "Navbar";

export default function CreateCompaign() {
    const [state, setState] = useState({
        name: '',
        description: '',
        goalAmount: '',
        expiresIn: new Date(Date.now()).toLocaleDateString(),
    })
    const { navigateHome } = useRedirect();
    const dispatch = useDispatch();

    const handleChange = (evt, type) => {
        if (type === 'goalAmount' && evt.target.value.length>10) return;
        setState(prev => ({
            ...prev,
            [type]: evt.target.value
        }))
    }

    const submitHandler = () => {
        if (Object.values(state).some(item => !item.trim()) || state.expiresIn==='Invalid Date') return;
        dispatch(createCompaign({ ...state }))
            .then(res => navigateHome());
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
                                value={state.name}
                                onChange={(evt) => handleChange(evt, 'name')}
                            />
                            <TextField
                                required
                                fullWidth
                                type="text"
                                label="Description"
                                variant="outlined"
                                value={state.description}
                                onChange={(evt) => handleChange(evt, 'description')}
                            />
                            <TextField
                                required
                                fullWidth
                                type="number"
                                label="Goal"
                                variant="outlined"
                                value={state.goalAmount}
                                onChange={(evt) => handleChange(evt, 'goalAmount')}
                                sx={{
                                    '&:before': {
                                        content: '"$"',
                                        fontSize: '22px',
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        transform: 'translate(-300%, 35%)',
                                    }
                                }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Expiration date"
                                    value={state.expiresIn}
                                    variant="outlined"
                                    onChange={(value) => setState(prev => ({
                                        ...prev,
                                        'expiresIn': new Date(value).toLocaleDateString()
                                    }))}
                                    renderInput={(params) => {
                                        return <TextField {...params } variant="outlined" fullWidth  />
                                    }}
                                />
                            </LocalizationProvider>
                    </Grid>
                    <Button
                        variant="outlined"
                        size='large'
                        sx={{px: 5}}
                        onClick={submitHandler}>
                            Create
                    </Button>
            </Grid>
        </>
    )
}