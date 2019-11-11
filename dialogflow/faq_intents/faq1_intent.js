exports.faq1 = function(agent){
    var response = ('It is pretty easy actually. Eather you can go and click to our ADD button on the left side of our navigation bar or I can redirect you to the page. Would you like me to do that?')
    console.log('Garfield: '+response)
    agent.add(response)
}
