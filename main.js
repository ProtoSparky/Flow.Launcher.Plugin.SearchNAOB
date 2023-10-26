const open = require('./node_modules/open')
//Do note that this plugin is unofficial. It is NOT made by naob.no
BaseURL = "https://naob.no/søk/";
//const open = import('./lib/open-9.1.0/index.js');

const { method, parameters } = JSON.parse(process.argv[2])

if (method === "query") {
    if(parameters == "" || parameters == " "){
        //Change display if nothing is inputed
        console.log(JSON.stringify(
            {
                "result": [{
                    "Title": "Search NAOB.no",
                    "Subtitle": "Search naob.no",
                    "JsonRPCAction": {
                        "method": "do_something_for_query",
                        "parameters": ["https://github.com/Flow-Launcher/Flow.Launcher"]
                    },
                    "IcoPath": "app.png",
                    "score" : 0
                }]
            }
        ));
    }
    else{
        //Show normal search
        const CurrentURL = BaseURL + parameters
        console.log(JSON.stringify(
            {
                "result": [{
                    "Title": "Search "+ parameters,
                    "Subtitle":CurrentURL ,
                    "JsonRPCAction": {
                        "method": "do_something_for_query",
                        "parameters": ["https://github.com/Flow-Launcher/Flow.Launcher"]
                    },
                    "IcoPath": "app.png",
                    "score" : 0
                }]
            }
        ));

    }

} 

if (method === "do_something_for_query") {
    url = parameters[0]
    do_something_for_query(url)
    //open(url)
}

function do_something_for_query(url) {
    open(url);
}