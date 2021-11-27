import React from 'react';

const Login = () => {



  const signInPage = () => {
    return (
      <div>
        <Container maxWidth="sm">
          <Typography variant='h5' color='textPrimary'>
            <GoogleSignIn />
          </Typography>
        </Container>
      </div>
    );
  };

};

export default Login;