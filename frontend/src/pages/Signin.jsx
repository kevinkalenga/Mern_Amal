import { useState } from "react"
import { useSelector,  useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";
export default function Signin() {
   
    // Changement d'etat d'un element
    const [formData, setFormData] = useState({});
   const {loading, error}  = useSelector((state) => state.user);
   const dispatch = useDispatch();

        // pour rediriger l'utilisateur
    const navigate = useNavigate()
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id] : e.target.value
        })
    }
    
    // fonction permettant à la soumission du formulaire
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            dispatch(signInStart())
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                 'Content-Type' : 'application/json',
            },
            body: JSON.stringify(formData)
           });
            // reponse du backend
            const data = await res.json();
            // si ça ne se passe pas bien (message d'erreur)
            if(data.success === false) {
               dispatch(signInFailure(data.message))
                return;
            }
            // si ça se passe bien l'utilisateur est redirigé vers la page sign-in(connexion)
            dispatch(signInSuccess(data))
            navigate('/')
        } catch (error) {
           dispatch(signInFailure(error.message))
        }
    }
    
    
    return (
       <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl text-center font-semibold my-7">Connexion</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <input type="email" className="border p-3 rounded-lg"
              placeholder="email" id="email" onChange={handleChange} />
            <input type="password" className="border p-3 rounded-lg"
              placeholder="password" id="password" onChange={handleChange} />

              <button className="bg-slate-700 text-white p-3
               rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                  {loading ? 'Loading...' : 'Connectez-vous'}
              </button>
              <OAuth />
          </form>
          <div className="flex gap-2 mt-5">
              <p>Vous n'avez pas un compte ?</p>
              <Link to={'/sign-up'}>
                 <span className="text-blue-700">Inscrivez-vous</span>
              </Link>
          </div>
          {error && <p className="text-red-500">{error}</p>}
       </div>
    )
}