import {Link} from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
function Header() {
     const {currentUser} = useSelector((state) => state.user)
    return (
       <header className="bg-slate-200 shadow-md">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
             <Link to='/'>
                <h1 className='font-bold text-3xl sm:text-xl flex flex-wrap uppercase'>
                    <span className='text-slate-500'>Immo</span>
                    <span className='text-slate-700'>Agency</span>
                </h1>
             </Link>
             <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                 <input type="text" placeholder='Recheche...' 
                    className='bg-transparent focus:outline-none w-24 sm:w-64'
                 />
                 <IoSearchOutline />
             </form>
             <ul className='flex gap-4'>
                <Link to='/'>
                   <li className='hidden sm:inline text-slate-700 hover:underline'>Accueil</li>
                </Link>
                <Link to='/about'>
                   <li className='hidden sm:inline text-slate-700 hover:underline'>A propos</li>
                </Link>
                <Link to='/profile'>
                  
                  {
                     currentUser ? (
                       <img src={currentUser.avatar} alt="profile" className='rounded-full h-7 w-7 object-cover' />
                     ) : (
                     <Link to='/sign-in'>
                         <li className=' sm:inline text-slate-700 hover:underline'>Connexion</li>
                     </Link>
                     )
                  }
                  
                </Link>
                
                
                
             </ul>

          </div>
       </header>
    )
}

export default Header