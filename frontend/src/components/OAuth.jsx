
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {app} from '../firebase'
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
export default function OAuth() {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
  const handleGoogleClick = async() => {
   
     try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        const result = await signInWithPopup(auth, provider)
         
        // requette
        const res = await fetch('/api/auth/google', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL})
         
        })
         const data = await res.json()
         dispatch(signInSuccess(data))

         navigate('/')
     } catch (error) {
       console.log("Tu ne peux pas te connecter avec google", error)
     }
  
  
  
  
  }
  
  
  return (
    <button onClick={handleGoogleClick} 
    className="bg-red-700 text-white
     p-3 rounded-lg uppercase hover:opacity-95" type="button"
     >
        Continue avec google
    </button>
  )
}
