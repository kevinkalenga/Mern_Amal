import {Link} from "react-router-dom"
export default function Signup() {
    
    return (
       <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl text-center font-semibold my-7">Inscription</h1>
          <form className="flex flex-col gap-4">
            <input type="text" className="border p-3 rounded-lg"
              placeholder="name" id="username" />
            <input type="text" className="border p-3 rounded-lg"
              placeholder="email" id="email" />
            <input type="text" className="border p-3 rounded-lg"
              placeholder="password" id="password" />

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