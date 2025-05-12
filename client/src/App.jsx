import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div className="">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
