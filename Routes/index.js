const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    return res.send(`Essa informação é importante.`);
});

router.post('/', (req,res) => {
    return res.send(`Tudo ok com o método POST da raiz`);
});

module.exports = router;