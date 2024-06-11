import { ChangeEvent, useState } from 'react';
import { instance } from '../api';
import icon from '../assets/icon.png';
import './Register.css';
import { useNavigate } from 'react-router-dom';

interface LoginResponse {
  id: string;
}

export default function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const result = await instance.post<LoginResponse>('/login', {
        account, password
      })
      sessionStorage.setItem('token', result.data.id)
      alert('로그인에 성공했습니다!');
      navigate('/')
    }
    catch {
      alert('로그인에 실패했습니다. 다시 시도해주세요')
    }
  }

  const handleAccount = (e: ChangeEvent<HTMLInputElement>) => setAccount(e.target.value);
  const handlePaasword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <div className='auth-container'>
      <div className='title'>
        <img src={icon} alt='아이콘입니다.' className='icon' />
        <h2>로그인</h2>
      </div>
      <form className='register-form'>
        <input placeholder="아이디를 입력해주세요." onChange={handleAccount} value={account} />
        <input placeholder="비밀번호를 입력해주세요." onChange={handlePaasword} value={password} type='password' />
        <button
          type='button'
          className='button'
          onClick={login}
        >로그인</button>
      </form>
      <small
        className='toRegister'
        onClick={() => navigate('/register')}
      >
        회원이 아니신가요?
      </small>
    </div>
  )
}
