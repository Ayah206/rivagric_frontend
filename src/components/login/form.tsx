import React from "react";
import Box from '@mui/material/Box';
import { Stack, Typography, TextField, Button, InputAdornment } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import CustomInput from "../customInput";
import {useFormik} from 'formik'
import { loginSchema } from "../../utilities/schemas";



export default function Form(){

    const [showPass, setShowPass] = React.useState(false)
 
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (data) => {
          console.log(data)
          let apiLink = ``
          let credentials = {data, apiLink} 
          console.log(credentials) 
        },
      });
      console.log(formik.handleChange)
    return(
        <Box className = 'loginForm' component = 'form' autoComplete="off" onSubmit= {formik.handleSubmit} >
            <Stack spacing = {5}>
                <Stack spacing = {2}>
                    <Typography align = 'center' sx = {{
                        fontSize: '25px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        lineHeight: '55px',
                        letterSpacing: '1',
                    }}>
                        log in
                    </Typography>
                </Stack> 
                <Stack spacing = {3} className = 'inputText' sx = {{mb: '24px !important'}}>
                    <TextField name = 'email' fullWidth label='Email' autoComplete = "new-password"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText = {formik.touched.email && formik.errors.email} 
                    />
                    <TextField 
                        fullWidth autoComplete="new-password"
                        label="Password"
                        name = 'password'
                        type = {showPass ? 'text' : 'password'}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            endAdornment:
                            <InputAdornment position="end" sx = {{background: 'transparent'}}>
                                <Typography
                                    variant = 'button'
                                    onClick={()=>setShowPass(!showPass)}
                                >
                                {showPass ?  <VisibilityOff /> : <Visibility />}
                                </Typography>
                            </InputAdornment>
                        }}
                    />
                    <Button variant="contained" fullWidth
                        type = 'submit'
                        href = '/' 
                        size = 'large'
                        sx = {{
                        p:1.5,
                        background: '2337C6',
                        borderRadius: '5px',
                        boxShadow: "none",
                        "&:hover": {
                            background: '2337C6',
                            boxShadow: 0
                        },
                        fontFamily: 'Avenir Next',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        fontSize: '14px',
                        lineHeight: '19px',
                        textAlign: 'center',
                        letterSpacing: '0.1em',
                    }}>
                        LOG IN
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}