
// Auth operations

import { EMAIL_REGEX, BCRYPT_SALTS } from '../configs/util.js'
import { connection } from '../configs/db.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../configs/jwt.js';

export const register = async (req, res, next) => {
    try {
        const { name, last_name, email, username, password, dpi } = req.body;

        if (name === "" || last_name === "" || email === "" || username === "" || password === "" || dpi === "")
            return res.status(400).json({ message: "Completar el formulario", code: 1 })
        
        if (!EMAIL_REGEX.test(email))
            return res.status(400).json({ message: "Email incorrecto", code: 1 })

        if (dpi.length !== 13)
            return res.status(400).json({ message: "DPI incorrecto", code: 1 })

        const encryptedPassword = await bcrypt.hash(password, BCRYPT_SALTS)

        const query = 'INSERT INTO `user`(`name`, `last_name`, `email`, `username`, `password`, `dpi`) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [name, last_name, email, username, encryptedPassword, dpi];

        await connection.execute(query, values);
        return res.status(200).json({ message: "Usuario creado correctamente", code: 1 })

    } catch (e) {
        console.error(e.message)
        return res.status(400).json({ message: "Algo ha fallado", code: 2 })
    }
}

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if ( username === "" || password === "")
            return res.status(400).json({ message: "Completar el formulario", code: 1 });

        const query = 'SELECT * FROM `user` WHERE `username` = ?' ;
        const values = [username];
        const [rows] = await connection.query(query, values);

        if(rows.length <= 0)
            return res.status(400).json({ message: "No existe el usuario y contraseña", code: 1 });

        const foundUser = rows[0];
        const isValid = await bcrypt.compare(password, foundUser.password)

        if(!isValid)
            return res.status(400).json({ message: "Credenciales incorrectas", code: 1 });

        const token = generateToken({username, email: foundUser.email})
            
        return res.status(200).json({ message: "Usuario logeado correctamente", code: 1, jwt: token })

    } catch (e) {
        console.error(e.message)
        return res.status(400).json({ message: "Algo ha fallado", code: 2 })
    }
}

export const getUsers = async (req, res, next) => {
    try {
        
        const query = 'SELECT * FROM `user`' ;
        const [rows] = await connection.query(query);

        return res.status(200).json({ message: "Consulta exitosa", code: 1, users: rows })

    } catch (e) {
        console.error(e.message)
        return res.status(400).json({ message: "Algo ha fallado", code: 2 })
    }
}