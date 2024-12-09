import { useEffect, useState } from 'react';
import './App.css';
import { Container, Navbar, Button, Badge } from 'react-bootstrap';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Logo from './assets/logo.avif';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductsInfo from './components/ProductsInfo';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setUser(userEmail);
    }
  }, []);

  const handleAddToCart = (item) => {
    setCartItems({ ...cartItems, ...item });
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail'); 
    setUser(''); 
    navigate('/login'); 
  };

  return (
    <div>
      <Navbar style={{ padding: '10px 40px', borderBottom: '1px solid grey' }}>
        <Navbar.Brand href="/" style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'purple' }}>
          <img src={Logo} alt="" width="25" height="23" />
          INSTA BUY!
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Button className='cartbtn' onClick={() => navigate('/cart')}>
          Cart &nbsp; 
          {Object.keys(cartItems).length > 0 && <Badge bg="success">{Object.keys(cartItems).length}</Badge>}
          </Button>

          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <Button className='Login' onClick={() => (user ? handleLogout() : navigate('/login'))}>
            {user ? 'Logout' : 'Login'}
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/products" element={<ProductsInfo />} />
        <Route path="/product/:id" element={<ProductDetails handleAddToCart={handleAddToCart} cartItems={cartItems} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
