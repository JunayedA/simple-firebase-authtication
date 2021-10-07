import { signInWithPopup,getAuth,GoogleAuthProvider, GithubAuthProvider, signOut} from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { Button } from 'react-bootstrap';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


function App() {

  const [user, setUser] = useState({});
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
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
    .catch(error=>{
      console.log(error.massage)
    })
  }

  const hadndleGithubSignIn = () =>{
    signInWithPopup(auth, githubProvider)
    .then(result =>{
      const {displayName, photoURL, email} = result.user;
      const loggedInUser ={
        name:displayName,
        email:email,
        photo:photoURL
      }
      setUser(loggedInUser);
    })
  }

  const handleSignOut = () =>{
    signOut(auth)
    .then(() => {
      setUser({});
    })
  }
  return (
    <div className="App">

      {!user.name ?
        <div>
        <Button variant="primary m-5" onClick={handleGoogleSignIn}>Google Sign in</Button>
        <br />
        <Button onClick={hadndleGithubSignIn}>Github sign in</Button>
      </div>:
      <div>
        <br />
        <Button onClick={handleSignOut}>Sign out</Button>
      </div>}
      <br />
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
