import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import {useSelector} from "react-redux"
import Contact from "../components/Contact";
import 'swiper/css/bundle'
import {FaBath, FaBed, FaChair, FaMapMarker, FaParking, FaShare} from 'react-icons/fa'

export default function Listing() {
    SwiperCore.use([Navigation])

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [copied, setCopied] = useState(false)
    const [contact, setContact] = useState(false)
    const {currentUser} = useSelector((state) => state.user)
    const params = useParams() 

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/listing/get/${params.listingId}`)
                const data = await res.json()
                if(data.success === false) {
                    setError(true)
                    setLoading(false)
                    return;
                }
                setListing(data)
                setLoading(false)
                setError(false)
            } catch (error) {
                 setError(true)
                 setLoading(false)
            }
        }
        fetchListing()
    }, [params.listingId])

    return (
        <main className="min-h-screen">
             {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
             {
                error && (
                    <p>Une erreur est survenue!</p>
                )
             }
             {
                listing && !loading && !error && (
                    <div>
                        <Swiper navigation>
                            {
                                listing.imageUrls.map((url) => (
                                    <SwiperSlide key={url}>
                                          <div 
                                          className="h-[550px]"
                                          style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover',}}
                                          >

                                          </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <div className="fixed top-[13%] right-[3%] z-10 
                        border rounded-full h-12 w-12 flex justify-center items-center bg-slate-100 cursor-pointer"
                        >
                          <FaShare 
                             className="text-slate-500"
                             onClick={() => {
                                navigator.clipboard.writeText(window.location.href)
                                setCopied(true);
                                setTimeout(() => {
                                    setCopied(false)
                                }, 2000)
                             }}
                          />   

                        </div>
                        {
                            copied && (
                                <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">Le lien est copié!</p>
                            )
                        }
                        <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
                           <p className="text-2xl font-semibold">
                            {listing.name} - {' '}
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
                                listing.type === 'rent' && ' /mois'
                            }
                           </p>
                           <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
                             <FaMapMarker className="text-green-700" />
                             {listing.address}
                           </p>
                           <div className="flex gap-4">
                              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                                 {
                                    listing.type === 'rent' ? 'Location' : 'Vente'
                                 }
                              </p>
                              {
                                listing.offer && (
                                    <p className="bg-green-900 w-full max-w-[200px]  text-white text-center p-1 rounded-md">
                                        €{+listing.regularPrice - +listing.discountPrice} Remise
                                    </p>
                                )
                              }
                           </div>
                           <p className="text-slate-800">
                              <span className="font-semibold text-black">Déscription -</span>
                              {
                                listing.description
                              }
                           </p>
                           <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                              <li className="flex items-center gap-1 whitespace-nowrap">
                                  <FaBed className="text-lg"/>
                                  {
                                    listing.bedrooms > 1 ? `${listing.bedrooms} chambres`: `${listing.bedrooms} chambre`
                                  }
                              </li>
                              <li className="flex items-center gap-1 whitespace-nowrap">
                                  <FaBath className="text-lg"/>
                                  {
                                    listing.bathrooms > 1 ? `${listing.bathrooms} Salles des bains`: `${listing.bathrooms} Salle de bain`
                                  }
                              </li>
                              <li className="flex items-center gap-1 whitespace-nowrap">
                                  <FaParking className="text-lg"/>
                                  {
                                    listing.parking ? 'Parking': 'Pas de parking'
                                  }
                              </li>
                              <li className="flex items-center gap-1 whitespace-nowrap">
                                  <FaChair className="text-lg"/>
                                  {
                                    listing.furnished ? 'Meublée': 'Non meublée'
                                  }
                              </li>
                           </ul>
                           {
                            currentUser && listing.userRef !== currentUser._id && !contact && (
                                <button onClick={() =>setContact(true)} 
                                className="bg-slate-700 rounded-lg uppercase text-white hover:opacity-95 p-3">
                                    Contacter le bailleur
                                </button>
                            )
                           }
                           {contact && <Contact listing={listing} />}
                        </div>
                    </div>
                )
             }
        </main>
    )
}