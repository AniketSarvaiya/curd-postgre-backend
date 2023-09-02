const { db } = require('../config/db.js')

const registerUser = async (req, res) => {

    try {
        const { firstname, lastname, email, password } = req.body;
        const query = "INSERT INTO users (firstname,lastname,email,password) VALUES ($1,$2,$3,$4) RETURNING *"
        const values = [firstname, lastname, email, password];

        const isExistsQuery = `select * from users where email = $1`;
        const isExists = await db.query(isExistsQuery, [email]);

        console.log(isExists.rows);
        // res.send(isExists);
        if (isExists.rowCount == 0) {
            const user = await db.query(query, values);
            if (user.rowCount > 0)
                res.send({ message: "User Added Success...!" })
            else
                res.send({ message: "Insertion Failed...!" })
        }
        else
            res.send({ message: "User is already exist...!" });
    } catch (err) {
        res.send(`${err}`);
    }
}

const getUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const query = `select * from users where email=$1 and password=$2`;
        const user = await db.query(query, [email, password]);
        if (user.rowCount == 1) {
            const data = user.rows[0];
            console.log(data);
            res.send(data.firstname);
        }
        else
            res.send({ message: "Incorrect username or password" });
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateUser = async (req, res) => {

    try {

        const id = req.params.id;
        const { firstname, lastname } = req.body;
        const query = `update users SET firstname = $1 , lastname=$2 where id = $3`;
        const values = [firstname, lastname, id];
        const user = await db.query(query, values);
        if (user.rowCount > 0) {
            res.send(`Updated successfuly...!`);
            return;
        }
        else
            res.send("all UptoDate...!")
        console.log(user);

    } catch (error) {
        res.send(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const query = `delete from users where id =$1`;
        const user = await db.query(query, [id]);
        console.log(user);
        if (user.rowCount > 0)
            res.send({ message: "user Deleted Successfuly...!" });
        else
            res.send({ message: "user Does not exists...!" })

    } catch (error) {
        res.send(error);
    }
}

module.exports = { registerUser, getUser, updateUser, deleteUser }