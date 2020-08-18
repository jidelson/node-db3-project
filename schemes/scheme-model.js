const db = require("../data/dbConfig.js");

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find(){
    return db("schemes");
}

function findById(id){
    return db("schemes").where({ id }).first();
}

function findSteps(id){
    return db("steps as s")
    .join("schemes as sc", "sc.id", "s.scheme_id")
    .where({ scheme_id: id })
    .select("s.step_number", "s.instructions", "sc.scheme_name")
    .orderBy("s.step_number");
}

function add(scheme){
    return db("schemes")
    .insert(scheme)
    .then(([id]) => {
        return findById(id)
    });
}

function update(changes, id){
    return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
        return findById(id)
    })
}

function remove(id){
return db("schemes").where({ id }).del();
}