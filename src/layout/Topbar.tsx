import { useNavigate } from 'react-router-dom';
import icon from '../assets/icon.png';
import './Topbar.css'

export default function Topbar(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className='topbar'>
      <div className='top-set'>
        <img src={icon} alt='icon' className='topicon' />
        <h3>일정관리</h3>
      </div>
      <div>
        <button
          className='logout-button'
          onClick={() => {
            sessionStorage.removeItem('token')
            navigate('/login')
          }}
          type='button'
        >로그아웃
        </button>
      </div>
    </div>
  )
}