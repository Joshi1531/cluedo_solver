//Essential
var numberOfPlayers;
var playerNames = [];
var playerLists = [];
var players = {
    "john": [["Grün", "Pistole"], []]
}
function select_person(name) {

}

function load_player_inps(num) {
    numberOfPlayers = parseInt(num);
    //for (let index = 0; index < document.getElementsByClassName("plInp").length; index++) {
        //const element = document.getElementsByClassName("plInp")[index];
        //document.removeChild(element);
    //}
    document.body.style.backgroundColor = "blue";
    for (let index = 1; index < parseInt(num) + 1; index++) {
        document.body.style.backgroundColor = "green";
        var centerDiv = document.createElement("div");
        centerDiv.classList.add("centerDiv")
        centerDiv.id = "pl" + index.toString() + "wrap"
        document.body.style.backgroundColor = "yellow";
        document.getElementById("setupDiv").append(centerDiv);
        document.body.style.backgroundColor = "gray";
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
    document.body.style.backgroundColor = "red";
    document.getElementById("namePl1").value = "You";
    //Submit Button
    const submBtn = document.createElement("button")
    submBtn.onclick = function () {
        loadEverything();
    }
    submBtn.innerText = "Submit + Start";
    submBtn.classList.add("specBtn");
    document.getElementById("setupGameDiv").append(submBtn);
}

function loadEverything() {

}
