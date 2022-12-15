import React, { useState } from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik'
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function SignUp() {
    const[showPassword, setShowPassword]=useState(false);
    
    const formik=useFormik({
        initialValues:{
            name: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: yup.object({
            name: yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
            lastName: yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),  
            email: yup.string()
                .email("Invalid email address")
                .required("Required"),
            password: yup.string()
                .required('No password provided.') 
                .matches(
                    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                    "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                  ),
            confirmPassword: yup.string()
                .required("Please confirm your password")
                .when("password", {
                is: password => (password && password.length > 0 ? true : false),
                then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
    })    
        }),
        onSubmit: values=>{
            console.log('Form data', values)
        }
    })  

    // console.log(formik.errors)

  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
        <Box sx={{
            border: '1px solid grey', 
            width: 400, 
            height: 500, 
            p: 2,
            m: "auto",
            }}>
            <h1 className='signup'>Sign Up</h1>                
           <TextField
                label='First Name'
                name='name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                variant='standard'
                fullWidth
    
            />
            {formik.touched.name && formik.errors.name?<p>{formik.errors.name}</p>:null}
            <TextField
                label='Last Name'
                name='lastName'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                variant='standard'
                fullWidth
              
            />
            {formik.touched.lastName && formik.errors.lastName?<p>{formik.errors.lastName}</p>:null}
           <TextField
                label='Email'
                name='email'
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                variant='standard'
                fullWidth
           
            />  
            {formik.touched.email && formik.errors.email?<p>{formik.errors.email}</p>:null}
            <TextField
               label='Password'
               name='password'
               variant='standard'
               fullWidth
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.password}     
            />
            {formik.touched.password && formik.errors.password?<p>{formik.errors.password}</p>:null}
            <TextField
                label='Confirm password'
                name='confirmPassword'
                variant='standard'
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                type={showPassword?"text":"password"}
                InputProps={{
                endAdornment:(
                    <InputAdornment position="end">
                    <IconButton onClick={()=>setShowPassword((prev)=>!prev)}>
                        {showPassword?(
                        <VisibilityIcon/>
                        ):(
                        <VisibilityOffIcon/>
                        )}
                    </IconButton>
                    </InputAdornment>
                ),
                }}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword?<p>{formik.errors.confirmPassword}</p>:null}
             <Button 
                variant='contained' 
                type='submit'
                fullWidth
                sx={{my:5}}
                >Signup</Button>
        </Box>
        </form>
    </div>
  )
}

export default SignUp