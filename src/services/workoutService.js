const Workout = require('../database/Workout')

const getAllWorkouts = (filterParams) => {
    //const allWorkouts = Workout.getAllWorkouts();
    try{
        const allWorkouts = Workout.getAllWorkouts(filterParams);
        return allWorkouts;
    }catch(error){
        throw error;
    }
    
}

const getOneWorkout = (workoutId) => {
    const workout = Workout.getOneWorkout(workoutId)
    return workout
}

const createNewWorkout = (newWorkout) => {
    const workoutToInsert = {
        ...newWorkout,//Esto crea una cpia del objeto
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", {timeZone: 'UTC'}),
        updatedAt: new Date().toLocaleString("en-US", {timeZone: 'UTC'}),
    };
    try{
        const createdWorkout = Workout.createNewWorkout(workoutToInsert);
        return createdWorkout;
    }catch(e){
        throw e;
    }  
};

const updateOneWorkout = (workoutId, changes) => {
    try{
        const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);
        return updatedWorkout;
    }catch (error){
        throw (error)
    }
}

const deleteOneWorkout = (workoutId) => {
    Workout.deleteOneWorkout(workoutId);
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
};