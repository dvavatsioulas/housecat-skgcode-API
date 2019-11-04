exports.dialogflow_post_requests = function(app, express, {WebhookClient}){

    app.post('/dialogflow', express.json(), (req,res)=> {
        
        console.log('')
        console.log('New Post : ')
        console.log('')

        let user_type=null
        const agent= new WebhookClient({request: req, response: res})

        const welcome_intent = require('./intents/welcome_intent.js')
        const fallback_intent = require('./intents/fallback_intent.js')
        const usertype_intent=require('./intents/usertype_intent.js')
        const locate_intent = require('./intents/locate_intent.js')
        const intents_parser = require('./functions/intents_parser.js')
        const initialize_parameters = require('./functions/initialize_parameters.js')
        const price_intent = require('./intents/price_intent.js')

        var init_params = initialize_parameters.initialize_parameters(); //Call jsFunction that initializes the parameters

        let intentMap = new Map()
        intentMap.set('Default Welcome Intent', welcome_intent.welcome)
        intentMap.set('Default Fallback Intent', fallback_intent.fallback)
        intentMap.set('User Type Intent', usertype_intent.usertype)
        intentMap.set('Locate Intent', locate_intent.locate)
        intentMap.set('define_building_type', locate_intent.locate);
        intentMap.set('Location and Price Declaration', price_intent.price);
        
        
        agent.handleRequest(intentMap)
        
        if (usertype_intent.user_type != null){
            user_type=usertype_intent.user_type
            console.log("We got the UserType: "+ user_type)
        }

        module.exports.user_type = user_type
        
        if(locate_intent.userLocation != null){
            init_params.location = locate_intent.userLocation
        }
        init_params.price = price_intent.price

        var final_params = intents_parser.intents_parser(init_params); //Console log the parameters
        //console.log("FINAL RESULT "+JSON.stringify(final_params))
    })
}