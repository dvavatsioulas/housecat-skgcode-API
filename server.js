const express = require('express');
var cors = require('cors');
const mysql = require('mysql');
const { WebhookClient, Card, Suggestion } = require('dialogflow-fulfillment'); //Required for Dialogflow
const bodyParser = require('body-parser');


var app = express();
var port = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//Managing post requests from DialogFlow
var dialogflow2 = require('./dialogflow/routes/dialogflowRoutes.js')
dialogflow2.dialogflow2_post_requests(app, express)
//var myminitest = require('./dialogflow/routes/dialogflowRoutes.js')(app)
var dialogflowapp = require('./dialogflow/manage_d_post_req.js')
dialogflowapp.dialogflow_post_requests(app, express, {WebhookClient, Card, Suggestion})


const pool = mysql.createPool({
    host: "***REMOVED***",
    port: 3306,
    user: "***REMOVED***",
    password: "***REMOVED***",
    database: "***REMOVED***"
});

app.get('/',(req,res) => {
    res.send('*ROOT ENDPOINT* API is up & working.');
});

app.get('/api',(req,res) => {
    res.send('API is up & working.');
});

// Returns the userType defined by the chatbot
app.get('/api/usertype',(req,res) => {
    res.send(dialogflow2.UserType)
});

//Insert new json item into DB
app.post('/api/properties/addproperty',(req,res) => {
    var body = req.body;
    
    if(body.img_url===null){
        body.img_url="https://iconsgalore.com/wp-content/uploads/2018/10/house-1-featured-2.png";
    }

    var tempValues = [body.price, body.sqm, body.location, body.bedrooms, body.bathrooms, body.property_type, body.floor, body.description, body.sale_type, body.phone, body.email, body.img_url, body.furnitured, body.heating_type, body.builtyear, body.parking];
    try {
        pool.query(`INSERT INTO properties (price,sqm,location,bedrooms,bathrooms,property_type,floor,description,sale_type,phone,email,img_url,furnitured,heating_type,built_year,parking) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`, tempValues, function (err) {
            if (!err) {
                res.send('Your house has been added successfully into DB!');
            }else{
                res.send("Oops, something went wrong. I'll let our back-end team know! ERROR CODE: 5.1"); //HOUSE NOT ADDED TO DB! SOMETHING IS WRONT ON THE JSON SENT!
            }
        });
    } catch (err) {
        res.send("Oops, something went wrong. I'll let our back-end team know! ERROR CODE: 5.2");
    }

})

//Returns the list of properties from the database
app.get('/api/properties', (req, res) => {

    try {
        pool.query("SELECT * FROM properties ORDER BY id;", function (err, result) {
            res.send(result);
        });
    } catch (err) {
        res.send("Oops, something went wrong. I'll let our back-end team know! ERROR CODE: 10");
    }

});


//Return the last 3 entered house
app.get('/api/properties/3properties',(req,res) => {

    try {
        pool.query("SELECT * FROM properties ORDER BY id DESC LIMIT 3;", function (err, result) {
            res.send(result);
        });
    } catch (err) {
        res.send("Oops, something went wrong. I'll let our back-end team know! ERROR CODE: 15");
    }

});

//Returns the property with this ID
app.get('/api/properties/id=:id', (req, res) => {

    try {
        pool.query(`SELECT * FROM properties WHERE id=${parseInt(req.params.id)}`, function (err, result) {
            if (isEmptyObject(result)) return res.status(204).send('There is no property with this id');
            res.send(result);
        });
    } catch (err) {
        res.send("Oops, something went wrong. I'll let our back-end team know! ERROR CODE: 20");
    }

});

//Returns properties with this sale_type. Used when user clicks on "Rent" or "Buy" button.
app.get('/api/properties/saletype=:saletype',(req,res) => {

    var tempSaleType;
    if(req.params.saletype==0){
        tempSaleType="Rent";
    }
    else{
        tempSaleType="Sale"
    }
    try {
        pool.query(`SELECT * FROM properties WHERE properties.sale_type=?`, tempSaleType, function (err, result) {
            var tempSaleType = req.params.saletype;
            if (isEmptyObject(result)) {
                if (tempSaleType === 0) {
                    return res.status(204).send('There are no properties for rent.');
                }
                else if (tempSaleType === 1) {
                    return res.status(204).send('There are no properties for sale.');
                }
                else {
                    return res.status(204).send('INVALID PARAMETER');
                }
            }
            res.send(result);
        });
    } catch (err) {
        res.send("Oops, something went wrong. I'll let our back-end team know! ERROR CODE: 25");
    }

});

//Search results according to JSON received (with filters)
app.post('/api/properties/search',(req,res) => {

    var  body = req.body; // Copy POSTed JSON to a variable

    // Build SQL query. Question marks are replaced with valuesFromJSON table
    var mySQLQuery1="SELECT * FROM properties WHERE (       (? IS NULL OR ?<=properties.price) AND (? IS NULL OR ?>=properties.price) AND  (? IS NULL OR ?<=properties.sqm) AND (? IS NULL OR ?>=properties.sqm)  AND (? IS NULL OR ?=properties.location) AND  (? IS NULL OR ?=properties.bedrooms) AND  (? IS NULL OR ?=properties.bathrooms) AND  (? IS NULL OR ?=properties.property_type)  ";
    var mySQLQuery2=" AND (? IS NULL OR ?=properties.floor)   AND  (? IS NULL OR ?=properties.sale_type)    AND  (? IS NULL OR ?=properties.furnitured) AND  (? IS NULL OR ?=properties.heating_type)    AND  (? IS NULL OR ?<=properties.built_year)  AND  (? IS NULL OR ?=properties.parking)       )";

    var finalSqlQuery=mySQLQuery1.concat(mySQLQuery2);
    console.log(finalSqlQuery);

    var valuesFromJSON = [];
    valuesFromJSON.push(body.minprice, body.minprice, body.maxprice, body.maxprice, body.minsqm, body.minsqm, body.maxsqm, body.maxsqm, body.location, body.location, body.bedrooms, body.bedrooms);
    valuesFromJSON.push(body.bathrooms, body.bathrooms, body.property_type, body.property_type, body.floor, body.floor, body.sale_type, body.sale_type, body.furnitured, body.furnitured, body.heating_type, body.heating_type);
    valuesFromJSON.push(body.minbuiltyear, body.minbuiltyear, body.parking, body.parking);

    try {
        pool.query(finalSqlQuery, valuesFromJSON, function (err, result) {
            if (isEmptyObject(result)) return res.status(204).send('There are no matches with these properties.');
            res.send(result);
        });
    } catch (err) {
        res.send("Oops, something went wrong. I'll let our back-end team know! ERROR CODE: 30");
    }

});

app.get('/api/agents/id=:id', (req, res) => {

    try {
        pool.query(`SELECT * FROM agents WHERE id=${parseInt(req.params.id)}`, function (err, result) {
            if (isEmptyObject(result)) return res.status(204).send('There is no agent with this id');
            res.send(result);
        });
    } catch (err) {
        res.send("Oops, something went wrong. I'll let our back-end team know! ERROR CODE: 35");
    }

});

//Function to check if json file is empty
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
};

app.listen(port,() => console.log(`Listening on port ${port}`)); 
