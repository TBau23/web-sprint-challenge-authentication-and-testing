const { where } = require("../database/dbConfig.js");
const db = require("../database/dbConfig.js");

module.exports = {
    find, findById, add, findBy
};

function find() {
    return db("users").select("id", "username").orderBy("id");
}

function findById(id) {
    return db("users").where({id}).first().select("id", "username");
}

function findBy(filter) {
    return db('users').where(filter).orderBy("id");
}

function add(user) {
    return db("users")
    .insert(user)
    .then(ids => {
        return findById(ids[0]);
    })
}