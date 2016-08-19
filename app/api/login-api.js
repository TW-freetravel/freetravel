import express from 'express';
import {User} from '../db/schema';
const router = express.Router();
router.post('/', (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;

    if (name == '' || password == '') {
        res.status(400).send('name and password can not be null');
    }
    else {
        User.findOne({name, password}, (err, userData) => {
            if (err) return next(err);

            if (userData) {
                res.status(201).send('login success');
            } else {
                res.status(400).send('name or password is wrong');
            }
        });
    }

});
export default router;
