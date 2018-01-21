import * as express from 'express';
import { getDB } from 'server/db';

const router = express.Router();

router.put('/', (req, res) => {
    const db = getDB();

    console.log(db.get('deals'));

    // Add a post
    db.get('deals')
        .push({ id: 1, date: req.body.date, value: req.body.value})
        .write();

    res.send({success: true});
});

export default router;
