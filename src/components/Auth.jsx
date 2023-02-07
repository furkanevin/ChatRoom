import React from 'react';
import { auth, provider } from '../firebase/FirebaseConfig';
//Giriş yapmak için kullanılıyor
import { signInWithPopup } from 'firebase/auth';

const Auth = ({ setIsAuth }) => {
  const signIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      //   console.log(res);   veriler;
      localStorage.setItem('token', res.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="auth">
      <h1>Chat Odası</h1>
      <p>Devem Etmek İçin Giriş Yap</p>
      <button onClick={signIn}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png" />
        Google ile giriş yap
      </button>
    </div>
  );
};

export default Auth;
