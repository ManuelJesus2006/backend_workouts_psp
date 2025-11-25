const fs = require('fs');
const { getOneWorkout } = require('./Workout');
const DB = require('./db.json');

const createNewWorkout = (workoutToInsert) => {
  const workoutExists = getOneWorkout(workoutToInsert.id)
  if(workoutExists === null){
    console.log("El objeto debe de haber insertado en la bd")
    DB.workouts.push(workoutToInsert)
    saveToDataBase(DB)
    return workoutToInsert
  }
  else{
    console.log(`El Id ${workoutToInsert.id} ya esta codigo`)
    return { error: "El Id ya existe"}
  }
}

const saveToDataBase = (DB) => {
  fs.writeFileSync("src/database/db.json", JSON.stringify(DB,null,2),{
    encoding: "utf8"
  });
};

module.exports = {saveToDataBase, createNewWorkout};



