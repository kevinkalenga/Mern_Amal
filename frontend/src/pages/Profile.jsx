

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { 
   updateUserFailure, 
   updateUserStart, 
   updateUserSuccess,
   deleteUserFailure,
   deleteUserStart,
   deleteUserSuccess,
   signOutUserStart,
   signOutUserFailure,
   signOutUserSuccess
  } from "../redux/user/userSlice";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([])

  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  // Préremplissage du formulaire avec les données de l'utilisateur
  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser]);

  // Upload automatique quand un fichier est sélectionné
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData((prev) => ({ ...prev, avatar: downloadURL }))
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  
   const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const  res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data))
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
   }
  
   const handleShowListings = async () => {
     try {
         setShowListingsError(false)
         const res = await fetch(`/api/user/listings/${currentUser._id}`);
         const data = await res.json();
         // Si ça ne se passe pas bien
         if(data.success === false) {
           setShowListingsError(true);
           return;
          }
          setUserListings(data)
      } catch (error) {
        setShowListingsError(true)
      }
   }

   const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false) {
        console.log(data.message)
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))
    } catch (error) {
      console.log(error.message)
    }
   }
  
  
   return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || "/default-avatar.png"}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Une erreur est survenue (L'image doit être &lt; 2MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Téléchargement ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Téléchargement réussi</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          className="border p-3 rounded-lg"
          id="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="border p-3 rounded-lg"
          id="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Chargement..." : "Mettre à jour"}
        </button>
          <Link to={"/create-listing"} className="bg-green-700 
            rounded-lg text-center text-white p-3 uppercase hover:opacity-95">
             Créer une annonce
          </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Supprimer le compte</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Déconnexion</span>
      </div>

      {error && <p className="text-red-700">{error}</p>}
      <p className='text-green-700 mt-5'>{updateSuccess? 'Mise à jour réussie' :  ''}</p>
      <button className="text-green-700 w-full" onClick={handleShowListings}>
        Afficher les annonces
      </button>
      <p className="text-red-700 mt-5">
         {
           showListingsError ? 'Une erreur est survenue' :  ''
         }
      </p>
       {
         userListings && userListings.length > 0 && 
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-2xl font-semibold">Tes annonces</h1>
            {
              userListings.map((listing) => (
                <div key={listing._id} className="border rounded-lg p-3 flex
                   justify-between items-center gap-4">
                    <Link to={`/listing/${listing._id}`}>
                      <img className="h-16 w-16 object-contain" src={listing.imageUrls[0]} alt="listing cover" />
                    </Link>
                    <Link to={`/listing/${listing._id}`} className="flex-1 text-slate-700 font-semibold hover:underline truncate">
                        {listing.name}
                    </Link>
                    <div className="flex flex-col items-center">
                        <button onClick={()=>handleListingDelete(listing._id)} className="text-red-700 uppercase">Supprimer</button>
                        <button className="text-green-700 uppercase">Editer</button>
                        
                    </div>

                </div>
              ))
            }

          </div>
       }

    </div>
  );
}

