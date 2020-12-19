import express from 'express';
const router = express.Router();
import bodyParser from 'body-parser';
import cors from 'cors' 


router.post('/users', (req, res) => { 
	res.send('POST HTTP method on users resource');
	console.log(req.body.text);
 });

 router.put('/users/:userId', (req, res) => { 
	res.send(
		`PUT HTTP method on users/${req.params.userId} resource`,
	);
});



export default router