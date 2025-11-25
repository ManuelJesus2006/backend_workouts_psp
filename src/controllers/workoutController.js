const workoutService = require('../services/workoutService')

const getAllWorkouts = (req, res) => {
    const {mode} = req.query;
    const {equipment} = req.query;
    const {name} = req.query;
    const {limit} = req.query;
    const {sort} = req.query;
    try {
        //const allWorkouts = workoutService.getAllWorkouts();
        const allWorkouts = workoutService.getAllWorkouts({mode, equipment, name, limit, sort})
        if (allWorkouts.length != 0) res.send({ status: 'OK', data: allWorkouts });
        else res.send({ status: 'OK', data: 'Sin resultados' });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: error?.message || error })
    }

}

const getOneWorkout = (req, res) => {
    const {
        params: { workoutId },
    } = req;
    if (!workoutId) {
        res.status(400).send({ status: "UNPROVIDED", data: { error: "No has introducido una id" } });
    }
    try {
        const workout = workoutService.getOneWorkout(workoutId);
        res.send({ status: "OK", data: workout })
    } catch (error) {
        res.status(error?.status || 500).send({ status: "NOT FOUND", data: { error: error?.message || error } })
    }

}

const createNewWorkout = (req, res) => {
    const { body } = req;
    if (
        !body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips
    ) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error:
                    "Alguna de las keys falta u otro error que no se sabe"
            },
        });
        return;
    }
    try {
        const createdWorkout = workoutService.createNewWorkout()
        res.status(201).send({ status: "OK", data: createdWorkout });
    } catch (e) {
        res
            .status(e?.status || 500)
            .send({ status: 'FAILED', data: { error: e?.message || e } })
    }
}

const updateOneWorkout = (req, res) => {
    const {
        body,
        params: { workoutId },
    } = req
    if (!workoutId) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "El parámetro ':workoutId' no puede estar vacio" }
        })
    }
    try {
        const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
        res.send({ status: "OK", data: updatedWorkout })
    } catch (error) {
        res.status(error?.status || 500).send({status: "FAILED", data: {error: error?.message || error}});
    }
    const updatedWorkout = workoutService.updateOneWorkout(workoutId, body)
    res.send({ status: "OK", data: updatedWorkout });
}

const deleteOneWorkout = (req, res) => {
    const {
        params: { workoutId },
    } = req;
    if (!workoutId) return;
    workoutService.deleteOneWorkout(workoutId);
    res.status(204).send({ status: "OK" })
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
};