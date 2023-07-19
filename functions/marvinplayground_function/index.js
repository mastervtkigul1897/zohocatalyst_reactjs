"use strict"

const express = require('express');
const cors = require('cors');
const catalyst = require('zcatalyst-sdk-node');

const app = express();
app.use(express.json());
app.use(cors());

app.post("/cache", (req, res) => {

    const catalystApp = catalyst.initialize(req);

	const requestQuery = req.query;

	//Get Segment instance with segment ID (If no ID is given, Default segment is used)
	let segment = catalystApp.cache().segment();
	//Insert Cache using put by passing the key-value pair.
	let cachePromise = segment.put(requestQuery.name, requestQuery.value, requestQuery.expiry);

	cachePromise
		.then((cache) => {
			res.status(200).json(cache);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});

});

app.post("/datastore", (req, res) => {

    let catalystApp = catalyst.initialize(req, {type: catalyst.type.applogic});

	const requestBody = req.body;

	//Get table meta object without details.
	let table = catalystApp.datastore().table('SampleTable');

	//Use Table Meta Object to insert the row which returns a promise
	let insertPromise = table.insertRow({
		Name: requestBody.Name,
		Age: requestBody.Age,
		SearchIndexedColumn: requestBody.id
	});

	insertPromise
		.then((row) => {
			res.status(200).json(row);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
});

app.put("/datastore/:any", (req, res) => {

    let catalystApp = catalyst.initialize(req, {type: catalyst.type.applogic});

	const requestBody = req.body;

	//Get table meta object without details.
	let table = catalystApp.datastore().table('SampleTable');

	//Use Table Meta Object to insert the row which returns a promise
	const rowId = req.params.any;
	let updatePromise = table.updateRow({
		Name: requestBody.Name,
		Age: requestBody.Age,
		ROWID: `${rowId}`
	});

	updatePromise
		.then((row) => {
			res.status(200).json(row);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
});

app.delete("/datastore/:any", (req, res) => {

    let catalystApp = catalyst.initialize(req, {type: catalyst.type.applogic});

	const requestBody = req.body;

	//Get table meta object without details.
	let table = catalystApp.datastore().table('SampleTable');

	const rowId = req.params.any;
	//Use Table Meta Object to insert the row which returns a promise
	let updatePromise = table.deleteRow(`${rowId}`)

	updatePromise
		.then((row) => {
			res.status(200).json(row);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
});

app.get("/datastore/:rowId", (req, res) => {

    let catalystApp = catalyst.initialize(req, {type: catalyst.type.applogic});

	const requestBody = req.body;

	//Get table meta object without details.
	let table = catalystApp.datastore().table('SampleTable');

	//Use Table Meta Object to insert the row which returns a promise
	const rowId = req.params.rowId;
	let updatePromise = table.getRow(`${rowId}`)

	updatePromise
		.then((row) => {
			res.status(200).json(row);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
});

app.get("/getall", (req,res) => {

	let catalystApp = catalyst.initialize(req, {type: catalyst.type.applogic});

	const requestBody = req.body;

	//Get table meta object without details.
	let table = catalystApp.datastore().table('SampleTable');

	//Use Table Meta Object to insert the row which returns a promise
	let updatePromise = table.getAllRows()

	updatePromise
		.then((row) => {
			res.status(200).json(row);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});

});

app.all("/", (req,res) => {

	let catalystApp = catalyst.initialize(req, {type: catalyst.type.applogic});

	const requestBody = req.body;

	//Get table meta object without details.
	let table = catalystApp.datastore().table('SampleTable');

	//Use Table Meta Object to insert the row which returns a promise
	let updatePromise = table.getAllRows()

	updatePromise
		.then((row) => {
			res.status(200).json(row);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});

});

module.exports = app;
