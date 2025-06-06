import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errors.js";
import jwt from 'jsonwebtoken'

export const signup = async(req, res, next) => {
   const {username, email, password} = req.body
   const hashedPassword = bcryptjs.hashSync(password, 10)
   const newUser = new User({username, email, password:hashedPassword});
   try {
      await newUser.save()
      res.status(201).json("Inscription reussie")
   } catch (error) {
     next(error)
   }
}

export const signin = async (req, res, next) => {
   // les données de l'utilisateur lors de la connexion
   const {email, password} = req.body;

   try {
      // Recup de l'utilisateur à partir de son email depuis la bdd
      const validUser = await User.findOne({email})
      // Si l'utilisateur n'existe pas
      if(!validUser){
         return next(errorHandler(404, "L'utilisateur n'existe pas"))
      }
      //Si il existe je compare le mdp depuis le formulaire et le mdp hashé
      const validPassword = bcryptjs.compareSync(password, validUser.password)
      if(!validPassword)  return next(errorHandler(401, "Fausses informations d'identification"))
      // Creation de token pour la connexion 
     const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
   //   Envoi des données lors de la connexion 
      const {password: pass, ...rest} = validUser._doc
      res.cookie('access_token', token, {
         httpOnly: true
      }).status(200).json(rest)
   } catch (error) {
      next(error)
   }
}

