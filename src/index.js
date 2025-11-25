const express = require('express')
const bodyParser = require('body-parser')
const v1WorkoutRouter = require('./v1/routes/workoutRoutes')
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000

//For testing purposes
// app.get('/', (req, res) => {
//     res.send("<h1>Bienvenido, pruebe ha acceder a alguno de nuestros endpoints</h1>")
// })
app.use(cors());
app.use(bodyParser.json())

app.use('/api/v1/workouts', v1WorkoutRouter)

app.listen(PORT, () => {
    console.log(`La API esta ejecutandose en el puerto ${PORT}`)
})