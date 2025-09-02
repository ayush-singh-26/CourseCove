import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="">
      <Navbar />
      <ToastContainer position="top-right" hideProgressBar={true} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
