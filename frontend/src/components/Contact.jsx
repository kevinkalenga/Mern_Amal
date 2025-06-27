import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({listing}) {
    const [landlord, setLandlord] = useState(null)
    const [message, SetMessage] = useState('')

    useEffect(() => {
        const fetchLandlord = async() => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`)
                const data = await res.json();
                setLandlord(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchLandlord()
    }, [listing.userRef])

    function onChange(e) {
        SetMessage(e.target.value)
    }


    return (
        <>
          {
            landlord && (
                <div className="flex flex-col gap-2">
                    <p>
                          Contacte <span className="font-semibold">{landlord.username}</span>
                          pour <span>{listing.name.toLowerCase()}</span>
                    </p>
                    <textarea 
                      onChange={onChange}
                      value={message}
                      name="message" 
                      id="message"
                      rows="2"
                      placeholder="Veuillez ecrire votre message içi..."
                      className="w-full border border-gray-400 rounded-md p-3 mt-2"
                      >

                      </textarea>
                      <Link
                       to={`mailto:${landlord.email}?subject=Regarding 
                          ${listing.name}&body=${message}`}
                          className="bg-slate-700 text-white text-center p-3 rounded-lg uppercase hover:opacity-95"
                      >
                      Envoyer le message
                      </Link>
                </div>
            )
          }
        </>
    )
}