import icon from '../assets/icon.png';
import './Register.css';
import { instance } from '../api';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';

export default function Register() {
  const [title, setTitle] = useState<string>('회원가입');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const register = async () => {
    try {
      await instance.post('/users', {
        account,
        password,
      });
      alert('회원가입에 성공했습니다!')
      setTitle('로그인하러 가기')
    } catch (e) {
      alert('회원가입에 실패했습니다. 다시 시도해주세요')
    }
  }

  const toLogin = () => {
    navigate('/login')
  }

  const handleAccount = (e: ChangeEvent<HTMLInputElement>) => setAccount(e.target.value);
  const handlePaasword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <div className='auth-container'>
      <div className='title'>
        <img src={icon} alt='아이콘입니다.' className='icon' />
        <h2>회원가입</h2>
      </div>
      <form className='register-form'>
        <input placeholder="아이디를 입력해주세요." value={account} onChange={handleAccount} />
        <input placeholder="비밀번호를 입력해주세요." value={password} type='password' onChange={handlePaasword} />
        <button
          type='button'
          className='button'
          onClick={() => title === '회원가입' ? register() : toLogin()}
        >{title}
        </button>
      </form>
    </div>
  )
}
