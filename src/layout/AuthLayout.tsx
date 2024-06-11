import { Navigate, Outlet } from 'react-router-dom';

export default function AuthLayout({ needAuth }: { needAuth: boolean }) {
  const isLogin = sessionStorage.getItem('token');
  if (isLogin && needAuth) return <Outlet />;
  if (!isLogin && !needAuth) return <Outlet />;
  return <Navigate to='/introduce' replace /> // 로그인되지 않은 유저는 로그인 유도
}