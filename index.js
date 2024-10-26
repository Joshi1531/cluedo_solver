//Essential
var numberOfPlayers;
var playerNames = [];
var playerNumOfCards = [];
var selection = ["", "", "", "", ""]; // Plname, Person, Room, Weapon, Respondant
var playerLists = [];
var gameLog = [] //Liste mit mehreren selections
var playerPossibles = {
    //"john": [["Grün", "Pistole"], []] //Spieler muss mind. einen von den Gegenständen in Klammer haben 
}
var playerShures = {}

//Game Data
const rooms = ["Halle","Salon","Speisezimmer","Küche","Musikzimmer","Winterzimmer","Billiardzimmer","Bibliothek","Arbeitszimmer"]
const weapons = ["Dolch","Leuchter","Pistole","Seil","Heizungsrohr","Rohrzange"]
const suspects = ["Oberst von Gatow","Prof. Bloom","Reverend Grün","Baronin von Porz","Fräulein Gloria","Frau Weiss"]

function select_me(type, elem, className) {
    const otherLst = document.getElementsByClassName(className);
    for (let index = 0; index < otherLst.length; index++) {
        const element = otherLst[index];
        if(element.classList.contains("selected")) {
            element.classList.remove("selected");
            break
        }
    }
    elem.classList.add("selected")
    selection[parseInt(type)] = elem.innerText;
    document.getElementById("cardProbsDiv").innerText = selection.toString();
}

function select_card(elem) {
    if(elem.classList.contains("selected")) {
        elem.classList.remove("selected");
        delete playerShures[playerNames[0]][playerShures[playerNames[0]].indexOf(elem.innerText)]
    }
    else {
        elem.classList.add("selected")
        playerShures[playerNames[0]].push(elem.innerText)
    }
    console.log(playerShures);
}

function load_player_inps(num) {
    numberOfPlayers = parseInt(num);
    //for (let index = 0; index < document.getElementsByClassName("plInp").length; index++) {
        //const element = document.getElementsByClassName("plInp")[index];
        //document.removeChild(element);
    //}
    for (let index = 1; index < parseInt(num) + 1; index++) {
        var centerDiv = document.createElement("div");
        centerDiv.classList.add("centerDiv")
        centerDiv.id = "pl" + index.toString() + "wrap"
        document.getElementById("setupDiv").append(centerDiv);
        var newElem = document.createElement("input");
        newElem.type = "text";
        newElem.classList.add("plInp");
        newElem.id = "namePl" + index.toString();
        newElem.placeholder = "Player " + index.toString() + " Name";
        centerDiv.append(newElem);
        var nwElem = document.createElement("input");
        nwElem.type = "number";
        nwElem.id = "cardsPl" + index.toString();
        nwElem.classList.add("plCardInp");
        nwElem.placeholder = "Cards";
        centerDiv.append(nwElem);
    }
    document.getElementById("namePl1").value = "You";
    //Submit Button
    const submBtn = document.createElement("button")
    submBtn.onclick = function () {
        loadEverything(0);
    }
    submBtn.innerText = "Submit + Start";
    submBtn.classList.add("specBtn");
    document.getElementById("setupDiv").append(submBtn);
}

function loadEverything(time) {
    //Data extraction
    for (let index = 0; index < numberOfPlayers; index++) {
        playerNames.push(document.getElementById("namePl" + (index + 1).toString()).value);
        playerNumOfCards.push(parseInt(document.getElementById("cardsPl" + (index + 1).toString()).value));
        if(time == 0) {
            playerShures[playerNames[index]] = [];
            playerPossibles[playerNames[index]] = [];
        }
    }
    document.getElementById("setupDiv").style.display = "none";
    if(time == 1) {
        for (let ind = 0; ind < playerNames.length; ind++) {
            const element = playerNames[ind];
            const nwBtn = document.createElement("div");
            nwBtn.classList.add("normBtn");
            nwBtn.innerText = element;
            nwBtn.classList.add("selName");
            nwBtn.onclick = function() {select_me(0, this, "selName")}
            document.getElementById("addMoveDiv").append(nwBtn);
        }
    }
    document.getElementById("addMoveDiv").append(document.createElement("hr"))
    for (let abc = 0; abc < rooms.length; abc++) {
        const elm = rooms[abc];
        const nwBt = document.createElement("div");
        if(time == 0) {
            nwBt.onclick = function () {
                select_card(this);
            }
        }
        else {
            nwBt.onclick = function () {
                select_me(2, this, "selRoom");
            }
        }
        nwBt.classList.add("normBtn");
        nwBt.innerText = elm;
        nwBt.classList.add("selRoom");
        document.getElementById("addMoveDiv").append(nwBt);
    }
    document.getElementById("addMoveDiv").append(document.createElement("hr"))
    for (let abc = 0; abc < suspects.length; abc++) {
        const elm = suspects[abc];
        const nwBt = document.createElement("div");
        if(time == 0) {
            nwBt.onclick = function () {
                select_card(this);
            }
        }
        else {
            nwBt.onclick = function () {
                select_me(1, this, "selSus");
            }
        }
        nwBt.classList.add("normBtn");
        nwBt.innerText = elm;
        nwBt.classList.add("selSus");
        document.getElementById("addMoveDiv").append(nwBt);
    }
    document.getElementById("addMoveDiv").append(document.createElement("hr"))
    for (let abc = 0; abc < weapons.length; abc++) {
        const elm = weapons[abc];
        const nwBt = document.createElement("div");
        if(time == 0) {
            nwBt.onclick = function () {
                select_card(this);
            }
        }
        else {
            nwBt.onclick = function () {
                select_me(3, this, "selWeap");
            }
        }
        nwBt.classList.add("normBtn");
        nwBt.innerText = elm;
        nwBt.classList.add("selWeap");
        document.getElementById("addMoveDiv").append(nwBt);
    }
    document.getElementById("addMoveDiv").append(document.createElement("hr"))
    if(time == 1) {
        for (let ind = 0; ind < playerNames.length; ind++) {
            const element = playerNames[ind];
            const nwBtn = document.createElement("div");
            nwBtn.classList.add("normBtn");
            nwBtn.innerText = element;
            nwBtn.classList.add("selResp");
            nwBtn.onclick = function() {select_me(4, this, "selResp")}
            document.getElementById("addMoveDiv").append(nwBtn);
        }
        const nwBtn = document.createElement("div");
        nwBtn.classList.add("normBtn");
        nwBtn.innerText = "Nobody responded";
        nwBtn.classList.add("selResp");
        nwBtn.onclick = function() {select_me(4, this, "selResp")}
        document.getElementById("addMoveDiv").append(nwBtn);
    }
    //Submit Button
    const submBtn = document.createElement("button")
    if(time == 0) {
        submBtn.onclick = function () {
            document.getElementById("addMoveDiv").innerHTML = "";
            loadEverything(1)
        }
    }
    else {
        submBtn.onclick = function () {
            log_results();
            const selLst = document.getElementsByClassName("selected");
            while(selLst.length > 0){
                selLst[0].classList.remove('selected');
            }            
        }
    }
    submBtn.innerText = "Submit";
    submBtn.classList.add("specBtn");
    document.getElementById("addMoveDiv").append(submBtn);
    if(time == 0) {
        document.getElementById("mainHead").innerText = "Select your Cards"
    }
    else {
        document.getElementById("mainHead").innerText = "Joshis Cluedo Solver"
    }
}

function log_results() {
    gameLog.push(selection);
    analyze_game(gameLog)
}

function analyze_game(someGameLog) {
    for (let imgb = 0; imgb < someGameLog.length; imgb++) {
        const sel = someGameLog[imgb];
        var respPossArr = []
        // Main Loop through Log
        for (let i = 1; i < sel.length - 1; i++) {
            //If this player may have the card, add it to possibles
            var foundShure = false;
            console.log("Checking Card " + sel[i])
            for (let ms = 0; ms < playerNames.length; ms++) {
                const element = playerNames[ms];
                if(playerShures[element].indexOf(sel[i]) != -1) {
                    //Some Player has the possible Card. Continue
                    foundShure = true;
                    console.log("Someone has the Card " + sel[i] + ".")
                    break
                }
            }
            if(foundShure == false) {
                //Respondant may have the card. Add it to temp Array.
                respPossArr.push(sel[i])
                console.log(respPossArr)
            }
        }
        if(respPossArr.length != 0) {
            //Add the array of possibles to the Respondant.
            playerPossibles[sel[4]].push(respPossArr)
        }
    }
    console.log(playerShures)
    console.log(playerPossibles)
}