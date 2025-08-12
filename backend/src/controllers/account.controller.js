
// Account operations

import { connection } from '../configs/db.js';

export const assignAccount = async (req, res, next) => {

    try {
        const { product_numeration, product_type, balance, user_id } = req.body;
        if (product_numeration === "" || product_type < 0 || balance < 0 || user_id === 0)
            return res.status(400).json({ message: "Completar el formulario", code: 1 })

        const query = 'INSERT INTO `product`(`product_numeration`, `balance`, `product_type`, `user_id`) VALUES (?, ?, ?, ?)';
        const values = [product_numeration, balance, product_type, user_id];

        await connection.execute(query, values);
        return res.status(200).json({ message: "Cuenta asignada correctamente", code: 1 })
    } catch (e) {
        console.error(e.message)
        return res.status(400).json({ message: "Algo ha fallado", code: 2 })
    }

}

export const assignCard = async (req, res, next) => {
    try {
        const { product_numeration, product_type, balance, user_id, card_exp_month, card_exp_year, card_cvc, card_type, card_company_id } = req.body;
        if (product_numeration === "" || product_type < 0 || balance < 0 || user_id === 0 || card_exp_month === "" || card_exp_year === ""
            || card_cvc === "" || (card_type < 0) || card_company_id == 0
        )
            return res.status(400).json({ message: "Completar el formulario", code: 1 })

        const query = 'INSERT INTO `product`(`product_numeration`, `balance`, `product_type`, `user_id`, `card_exp_month`, `card_exp_year`, `card_cvc`, `card_type`, `card_company_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [product_numeration, balance, product_type, user_id, card_exp_month, card_exp_year, card_cvc, card_type, card_company_id];

        await connection.execute(query, values);
        return res.status(200).json({ message: "Tarjeta asignada correctamente", code: 1 })
    } catch (e) {
        console.error(e.message)
        return res.status(400).json({ message: "Algo ha fallado", code: 2 })
    }
}

export const listUserProducts = async (req, res, next) => {
    try {
        const { id } = req.params;

        const query = 'SELECT * FROM `product` WHERE user_id = ?';
        const [values] = [id];
        const [rows] = await connection.query(query, values);

        return res.status(200).json({ message: "Consulta exitosa", code: 1, products: rows })

    } catch (e) {
        console.error(e.message)
        return res.status(400).json({ message: "Algo ha fallado", code: 2 })
    }
}