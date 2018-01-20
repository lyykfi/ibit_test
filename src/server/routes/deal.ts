import * as express from 'express';

const router = express.Router();

router.use((req, res, next) => {
    res.send('test');
});

export default router;
