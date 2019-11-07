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

app.get('/api',(req,res) => {
    res.send('Hello people!!!');
});

// Returns the userType defined by the chatbot
app.get('/api/usertype',(req,res) => {
    if (dialogflowapp.user_type==='landlord'){
        res.send({userType: "Landlord"});
    }else if (dialogflowapp.user_type==='tenant'){
        res.send({userType: "Tenant"});
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
    con.query("SELECT id,price,sqm,location,bedrooms,bathrooms,floor,description,phone,email,img_url,furnitured,heating_type,built_year,parking,propertytypemapping.property_type_title,saletypemapping.sale_type_title FROM ((properties INNER JOIN propertytypemapping ON properties.property_type = propertytypemapping.property_type) INNER JOIN saletypemapping ON properties.sale_type = saletypemapping.sale_type);", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }); 
});



//Returns the property with this ID
app.get('/api/properties/:id',(req,res) => {
    con.query(`SELECT id,price,sqm,location,bedrooms,bathrooms,floor,description,phone,email,img_url,furnitured,heating_type,built_year,parking,propertytypemapping.property_type_title,saletypemapping.sale_type_title FROM ((properties INNER JOIN propertytypemapping ON properties.property_type = propertytypemapping.property_type) INNER JOIN saletypemapping ON properties.sale_type = saletypemapping.sale_type) WHERE id=${parseInt(req.params.id)}`, function (err, result, fields) {
        if (err) throw err;
        if(isEmptyObject(result)) return res.status(404).send('There is no property with this id');
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
