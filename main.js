//Do note that this plugin is unofficial. It is NOT made by naob.no
import open, {openApp, apps} from 'open';
const BaseURL = "https://naob.no/søk/";


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
                        "method": "OpenURL",
                        "parameters": [BaseURL]
                    },
                    "IcoPath": "./assets/img/app.png",
                    "score" : 0
                }]
            }
        ));
       
    }
    else if(parameters == ":about"){
        console.log(JSON.stringify(
            {
                "result": [{
                    "Title": "Plugin made with ❤ by ProtoSparky",
                    "Subtitle": "Hope you like it!",
                    "JsonRPCAction": {
                        "method": "OpenURL",
                        "parameters": ["https://github.com/ProtoSparky/"]
                    },
                    "IcoPath": "./assets/img/app.png",
                    "score" : 2
                },
                {
                    "Title": "Plugin repo",
                    "Subtitle": "https://github.com/ProtoSparky/Flow.Launcher.Plugin.SearchNAOB",
                    "JsonRPCAction": {
                        "method": "OpenURL",
                        "parameters": ["https://github.com/ProtoSparky/Flow.Launcher.Plugin.SearchNAOB"]
                    },
                    "IcoPath": "./assets/img/app.png",
                    "score" : 1
                },
                {
                    "Title": "Current version : 0.06",
                    "Subtitle": "It's finally working!",
                    "JsonRPCAction": {
                        "method": "OpenURL",
                        "parameters": [""]
                    },
                    "IcoPath": "./assets/img/app.png",
                    "score" : 0
                },
                ],
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
                        "method": "OpenURL",
                        "parameters": [CurrentURL]
                    },
                    "IcoPath": "./assets/img/app.png",
                    "score" : 0
                }]
            }
        ));

    }

} 

if (method === "OpenURL") {
    const url = parameters[0]
    //do_something_for_query(url)
    open(url)
}



/* Needs work
function getVersionNumber() {
    
    const fse = require('fs-extra')

    // Read the JSON file
    const jsonData = JSON.parse(fse.readFileSync('plugin.json', 'utf8'));    
    return jsonData.Version; 
}
*/