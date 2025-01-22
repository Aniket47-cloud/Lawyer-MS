
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './Pages/Home'
import AllLawyers from './Pages/AllLawyers'
import NavBar from './Components/NavBar'
import BookingPage from './Components/BookingPage'
import Footer from './Components/Contact'
function App() {
  

  return (
  <div>
     <div>
      <NavBar/>
     </div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/lawyers" element={<AllLawyers/>}/>
        <Route path="/lawyer/:id" element={<BookingPage/>}/>


      </Routes>
     
        <Footer/>
      
     
  </div>
  )
};

export default App
