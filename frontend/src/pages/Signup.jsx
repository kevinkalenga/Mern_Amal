import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
export default function Signup() {
    // pour rediriger l'utilisateur
    const navigate = useNavigate()
    // Changement d'etat d'un element
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id] : e.target.value
        })
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(formData)
            });
            // reponse du backend
            const data = await res.json();
            // si ça ne se passe pas bien (message d'erreur)
            if(data.succes === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            // si ça se passe bien l'utilisateur est redirigé vers la page sign-in(connexion)
            setLoading(false)
            setError(null)
            navigate('/sign-in')
        } catch (error) {
            setLoading(false);
            setError(error.message)
        }
    }
    
    
    return (
       <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl text-center font-semibold my-7">Inscription</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" className="border p-3 rounded-lg"
              placeholder="name" id="username" onChange={handleChange} />
            <input type="email" className="border p-3 rounded-lg"
              placeholder="email" id="email" onChange={handleChange} />
            <input type="password" className="border p-3 rounded-lg"
              placeholder="password" id="password" onChange={handleChange} />

              <button className="bg-slate-700 text-white p-3
               rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                  Inscrivez-vous
              </button>
          </form>
          <div className="flex gap-2 mt-5">
              <p>Avez vous un compte?</p>
              <Link to={'/sign-in'}>
                 <span className="text-blue-700">Connectez-vous</span>
              </Link>
          </div>
       </div>
    )
}