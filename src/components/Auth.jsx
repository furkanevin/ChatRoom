import React from 'react';

import { auth, provider } from '../firebase/FirebaseConfig';
//Giriş yapmak için kullanılıyor
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Auth = ({ setIsAuth }) => {
  const signIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      //   console.log(res);   veriler;
      cookies.set('token', res.user._tokenResponse.refreshToken);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="">
      <p>Devem Etmek İçin Giriş Yap</p>
      <button onClick={signIn}>Google ile giriş yap</button>
    </div>
  );
};

export default Auth;
