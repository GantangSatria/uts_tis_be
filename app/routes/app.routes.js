const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
 res.send('UTS TIS')
})

module.exports = router;