import {Link, useNavigate} from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
function Header() {
     const navigate = useNavigate()
     const {currentUser} = useSelector((state) => state.user)
     const [searchTerm, setSearchTerm] = useState('')
    
      const handleSubmit = (e) => {
         e.preventDefault()
         const urlParams = new URLSearchParams(window.location.search)
         urlParams.set('searchTerm', searchTerm)
         const searchQuery = urlParams.toString();
         navigate(`/search?${searchQuery}`)
      }

      useEffect(() => {
         const urlParams = new URLSearchParams(location.search)
         const searchTermFromUrl = urlParams.get('search')
         if(searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl)
         }
      }, [location.search])
    
     return (
       <header className="bg-slate-200 shadow-md">
          <div className="flex justify-between items-center max-w-6xl mx-auto py-2">
             <Link to='/'>
                <h1 className='font-bold text-3xl sm:text-xl flex flex-wrap uppercase'>
                    <span className='text-slate-500'>Immo</span>
                    <span className='text-slate-700'>Agency</span>
                </h1>
             </Link>
             <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
                 <input type="text" placeholder='Recheche...' 
                    className='bg-transparent focus:outline-none w-24 sm:w-64'
                    onChange={(e) => setSearchTerm(e.target.value)}
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