const express = require("express");
const router = express.Router();

const Demand = require('../models/Demand')
const Supply = require('../models/Supply')


router.post('/addNewPost', (req, res) => { 
    res.send('test3');

    // let newPost = new Demand({ name: payload.name, body: payload.body });
    //       newMessage.save(function (err) {
    //         if (err) return handleError(err);
    //         // saved!
    //       });

    

	console.log(req.body.text);
});



router.post('/updateYourPost', (req, res) => { 
	res.send('test3');
	console.log(req.body.text);
});


module.exports = router;