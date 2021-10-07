import { signInWithPopup,getAuth,GoogleAuthProvider} from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();

const provider = new GoogleAuthProvider() 

function App() {

  const [user, setUser] = useState({});

  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then(result => {
      const {displayName, email, photoURL} = result.user;
      const loggedInUser ={
        name:displayName,
        email:email,
        photo:photoURL
      };
      console.log(loggedInUser)
      setUser(loggedInUser);
    })
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign in</button>
      <br />
      {
        user.email && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
