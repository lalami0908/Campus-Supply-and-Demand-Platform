// import express from 'express';
const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
	res.send('test1'); 
	console.log(req.body.text);
});

router.get('/test', (req, res) => { 
	res.send('test2');
	console.log(req.body.text);
});

router.post('/', (req, res) => { 
	res.send('test3');
	console.log(req.body.text);
});

router.put('/', (req, res) => { 
	res.send('test3');
	console.log(req.body.text);
});

router.delete('/', (req, res) => { 
	res.send('test4');
	console.log(req.body.text);
});

module.exports = router;