//Essential
var numberOfPlayers;
var playerNames = [];
var playerNumOfCards = [];
var selection = ["", "", "", ""]; // Plname, Person, Room, Weapon
var playerLists = [];
var players = {
    "john": [["Grün", "Pistole"], []]
}
function select_me(type, elem) {
    document.getElementById("cardProbsDiv").innerText = elem.innerText;
    for (let index = 0; index < document.getElementsByClassName("selected").length; index++) {
        const element = document.getElementsByClassName("selected")[index];
        element.classList.remove("selected");
    }
    elem.classList.add("selected")
    selection[parseInt(type)] = elem.innerText;
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
        newElem.id = "namePl" + index.toString();
        newElem.classList.add("plInp");
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
        nwBtn.onclick = function() {select_me(0, this)}
        document.getElementById("addMoveDiv").append(nwBtn);
    }
    document.append(document.createElement("hr"))
}
