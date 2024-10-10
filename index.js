//Essential
var numberOfPlayers;
var playerNames = [];
var playerNumOfCards = [];
var selection = ["", "", "", ""]; // Plname, Person, Room, Weapon
var playerLists = [];
var players = {
    "john": [["Grün", "Pistole"], []]
}

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
        loadEverything();
    }
    submBtn.innerText = "Submit + Start";
    submBtn.classList.add("specBtn");
    document.getElementById("setupDiv").append(submBtn);
}

function loadEverything() {
    //Data extraction
    for (let index = 0; index < numberOfPlayers; index++) {
        playerNames.push(document.getElementById("namePl" + (index + 1).toString()).value);
        playerNumOfCards.push(parseInt(document.getElementById("cardsPl" + (index + 1).toString()).value));
    }
    for (let ind = 0; ind < playerNames.length; ind++) {
        const element = playerNames[ind];
        const nwBtn = document.createElement("div");
        nwBtn.classList.add("normBtn");
        nwBtn.innerText = element;
        nwBtn.classList.add("selName");
        nwBtn.onclick = function() {select_me(0, this, "selName")}
        document.getElementById("addMoveDiv").append(nwBtn);
    }
    document.getElementById("addMoveDiv").append(document.createElement("hr"))
    for (let abc = 0; abc < rooms.length; abc++) {
        const elm = rooms[abc];
        const nwBt = document.createElement("div");
        nwBt.onclick = function () {
            select_me(2, this, "selRoom");
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
        nwBt.onclick = function () {
            select_me(1, this, "selSus");
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
        nwBt.onclick = function () {
            select_me(3, this, "selWeap");
        }
        nwBt.classList.add("normBtn");
        nwBt.innerText = elm;
        nwBt.classList.add("selWeap");
        document.getElementById("addMoveDiv").append(nwBt);
    }
}
