const express = require('express');
var cors = require('cors');
const mysql = require('mysql');
const { WebhookClient } = require('dialogflow-fulfillment');

const app = express();

app.use(cors());

//This is necessary for method post
app.use(express.json());

//Managing post requests from DialogFlow
const dialogflowapp = require('./dialogflow/manage_d_post_req.js')
dialogflowapp.dialogflow_post_requests(app, express, {WebhookClient})


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
    res.send('*ROOT* API is up & working.');
});

app.get('/api',(req,res) => {
    res.send('API is up & working.');
});

// Returns the userType defined by the chatbot
app.get('/api/usertype',(req,res) => {
    if (dialogflowapp.user_type==='landlord'){
        res.send({userType: "Landlord"});
    }else if (dialogflowapp.user_type==='renter'){
        res.send({userType: "Renter"});
    }
    else{
        res.send({userType: "UNKNOWN"});
    }
});

//Create new item and add it in DB
//i should fix the null situation 
//and if check if this house is duplicate
app.post('/api/addproperty',(req,res) => {
    var property = req.body;
    con.query(`INSERT INTO properties (price,sqm,location,bedrooms,bathrooms,property_type,floor,description,sale_type,phone,email,img_url,furnitured,heating_type,built_year,parking)
    VALUES (${property.price},${property.sqm},'${property.location}',${property.bedrooms},${property.bathrooms},${property.property_type},${property.floor},'${property.description}',${property.sale_type},'${property.phone}','${property.email}','${property.img_url}',${property.furnitured},'${property.heating_type}',${property.built_year},${property.parking})`, function (err, result, fields){
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


//Returns the property with this ID
app.get('/api/properties/id=:id',(req,res) => {
    con.query(`SELECT * FROM properties WHERE id=${parseInt(req.params.id)}`, function (err, result, fields) {
        if (err) throw err;
        if(isEmptyObject(result)) return res.status(404).send('There is no property with this id');
        res.send(result);
    });
});

//Returns properties with this sale_type. Used when user clicks on "Rent" or "Buy" button.
app.get('/api/properties/saletype=:saletype',(req,res) => {
    con.query(`SELECT * FROM properties WHERE sale_type=${parseInt(req.params.saletype)}`, function (err, result, fields) {
        var tempSaleType=req.params.saletype;
        if (err) throw err;
        if(isEmptyObject(result)){
            if(tempSaleType===0){
                return res.status(404).send('There are no properties for rent.');
            }
            else if (tempSaleType===1){
                return res.status(404).send('There are no properties for sell.');
            }
            else{
                return res.status(404).send('INVALID PARAMETER');
            }
        }
        res.send(result);
    });
});

app.get('/api/properties/id=:id',(req,res) => {
    con.query(`SELECT * FROM properties WHERE id=${parseInt(req.params.id)}`, function (err, result, fields) {
        if (err) throw err;
        if(isEmptyObject(result)) return res.status(404).send('There is no property with this id');
        res.send(result);
    });
});


//Search results according to JSON values
//TODO: Add all filters in WHERE clause
// con.query(`SELECT * FROM properties WHERE price=${searchValues.price} AND sqm=searchValues.sqm AND location=searchValues.location AND bedrooms=searchValues.bedrooms AND bathrooms=searchValues.bathrooms AND property_type=searchValues.property_type AND floor=searchValues.floor AND sale_type=searchValues.sale_type AND furnitured=searchValues.furnitured AND heating_type=searchValues.heating_type AND parking=searchValues.parking `, function (err, result, fields) {

app.post('/api/properties/search',(req,res) => {
    var  searchValues = req.body;
    console.log(searchValues.price);
    
    con.query(`SELECT * FROM properties WHERE price=${searchValues.price}`, function (err, result, fields) {
        if (err) throw err;
        if(isEmptyObject(result)) return res.status(404).send('There are no matches with these properties.');
        res.send(result);
    });
    
});


//Function to check if json file is empty
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
};

// This is necessary in case that PORT has value from the system which is not 8000
const port = process.env.PORT || 8000;
app.listen(port,() => console.log(`Listening on port ${port}`)); 
