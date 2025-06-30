

export default function Search() {
    return(
       <div className="flex flex-col md:flex-row">
           <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
               <form className="flex flex-col gap-8">
                  <div className="flex items-center gap-2">
                      <label className="whitespace-nowrap font-semibold">Terme de recherche: </label>
                      <input type="text" id="searchTerm" placeholder="Search..." className="border rounded-lg p-3 w-full" />
                      
                  </div>
                  <div className="flex gap-2 flex-wrap items-center">
                    <label className="font-semibold">Type: </label>
                    <div className="flex gap-2">
                       <input type="checkbox" id="all" className="w-5" />
                       <span>Location et Vente</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="rent" className="w-5" />
                        <span>Location</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="sale" className="w-5" />
                        <span>Vente</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="offer" className="w-5" />
                        <span>Offre</span>
                    </div>

                  </div>
                  <div className="flex gap-2 flex-wrap items-center">
                      <label className="font-semibold">Équipements: </label>
                      <div className="flex gap-2">
                         <input type="checkbox" id="parking" className="w-5" />
                         <span>Parking</span>
                      </div>
                      <div className="flex gap-2">
                         <input type="checkbox" id="furnished" className="w-5" />
                         <span>Meublée</span>
                      </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <label className="font-semibold">Trie: </label>
                     <select className="border rounded-lg p-3" id="sort_order" >
                        <option>Prix du plus élevé au plus bas</option>
                        <option>Prix du plus bas au plus élevé</option>
                        <option>Dernière</option>
                        <option>Le plus ancien</option>
                     </select>
                  </div>
                  <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95">
                      Recherche
                  </button>
               </form>
           </div>
           <div className="flex-1">
             <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">Résultats de la liste: </h1>
           </div>
       </div>
    )
}