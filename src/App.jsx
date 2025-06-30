
import { Routes, Route } from 'react-router'

import "./assets/css/style.css"

import { AuthProvider } from './context/AuthContext'
import { ErrorProvider } from './context/ErrorContext'

import Navigation from './components/navigation/Navigation'
import Home from './components/home/Home'
import Login from './components/auth/login/Login'
import Register from './components/auth/register/Register'
import Logout from './components/auth/logout/Logout'
import ErrorMessage from './components/error/ErrorMessage'
import Profile from './components/auth/user/Profile'
import CarList from './components/cars/car-list/CarList'
import CarDetails from './components/cars/car-details/CarDetails'
import Footer from './components/footer/Footer'
import CarCreate from './components/cars/car-create/CreateCar'
import CarEdit from './components/cars/car-edit/CarEdit'
import CarRefuelList from './components/cars/car-refuel-list/CarRefuelList'
import CarMaintenanceList from './components/cars/car-maintenance-list/CarMaintenanceList'
import Forbidden from './components/403/Forbidden'
import NotFound from './components/404/404'
import GuardAuthenticated from './route-guards/GuardAuthenticated'
import GuardGuest from './route-guards/GuardGuest'
import About from './components/about/About'

function App() {

  return (
    <ErrorProvider>
      <AuthProvider>
        <section className="welcome-hero">
          <Navigation />
          <ErrorMessage />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cars/:carId/details' element={<CarDetails />} />
            <Route path='/cars' element={<CarList />} />
            <Route path='/cars/:carId/refuel-list' element={<CarRefuelList />} />
            <Route path='/cars/:carId/view-repairs' element={<CarMaintenanceList />} />
            <Route path='/403' element={<Forbidden />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />

            <Route element={<GuardGuest />}>
              <Route path='/auth/register' element={<Register />} />
              <Route path='/auth/login' element={<Login />} />
            </Route>

            <Route element={<GuardAuthenticated />}>
              <Route path='/auth/profile' element={<Profile />} />
              <Route path='/auth/logout' element={<Logout />} />
              <Route path='/cars/add-car' element={<CarCreate />} />
              <Route path='/cars/:carId/edit' element={<CarEdit />} />
            </Route>

          </Routes>
        </section>
        <Footer />
      </AuthProvider>
    </ErrorProvider>
  )
}

export default App
