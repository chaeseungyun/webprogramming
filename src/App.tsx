import './App.css'
import Register from './Auth/Register'
import { Route, Routes } from 'react-router-dom'
import Login from './Auth/login'
import MainPage from './main/index'
import Layout from './layout/Layout'
import Trello from './Trello/Trello'
import AuthLayout from './layout/AuthLayout'
import Introduce from './Introduce'

function App() {

  return (
    <div>
      <Routes>
        <Route element={<AuthLayout needAuth={true} />}>
          <Route element={<Layout />}>
            <Route path='/' element={<MainPage />} />
            <Route path='/trello' element={<Trello />} />
          </Route>
        </Route>
        <Route element={<AuthLayout needAuth={false} />}>
          <Route path='/introduce' element={<Introduce />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>

    </div >
  )
}

export default App
