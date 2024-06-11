import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'
export default function Layout() {
  return (
    <div>
      <Topbar />
      <Outlet />
    </div>
  )
}