import express from 'express'

const app = express() 

app.listen(3000, () => {
    console.log("Le serveur est ecouté sur le port 3000")
})