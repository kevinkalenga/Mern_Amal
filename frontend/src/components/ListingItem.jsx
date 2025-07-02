import { Link } from "react-router-dom"
import {MdLocationOn} from 'react-icons/md'

export default function ListingItem({listing}) {
    return (
       <div className="bg-white shadow-md hover:shadow-lg 
         transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">

            <Link to={`/listing/${listing._id}`}>
               <img className="h-[320px] sm:h-[220px] 
                  w-full object-cover hover:scale-105 duration-300" 
                  src={listing.imageUrls[0]} 
                  alt="listing cover" 
                />
                <div className="p-3">
                   <p className="truncate text-lg font-semibold text-slate-700">{listing.name}</p>
                   <div className="flex items-center gap-1">
                       <MdLocationOn className="h-4 w-4 text-green-700" />
                       <p className="text-sm text-gray-600 truncate">{listing.address}</p>
                   </div>
                   <p className="text-start text-gray-600 line-clamp-2">{listing.description}</p>
                   <p className="text-slate-500 mt-2 font-semibold">
                       
                       {
                                listing.offer
                                ? listing.discountPrice.toLocaleString(
                                      "fr-FR",
                                      { style: "currency", currency: "EUR" }
                                  )
                                : listing.regularPrice.toLocaleString(
                                      "fr-FR",
                                      { style: "currency", currency: "EUR" }
                                  )

                        } 
                        {
                            listing.type === 'rent' && ' / mois'
                        }
                   </p>
                   <div className="flex text-slate-700 gap-3">
                       <div className="font-bold text-xs">
                          {
                            listing.bedrooms > 1 ? `${listing.bedrooms} chambres`: `${listing.bedrooms} chambre`
                          }
                       </div>
                       <div className="font-bold text-xs">
                          {
                            listing.bathrooms > 1 ? `${listing.bathrooms} salles des bains`: `${listing.bathrooms} salle de bain`
                          }
                       </div>
                   </div>
                </div> 

            </Link>

       </div>
    )
}