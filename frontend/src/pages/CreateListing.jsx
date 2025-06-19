import { useState } from "react"
import { app } from "../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function CreateListing() {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [imageUploadError, setImageUploadError] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: []
  })
  console.log(files)
  
  const handleImageSubmit = (e) => {
   if(files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true)

      const promises = []

      for(let i = 0; i < files.length; i++) {
         promises.push(storeImage(files[i]))
      }

      Promise.all(promises).then((urls) => {
         setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls)
         });
         setImageUploadError(false)
         setUploading(false)
         
      }).catch((err) => {
         setImageUploadError("Le télechargement non reussi");
         setUploading(false)
      })
   } else {
      setImageUploadError("Tu peux seulement télecharger six images")
      setUploading(false)
   }
}
   
  const storeImage = async (file) => {
   
   return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName)
      const uploadTask =  uploadBytesResumable(storageRef, file)
      uploadTask.on(
         'state_changed',
         (snapshot) => {
            const progress = 
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         },

         (error) => {
            reject(error)
         },
         () => {
             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
         })
         }
        
      )
   })
  
  
  }

    const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  
   return (
      
    <main className="p-3 max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold text-center my-7">Créer une annonce</h1>
          <form className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-4 flex-1">
              <input type="text" placeholder="Nom"
               className="border p-3 rounded-lg" 
               id="name" maxLength="62" minLength="10" required />
              
              <textarea placeholder="Déscription" 
              type="text" id="description" 
              className="border rounded-lg p-3"></textarea>
              <input type="text" placeholder="Adresse" 
                className="border rounded-lg p-3" required />
               <div className="flex gap-6 flex-wrap">
                  <div className="flex gap-2">
                     <input type="checkbox" id="rent" className="w-5" />
                     <span>Location</span>
                  </div>
                  <div className="flex gap-2">
                     <input type="checkbox" id="parking" className="w-5" />
                     <span>Place de parking</span>
                  </div>
                  <div className="flex gap-2">
                     <input type="checkbox" id="furnished" className="w-5" />
                     <span>Meublée</span>
                  </div>
                  <div className="flex gap-2">
                     <input type="checkbox" id="offer" className="w-5" />
                     <span>Offre</span>
                  </div>
                 
              </div>
               <div className="flex gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                     <input type="number" id="bedrooms" min="1" max="10" 
                      className="p-3 border-gray-300 rounded-lg" />
                     <p>Chambres</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <input type="number" id="bathrooms" min="1" max="10" 
                      className="p-3 border-gray-300 rounded-lg" />
                     <p>Salle de bain</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <input type="number" id="regularPrice" min="1" max="10" 
                      className="p-3 border-gray-300 rounded-lg" />
                      <div className="flex flex-col items-center">
                         <p>Prix regulier</p>
                         <span className="text-xs">(€ / mois)</span>
                      </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <input type="number" id="discountPrice" min="1" max="10" 
                      className="p-3 border-gray-300 rounded-lg" />
                      <div className="flex flex-col items-center">
                         <p>Prix reduit</p>
                         <span className="text-xs">(€ / mois)</span>
                      </div>
                  </div>
                  
            </div>
            </div>
           
            <div className="flex flex-col flex-1 gap-4">
                     <p className="font-semibold">
                        Image: <span className="font-normal text-gray-600 ml-2">
                            La première image sera la couverture (max 6)
                        </span>
                     </p>
                     <div className="flex gap-4">
                        <input onChange={(e) => setFiles(e.target.files)} type="file" name="" id="images" accept="image/*" multiple />
                        <button onClick={handleImageSubmit} type="button" className="p-3 text-green-700
                         border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                           {
                              uploading ? 'Télechargement': 'Télecharger'
                           }
                         </button>
                     </div>
                     <p className="text-red-700 text-sm">
                        {imageUploadError && imageUploadError}
                     </p>
                        {
                         formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) =>(
              
                  <div key={url} className="flex justify-between p-3 border items-center">
                    <img src={url} alt="listing image" 
                     className="w-20 h-20 object-contain rounded-lg" />
                     <button type="button" onClick={()=>handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">
                        Delete
                     </button>
                  </div>
                
              ))
            }
              <button disabled={loading || uploading} className="p-3 bg-slate-700 text-white 
              rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                {loading ? 'Crée...':'Créer une annonce'}
            </button>
            {error && <p className="text-red-700 text-sm">{error}</p>}
             </div>       
          </form>
    </main>
  )
}