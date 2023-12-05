import { signInWithRedirect} from 'firebase/auth'
import {auth ,provider} from '../firebase/firebaseConfig'
const AuthPage = () => {

  const handleClick = () => {
signInWithRedirect(auth,provider);
  
};
  return (
    <div className="auth">
      <h1>ChatRoom</h1>
      <p>Login to continue</p>
      
      <button onClick={handleClick}>
        <img src="/google.png" />
        <span>Login via Google</span>
      </button>
    </div>
  );
};

export default AuthPage;
