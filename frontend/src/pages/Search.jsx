import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ListingItem from "../components/ListingItem"

export default function Search() {
     
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [listings, setListings] = useState([])
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking:false,
        furnished: false,
        offer:false,
        sort: 'created_at',
        order: 'desc'
    })

    
        useEffect(() => {
         const urlParams = new URLSearchParams(location.search);
         const searchTermFromUrl = urlParams.get('searchTerm');
         const typeFromUrl = urlParams.get('type')
         const parkingFromUrl = urlParams.get('parking');
         const furnishedFromUrl = urlParams.get('furnished')
         const offerFromUrl = urlParams.get('offer')
         const sortFromUrl = urlParams.get('sort')
         const orderFromUrl = urlParams.get('order')

         if(
             searchTermFromUrl || 
             typeFromUrl ||
             parkingFromUrl ||
             furnishedFromUrl ||
             offerFromUrl ||
             sortFromUrl ||
             orderFromUrl
        ){
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true: false,
                furnished: furnishedFromUrl === 'true' ? true: false,
                offer: offerFromUrl === 'true' ? true: false, 
                sort: sortFromUrl || ' created_at',
                order: orderFromUrl || 'desc'
            })
        }

        const fetchListings = async () => {
            setLoading(true)
            const serachQuery = urlParams.toString()
            const res = await fetch(`/api/listing/get?${serachQuery}`);
            const data = await res.json();
            setListings(data)
            setLoading(false)
        }
        fetchListings()


    }, [location.search])
    
    
    
    
    
    const handleChange = (e) => {
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSidebardata({...sidebardata, type: e.target.id})
        }
        if(e.target.id === 'searchTerm') {
            setSidebardata({...sidebardata, searchTerm: e.target.value})
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSidebardata({
                ...sidebardata, 
                [e.target.id]: e.target.checked || e.target.checked === 'true' ? true: false

            })
        }
        // à expliquer demain
        if(e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || ' created_at';
            const order = e.target.value.split('_')[1] || 'desc'

            setSidebardata({...sidebardata, sort, order})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm)
        urlParams.set('type', sidebardata.type)
        urlParams.set('parking', sidebardata.parking)
        urlParams.set('furnished', sidebardata.furnished)
        urlParams.set('offer', sidebardata.offer)
        urlParams.set('sort', sidebardata.sort)
        urlParams.set('order', sidebardata.order)
       const searchQuery = urlParams.toString();
       navigate(`/search?${searchQuery}`)
    }


    
    
    return(
       <div className="flex flex-col md:flex-row">
           <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
               <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="flex items-center gap-2">
                      <label className="whitespace-nowrap font-semibold">Terme de recherche: </label>
                      <input type="text" id="searchTerm" 
                        placeholder="Search..." 
                        className="border rounded-lg p-3 w-full" value={sidebardata.searchTerm} 
                         onChange={handleChange}
                        />
                      
                  </div>
                  <div className="flex gap-2 flex-wrap items-center">
                    <label className="font-semibold">Type: </label>
                    <div className="flex gap-2">
                       <input type="checkbox" id="all" className="w-5" 
                         value={sidebardata.type === 'all'} 
                         onChange={handleChange}
                       />
                       <span>Location et Vente</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="rent" 
                        className="w-5" 
                          checked={sidebardata.type === 'rent'} 
                         onChange={handleChange}
                        />
                        <span>Location</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="sale"
                         className="w-5"
                            checked={sidebardata.type === 'sale'} 
                            onChange={handleChange} 
                         />
                        <span>Vente</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="offer" 
                        className="w-5" 
                           checked={sidebardata.offer} 
                           onChange={handleChange}
                        />
                        <span>Offre</span>
                    </div>

                  </div>
                  <div className="flex gap-2 flex-wrap items-center">
                      <label className="font-semibold">Équipements: </label>
                      <div className="flex gap-2">
                         <input type="checkbox" id="parking" 
                         className="w-5" 
                            checked={sidebardata.parking} 
                            onChange={handleChange}
                         />
                         <span>Parking</span>
                      </div>
                      <div className="flex gap-2">
                         <input type="checkbox" id="furnished"
                          className="w-5" 
                             checked={sidebardata.furnished} 
                             onChange={handleChange}
                          />
                         <span>Meublée</span>
                      </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <label className="font-semibold">Trie: </label>
                     <select
                          defaultValue={'created_at_desc'} 
                           onChange={handleChange}
                        className="border rounded-lg p-3" id="sort_order" >
                        <option value="regularPrice_desc">Prix du plus élevé au plus bas</option>
                        <option value="regularPrice_asc">Prix du plus bas au plus élevé</option>
                        <option value="createdAt_desc">Dernière</option>
                        <option value="createdAt_asc">Le plus ancien</option>
                     </select>
                  </div>
                  <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95">
                      Recherche
                  </button>
               </form>
           </div>
           <div className="flex-1">
             <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">Résultats de la liste: </h1>
           
             <div className="p-7 flex flex-wrap gap-4">
              {
                !loading && listings.length === 0 && (
                    <p className="text-xl text-slate-700">
                        Anonce non trouvée
                    </p>
                )
              }
              {
                loading && (
                    <p className="text-center w-full text-slate-700 text-xl">Rechargement...</p>
                )
              }
              {
                !loading && listings && listings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                )) 
              }
            </div>
           </div>
       </div>
    )
}