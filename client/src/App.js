import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLoginPage from './Pages/AdminLoginPage/AdminLoginPage';
import TicketsPage from './Pages/Tickets/TicketsPage';

function App() {
  const [auth, setAuth] = useState("")
  useEffect(() => {
    let data=localStorage.getItem('adminData')
    setAuth(data)
  }, [])
  
  return (

    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={auth?<TicketsPage/>:<AdminLoginPage/>}/>
        <Route path='/adminHome' element={ <TicketsPage/>}/>

       
      </Routes>
      </BrowserRouter>
     
     
    </div>
  );
}

export default App; 
