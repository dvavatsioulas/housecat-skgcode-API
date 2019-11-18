if (process.env.NODE_ENV==='production'){
    module.exports=require('./prod.js');
	console.log("env: production");
}else{
    module.exports = require('./dev.js')
	console.log("env: development");
}