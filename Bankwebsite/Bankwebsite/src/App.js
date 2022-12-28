import React ,{useEffect}from 'react'
import Home from './pages/Home'
import { auth, db, firestore } from './firebase';
import { onAuthStateChanged } from '@firebase/auth';
import { doc, getDoc} from '@firebase/firestore';
import Calculator from './pages/Calculator'
import { BrowserRouter as Router , Routes ,Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { userStateChange } from './actions/auth';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Users from './pages/Users'
import Shareholder from './pages/Shareholder';
import Admin from './pages/Admin';
import Contact from './components/Contact';
import Other from './components/Other';
import Payment from './components/Payment';
import Aadhar from './components/Aadhar';
const App = (props) => {

  useEffect(()=>{
    const unsubscribe= onAuthStateChanged(auth,user=>{
       console.log(user)
       if(user){
       const docRef = doc(firestore,db.users,user.email)
       const docSnap = getDoc(docRef)
       .then(doc=>{
         props.userStateChange(db.formatedDoc(doc))
       })
           
       }
    })
   
    return unsubscribe;
       },[])
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/emi-calculator' element={<Calculator/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/user' element={<Users/>}/>
        <Route path='/admin/shareholder' element={<Shareholder/>}/>
        <Route path='/admin/users' element={<Admin/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/other' element={<Other/>}/>
      </Routes>
    </Router>
  )
}

export default connect(null,{userStateChange})(App)