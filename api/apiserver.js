var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express({ defaultErrorHandler: false });
var bodyParser = require('body-parser');
var najax = require('najax');

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json());

// To handle CORS requests
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();

});

// This api uses convential routing (does not map to HTTP verbs). The only advantage is being able to add more helper methods without having to have a separate controller. 
// The ideal naming pattern for HTTP verb mapping is prefixing the methods with GET, POST, PUT, UPDATE. Conventional routing can use this too, but not essential. 

var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/stocks", function (err, db) {
	if (err) { return console.dir(err); }

	app.post("/auth", function (req, res) {
		// Simple auth
		let email = req.body.login;
		let pass = req.body.pass;
		let users = db.collection('users', function (err, collection) { });
		users.findOne({ email: email, pass: pass }, function (err, item) {
			if (err) {
				// Could pass back to user 
				console.log(error);
			} else {
				if (item != null) {
					res.json(item._id)
				} else {
					res.json('fail');
				}
			}
		});
	})

	app.get("/stocksearch/:searchQuery/:userID", function (req, res) {
		const q = req.params.searchQuery;
		const userID = req.params.userID;
		najax({
			url: `https://marketdata.websol.barchart.com/getQuote.json?apikey=ae61c90a765903d35491fb53b959b14f&symbols=${q}`,
			type: 'GET',
			dataType: "json",
			crossDomain: true,
			async: true,
			success: function (response) {
				let stockModel = {};
				let stockModelList = [];
				let items = response.results;
				// Downsize the response model and allow for any filtering or data manipulation before returning to client
				if (items) {
					for (const item of items) {
						stockModel = {};
						stockModel.symbol = item.symbol;
						stockModel.name = item.name;
						stockModel.high = item.high;
						stockModel.low = item.low;
						stockModel.open = item.open;
						stockModel.lastPrice = item.lastPrice;
						stockModel.percentChange = item.percentChange;
						stockSymbol = item.symbol.toLowerCase();
						stockModelList.push(stockModel);
					}
				}
				res.json(stockModelList);
			},
			error: function (response) {
				console.log(response);
			}
		})
	})

	app.get("/getstockfavorite/:userID/:stockSymbol", function (req, res) {
		const userID = req.params.userID;
		const stockSymbol = req.params.stockSymbol;
		let favorites = db.collection('favorites', function (err, collection) { });
		favorites.findOne({ userID: userID, stockSymbol: stockSymbol  }, function (err, item) {
			if (err) {
				console.log(error);
			} else {
				if (item != null) {
					res.json(item);
				} else {
					res.json('fail');
				}
			}
		})
	})	
	
	app.post("/addstockfavorite", function (req, res) {
		let item = req.body;
		db.collection("favorites").insertOne(item, function (err, res) {
			if (err) {
				console.log(err);
			} else {
				console.log("1 favorite record inserted");
			}
		})
	})

	app.post("/editstockfavorite", function (req, res) {
		let item = req.body;
		db.collection("favorites").update({ stockSymbol: req.body.stockSymbol, userID: req.body.userID }, { $set: { comment: req.body.comment } }, function (err, res) {
			if (err) {
				console.log(err);
			} else {
				console.log("1 favorite record updated");
			}
		})
	})


	app.post("/removestockfavorite", function (req, res) {
		let item = req.body;
		db.collection("favorites").remove({ stockSymbol: req.body.stockSymbol, userID: req.body.userID }, function (err, res) {
			if (err) {
				console.log(err);
			} else {
				console.log("1 favorite record removed");
			}
		})
	})	

	app.get("/stocklistfavorites/:userID", function (req, res) {
		const userID = req.params.userID;
		db.collection('favorites').find({ userID: userID }).toArray((err, items) => {
			if (err) {
				console.log(error);
			} else {
				if (items != null) {
					res.json(items);
				} else {
					res.json('fail');
				}
			}
		})
	})

	app.listen(3002, function () {

	});

})

