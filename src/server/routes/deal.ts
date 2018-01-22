import * as express from 'express';
import { getDB } from 'server/db';
import * as shortid from 'shortid';

const router = express.Router();

/**
 * add new deal
 */
router.put('/', (req, res) => {
    const db = getDB();
    const newDeal = {
        date: req.body.date,
        id: shortid.generate(),
        value: req.body.value,
    };

    db.get('deals')
        .push(newDeal)
        .write();

    res.send({success: true, deal: newDeal});
});

/**
 * get all deal
 */
router.get('/', (req, res) => {
    const db = getDB();

    res.send({success: true, deals: db.get('deals').value()});
});

/**
 * remove
 */
router.delete('/:id', (req, res) => {
    const db = getDB();

    db.get('deals').remove({ id: req.param('id') }).write();

    res.send({success: true});
});

export default router;
