// src/components/atoms/GoogleLoginButton.jsx
import React from 'react';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../../../../utils/indexedDB';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // MariaDB에 사용자 정보 저장 또는 업데이트
      await googleLogin({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      });

      // 로그인 성공 후 원하는 페이지로 이동
      navigate('/success');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleLogin}>Login with Google</button>
  );
};

export default GoogleLoginButton;
