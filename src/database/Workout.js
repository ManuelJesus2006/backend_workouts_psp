const DB = require('./db.json');
const { saveToDataBase } = require('./utils');

const getAllWorkouts = (filterParams) => {
    try {
        //return DB.workouts;
        let workouts = DB.workouts;
        //let arrayWorkouts = []

        const cleanFilterParams = Object.keys(filterParams).reduce((acc, key) => {
            // Si el valor no es undefined ni null, lo añade al nuevo objeto (acc)
            if (filterParams[key] !== undefined && filterParams[key] !== null) {
                acc[key] = filterParams[key];
            }
            return acc;
        }, {});

        // Aplicamos la lógica de la imagen sobre el objeto limpio
        if (Object.keys(cleanFilterParams).length > 0) {
            console.log('Filtros a utilizar:', JSON.stringify(cleanFilterParams));
        } else {
            console.log('Filtros a utilizar: NINGUNO');
        }
        if (filterParams.mode) {
            workouts = workouts.filter((workout) => workout.mode.toLowerCase().includes(filterParams.mode))
        }

        if (filterParams.name) {
            workouts = workouts.filter((workout) => workout.name.toLowerCase().includes(filterParams.name))
        }

        if (filterParams.equipment) {
            let filteredWorkouts = []

            workouts.forEach(workout => {
                workout.equipment.forEach((equip) => {
                    if (filterParams.equipment === equip) {
                        filteredWorkouts.push(workout);
                    }
                })

            })
            workouts = filteredWorkouts;
        }

        if (filterParams.limit) {
            workouts = workouts.slice(0, filterParams.limit);
        }

        if (filterParams.sort) {
            if (filterParams.sort.toLowerCase() === 'asc') {
                workouts = workouts.sort((a, b) => {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                })
            }
            if (filterParams.sort.toLowerCase() === 'desc') {
                workouts = workouts.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                })
            }
        }


        return workouts;
        /*if (filterParams.mode === undefined && filterParams.limit === undefined) return workouts;
        let resultados = []
        for (let i = 0; i < workouts.length; i++) {
            let siTiene = false;
            let entrenamiento = workouts[i];
            if (filterParams.mode !== undefined) {
                siTiene = true;
            }
            if (filterParams.limit !== undefined) {
                siTiene = true;
            }

            //if ()

            if (siTiene) {
                if (filterParams.mode !== undefined) {
                    if (entrenamiento.mode == filterParams.mode) {
                        resultados.push(entrenamiento);
                    }
                }else resultados.push(entrenamiento);
            }
        }
        if (filterParams.limit) {
            let resultadosIfLimit = []
            for (let i = 0; i < filterParams.limit.length; i++) {
                resultadosIfLimit.push(resultados[i]);
            }
            resultados = resultadosIfLimit;
        }
        return resultados;*/
    } catch (error) {
        throw { status: 500, message: error }
    }
}

const getOneWorkout = (workoutId) => {
    try {
        const workout = DB.workouts.find((workout) => workout.id === workoutId);
        if (!workout) {
            throw {
                status: 400,
                message: `No se pudo encontrar el workout con id: ${workoutId}`
            }
        }
        return workout;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error }
    }
}

const updateOneWorkout = (workoutId, changes) => {
    try {
        const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === changes.name) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Workout con el nombre '${changes.name}' ya existe`
            };
        }
        const indexForUpdate = DB.workouts.findIndex((workout) => workout.id === workoutId)
        if (indexForUpdate === -1) {
            throw {
                status: 400,
                message: `No se pudo encontrar workout con la id ${workoutId}`
            };
        };
        const updatedWorkout = {
            ...DB.workouts[indexForUpdate],
            ...changes,
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        }
        DB.workouts[indexForUpdate] = updatedWorkout;
        saveToDataBase(DB);
        return updatedWorkout;

    } catch (error) {
        throw {
            status: error?.status || 500, message: error?.message || error
        }
    }
};

const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded =
        DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > false;
    if (isAlreadyAdded) {
        throw {
            status: 400,
            message: `El entrenamiento: "${newWorkout.name}" ya ha sido añadido`
        };
    }
    try {
        DB.workouts.push(newWorkout);
        saveToDataBase(DB);
        return newWorkout;
    } catch (e) {
        throw { status: 500, message: e?.message || error };
    }
};

const deleteOneWorkout = (workoutId) => {
    const indexForDeletion = DB.workouts.findIndex((workout) => workout.id === workoutId)
    if (indexForDeletion === -1) return;
    DB.workouts.splice(indexForDeletion, 1);
    saveToDataBase(DB);
}
module.exports = { getAllWorkouts, getOneWorkout, createNewWorkout, updateOneWorkout, deleteOneWorkout };