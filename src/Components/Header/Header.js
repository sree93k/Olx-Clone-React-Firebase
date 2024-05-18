import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../Store/Context';
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import image from './user_logo.png'
function Header() {
  const {user}=useContext(AuthContext)

  const {firebase}=useContext(FirebaseContext)
  const history=useHistory()

  function clickAddProduct()
  {
    
    user?history.push('/create'):history.push('/login')
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" placeholder='India'/>
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          {/* <span className='english'> ENGLISH </span>
          <Arrow></Arrow> */}
            <Dropdown>
      <Dropdown.Toggle variant="" id="dropdown-basic">
        English
      </Dropdown.Toggle>

      <Dropdown.Menu className='hindi'>
        <Dropdown.Item  href="#/action-1">Hindi</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        </div>
        <div className="loginPage">
        {
          user ? (
            <span className='loggedStatus'>
              <Image className='userLogo' src={image} />
             
            </span>
          ) : (
            <span className='loggedStatus' onClick={() => { history.push('/login'); }}>
              Login
            
            </span>
          )
        }

          {/* <Dropdown className='user profile' >
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> */}
        
        </div>
        {user && <span className='loggedStatus' onClick={()=>{
          firebase.auth().signOut()
          history.push('/login')
          }}>Logout</span>}
        <div onClick={clickAddProduct} className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
