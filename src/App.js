import { signInWithPopup,getAuth,GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';

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
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign in</button>
      <br />
      <button onClick={hadndleGithubSignIn}>Github sign in</button>
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
