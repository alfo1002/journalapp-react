import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  displayName: 'Walter Reyes',
  email: 'paul@gmail.com',
  password: '123456',
}

const formValidations = {
  email: [(v) => v.includes('@'), 'El correo debe tener una @'],
  password: [(v) => v.length >= 6, 'La contraseña debe tener al menos 6 caracteres'],
  displayName: [(v) => v.length >= 1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {


  const dispatch = useDispatch()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const { status, errorMessage } = useSelector(state => state.auth)
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const { formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations);

  //console.log(isFormValid);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;

    //dispatch(startCreatingUserWithEmailPassword({ email, password, displayName }))
    dispatch(startCreatingUserWithEmailPassword(formState))
  }


  return (
    <AuthLayout title="Crear cuenta">
      <h1>FormValid {isFormValid ? 'Correcto' : 'Incorrecto'}</h1>
      <form onSubmit={onSubmit}>
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder='Nombre completo'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error"> {errorMessage} </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button type='submit' variant='contained' fullWidth disabled={isCheckingAuthentication}>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>


          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
              ingresar
            </Link>
          </Grid>

        </Grid>


      </form>

    </AuthLayout>
  )
}
