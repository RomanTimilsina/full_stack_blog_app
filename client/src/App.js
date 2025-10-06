import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet
} from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Write from './pages/Write';
import Login from './pages/Login';
import Single from './pages/Single';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Layout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

function App() {
  return (
    <div className="app">
      <div className='container'>
      <Router>
        <Routes>
          <Route  path="/" element={<Layout />}  >
            <Route  path="/write" element={<Write />} />
            <Route  index element={<Home />} />
            <Route  path="/post/:id" element={<Single />} />
          </ Route>

          
          <Route  path="/register" element={<Register />} />
          <Route  path="/login" element={<Login />} />
        </Routes>
    </ Router>
    </div>
    </div>
  );
}

export default App;
