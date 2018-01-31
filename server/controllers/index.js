var path = require('path');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Jimp = require("jimp");
var { bodau } = require('../utils/string.utils');

const imagesPath = process.cwd() + '/images/';

router.get('/', function (req, res) {
	res.send('Hello World!');
});

router.post('/generate', function (req, res) {
	var loadedImage;
	let userID = req.body.userid;
	let fileName = imagesPath + 'results/' + userID + ".jpg";
	let name = req.body.name;
	let text = '2018 ' + bodau(name) + ' dau tu nhu the nao?';
	let randomNumber = Math.floor(Math.random() * Math.floor(11)) + 1;
	console.log(name)
	if (fs.existsSync(imagesPath + 'results/' + userID + '.jpg')) {
		console.log('File exists')
		res.send('Success!');
		return;
	} else {
		
		Jimp.read(imagesPath + randomNumber + ".jpg")
		.then(function (image) {
			loadedImage = image;
			return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
		})
		.then(function (font) {
			loadedImage.print(font, 10, 10, text)
					   .write(fileName);
			console.log('Generate image file ....', randomNumber)
			res.send('Success!');
		}).catch(function (err) {
			console.error(err);
		});
	}
});

module.exports = router;
