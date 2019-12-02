const express = require('express');
var cors = require('cors');
const mysql = require('mysql');
//Required of Dialogflow
const { WebhookClient, Card, Suggestion } = require('dialogflow-fulfillment');
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


var con = mysql.createConnection({
    host: "***REMOVED***",
    port: 3306,
    user: "***REMOVED***",
    password: "***REMOVED***",
    database: "***REMOVED***"
});

con.connect(function(err){
    if(err) throw err;
    console.log("Connected to DB");
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
    /*if (dialogflowapp.user_type==='landlord'){
        res.send({userType: "Landlord"});
    }else if (dialogflowapp.user_type==='renter'){
        res.send({userType: "Renter"});
    }
    else{
        res.send({userType: "UNKNOWN"});
    }
    */
});

//Insert new json item into DB
app.post('/api/properties/addproperty',(req,res) => {
    var body = req.body;
    
    if(body.img_url===null){
        body.img_url="https://iconsgalore.com/wp-content/uploads/2018/10/house-1-featured-2.png";
    }

    var tempValues=[body.price,body.sqm,body.location,body.bedrooms,body.bathrooms,body.property_type,body.floor,body.description,body.sale_type,body.phone,body.email,body.img_url,body.furnitured,body.heating_type,body.builtyear,body.parking];
    
    con.query(`INSERT INTO properties (price,sqm,location,bedrooms,bathrooms,property_type,floor,description,sale_type,phone,email,img_url,furnitured,heating_type,built_year,parking) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,tempValues , function (err, result, fields){
        if(err) throw err;
        res.send("Your house has been added successfully into DB!");
    });
})

//Returns the list of properties from the database
app.get('/api/properties',(req,res) => {
    con.query("SELECT * FROM properties ORDER BY id;", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }); 
});


//Return the last 3 entered house
app.get('/api/properties/3properties',(req,res) => {

    var finalSqlQuery="SELECT * FROM properties ORDER BY id DESC LIMIT 3;"

    con.query(finalSqlQuery, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }); 
});

//Returns the property with this ID
app.get('/api/properties/id=:id',(req,res) => {
    con.query(`SELECT * FROM properties WHERE id=${parseInt(req.params.id)}`, function (err, result, fields) {
        if (err) throw err;
        if(isEmptyObject(result)) return res.status(204).send('There is no property with this id');
        res.send(result);
    });
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
    con.query(`SELECT * FROM properties WHERE properties.sale_type=?`, tempSaleType, function (err, result, fields) {
        var tempSaleType=req.params.saletype;
        if (err) throw err;
        if(isEmptyObject(result)){
            if(tempSaleType===0){
                return res.status(204).send('There are no properties for rent.');
            }
            else if (tempSaleType===1){
                return res.status(204).send('There are no properties for sale.');
            }
            else{
                return res.status(204).send('INVALID PARAMETER');
            }
        }
        res.send(result);
    });
});

//Search results according to JSON received (with filters)
app.post('/api/properties/search',(req,res) => {

    var  body = req.body; // Copy POSTed JSON to a variable

    // Build SQL query. Question marks are replaced with valuesFromJSON table
    var mySQLQuery1="SELECT * FROM properties WHERE (       (? IS NULL OR ?<=properties.price) AND (? IS NULL OR ?>=properties.price) AND  (? IS NULL OR ?<=properties.sqm) AND (? IS NULL OR ?>=properties.sqm)  AND (? IS NULL OR ?=properties.location) AND  (? IS NULL OR ?=properties.bedrooms) AND  (? IS NULL OR ?=properties.bathrooms) AND  (? IS NULL OR ?=properties.property_type)  ";
    var mySQLQuery2=" AND (? IS NULL OR ?=properties.floor)   AND  (? IS NULL OR ?=properties.sale_type)    AND  (? IS NULL OR ?=properties.furnitured) AND  (? IS NULL OR ?=properties.heating_type)    AND  (? IS NULL OR ?<=properties.built_year)  AND  (? IS NULL OR ?=properties.parking)       )";

    var finalSqlQuery=mySQLQuery1.concat(mySQLQuery2);
    console.log(finalSqlQuery);

    var valuesFromJSON=[];
    valuesFromJSON.push(body.minprice, body.minprice, body.maxprice, body.maxprice, body.minsqm, body.minsqm, body.maxsqm, body.maxsqm, body.location, body.location, body.bedrooms, body.bedrooms);
    valuesFromJSON.push(body.bathrooms, body.bathrooms, body.property_type, body.property_type, body.floor, body.floor, body.sale_type, body.sale_type, body.furnitured, body.furnitured, body.heating_type, body.heating_type);
    valuesFromJSON.push(body.minbuiltyear, body.minbuiltyear, body.parking, body.parking);
    con.query(finalSqlQuery,valuesFromJSON,function (err, result, fields) {
        if (err) throw err;
            if(isEmptyObject(result)) return res.status(204).send('There are no matches with these properties.');
            res.send(result);
        });
});

app.get('/api/agents/id=:id',(req,res) => {
    con.query(`SELECT * FROM agents WHERE id=${parseInt(req.params.id)}`, function (err, result, fields) {
        if (err) throw err;
        if(isEmptyObject(result)) return res.status(204).send('There is no agent with this id');
        res.send(result);
    });
});

//Function to check if json file is empty
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
};

// This is necessary in case that PORT has value from the system which is not 8000

app.listen(port,() => console.log(`Listening on port ${port}`)); 
