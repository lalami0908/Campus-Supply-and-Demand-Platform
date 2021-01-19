const express = require("express");
const router = express.Router();



router.post('/getMessage', (req, res) => { 
	res.send('POST HTTP method on users resource');
	console.log(req.body.text);
});



module.exports = router