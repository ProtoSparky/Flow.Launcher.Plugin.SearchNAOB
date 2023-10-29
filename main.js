//Do note that this plugin is unofficial. It is NOT made by naob.no

import open, {openApp, apps} from 'open';
//import open from "open";
import fs from "fs";
const BaseURL = "https://naob.no/søk/";
const CurrentReleaseMessage = "New icons, added settings for icon themes, and fixed the backend";


function ThemeLinkGen(){
    if(SettingsDataOP(0) == 0){
        //return dakrmode
        return "./assets/img/darkMode/";
    }
    else if(SettingsDataOP(0) == 1){
        //return lightmode
        return "./assets/img/lightMode/";

    }
}

const { method, parameters } = JSON.parse(process.argv[2])

if (method === "query") {
    if(parameters == "" || parameters == " "){
        //Change display if nothing is inputed
        console.log(JSON.stringify(
            {
                "result": [{
                    "Title": "Search NAOB.no",
                    "Subtitle": "Search naob.no" ,
                    "JsonRPCAction": {
                        "method": "OpenURL",
                        "parameters": [BaseURL]
                    },
                    "IcoPath": ThemeLinkGen() + "search2.png",
                    "score" : 0
                }]
            }
        ));
       
    }

    //found a bug in :about. for some reason, the score number has to be multiplied by 10 for priority of elements to work properly
    else if(parameters == ":about"){
        console.log(JSON.stringify(
            {"result": [{
                        "Title": "Plugin made with ❤ by ProtoSparky",
                        "Subtitle": "Hope you like it!",
                        "JsonRPCAction": {
                            "method": "OpenURL",
                            "parameters": ["https://github.com/ProtoSparky/"]
                        },
                        "IcoPath": ThemeLinkGen() + "creator.png",
                        "score" : 30
                    },
                    {
                        "Title": "Plugin repo",
                        "Subtitle": "https://github.com/ProtoSparky/Flow.Launcher.Plugin.SearchNAOB",
                        "JsonRPCAction": {
                            "method": "OpenURL",
                            "parameters": ["https://github.com/ProtoSparky/Flow.Launcher.Plugin.SearchNAOB"]
                        },
                        "IcoPath": ThemeLinkGen() + "github.png",
                        "score" : 20
                    },
                    {
                        "Title": "Current plugin version " + getVersionNumber(),
                        "Subtitle": CurrentReleaseMessage,
                        "IcoPath": ThemeLinkGen() + "/ver.png",
                        "score" : 10
                    },


                ],
            }
        ));
    }    


    
    //Im sorry to whoever reads this. It's pretty messy, and probably buggy. Hope i can fix it sometime
    //
    //

    else if(parameters == ":settings"){
        console.log(JSON.stringify(
            {
                "result": [
                    {
                        "Title": "Set icon theme",
                        "Subtitle": ":settings + t0 or t1 | t0 = Darkmode t1 = Lightmode",
                        "IcoPath": ThemeLinkGen() + "/theme.png",
                        "score" : 1
                    },
                    {
                        "Title": "these settings will be reset by updates",
                        "Subtitle": "setting will be reset by updates, as settings.json will be overwritten",
                        "IcoPath": ThemeLinkGen() + "/alert.png",
                        "score" : 0
                    },
                ],
            }
        ));
    }

    else if(parameters == ":settings t0"){
        console.log(JSON.stringify(
            {
                "result": [{
                        "Title": "Set icon theme as Darkmode",
                        "Subtitle": "t0 = Darkmode | t1 = Lightmode",
                        "IcoPath": ThemeLinkGen() + "/theme.png",
                        "score" : 0,
                        "JsonRPCAction": {
                            "method": "ChangeSettings",
                            "parameters": ["0"]
                        },
                    },
                ],
            }
        ));
    }
    else if(parameters == ":settings t1"){
        console.log(JSON.stringify(
            {
                "result": [{
                        "Title": "Set icon theme Lightmode",
                        "Subtitle": "t0 = Darkmode | t1 = Lightmode",
                        "IcoPath": ThemeLinkGen() + "/theme.png",
                        "score" : 0,
                        "JsonRPCAction": {
                            "method": "ChangeSettings",
                            "parameters": ["1"]
                        },
                    },
                ],
            }
        ));
    }
    //Im sorry
    //
    //
    

    else if(parameters == ":?"){
        console.log(JSON.stringify(
            {
                "result": [{
                        "Title": "Naob",
                        "Subtitle": "opens naob.no",
                        "IcoPath": "./assets/img/app.png",
                        "score" : 50
                    },
                    {
                        "Title": "Naob + your text",
                        "Subtitle": "searches naob.no with your text",
                        "IcoPath": "./assets/img/app.png",
                        "score" : 40
                    },
                    {
                        "Title": "Naob :settings",
                        "Subtitle": "Allows you to change this plugin's settings",
                        "IcoPath": "./assets/img/app.png",
                        "score" : 30 //i have no idea what causes this weird bug
                    },                    
                    {
                        "Title": "Naob :about",
                        "Subtitle": "opens the naob plugin's about menu",
                        "IcoPath": "./assets/img/app.png",
                        "score" : 10
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
                    "IcoPath": ThemeLinkGen() + "search2.png",
                    "score" : 0
                }]
            }
        ));

    }

} 

if (method === "OpenURL") {
    const url = parameters[0];
    open(url);
}

else if(method === "ChangeSettings"){
    const text = parameters;
    if(text == "0"){
        //Set darkmode on icons
        SettingsDataOP(1, 0);
    }
    else if(text == "1"){
        //set light mode on icons
        SettingsDataOP(1, 1);
    }
}

function getVersionNumber() {
    const pluginJsonContent = fs.readFileSync('plugin.json', 'utf8');
    const pluginData = JSON.parse(pluginJsonContent);
    const version = pluginData.Version;
    return version;
}

function SettingsDataOP(op, data){
    //op 0 read
    //op 1 write
    //data write or read data

    if(op == 0){
        //read
        const pluginJsonContent = fs.readFileSync('settings.json', 'utf8');
        const pluginData = JSON.parse(pluginJsonContent);
        const keyData = pluginData.Theme;
        return keyData;
    }
    else if(op == 1){
        //write
        const pluginJsonContent = fs.readFileSync('settings.json', 'utf8');
        const pluginData = JSON.parse(pluginJsonContent);
        // Update the "Theme" key in the object
        pluginData.Theme = data;
        // Convert the updated object back to JSON
        const updatedJsonContent = JSON.stringify(pluginData, null, 2);
        // Write the updated JSON data back to the file
        fs.writeFileSync('settings.json', updatedJsonContent, 'utf8');
    }
}

