import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './page/HomeScreen'
import { Outlet } from 'react-router-dom'
 import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer/>
      <main className='min-h-lvh'>
        <div className='container mx-auto'>
          <Outlet/>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App