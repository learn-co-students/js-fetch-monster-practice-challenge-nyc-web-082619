const monstersContainer = document.querySelector("div#monster-container")
const nextButton = document.querySelector("button.forward")
const backButton = document.querySelector("button.back")
const monsterForm = document.querySelector("div#create-monster form")

let page = 1

function renderMonster(monster){
    monstersContainer.insertAdjacentHTML("beforeend",  `
    <div>
    <h2>${monster.name}</h2>
    <h4>Age: ${monster.age}</h4>
    <p>Bio: ${monster.description}<p>
    </div>
    `)
}


function fetchFiftyMonsters(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(resp => resp.json())
    .then(monsters => {
        monsters.forEach(renderMonster)
    })
}

document.addEventListener("DOMContentLoaded", fetchFiftyMonsters)

function deleteChildren(node){
    let child = node.lastElementChild
    while (child){
        node.removeChild(child);
        child = node.lastElementChild
    }
}

function next(){
    deleteChildren(monstersContainer);
    page += 1;
    fetchFiftyMonsters();
}

nextButton.addEventListener("click", next)

function previous(){
    switch (page) {
        case 1:
            alert("No previous monsters!!")
            break;
    
        default:
            deleteChildren(monstersContainer);
            page -= 1
            fetchFiftyMonsters();
            break;
    } 
}

backButton.addEventListener("click", previous)

function createMonster(form){
    const newMonster = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: form.name.value,
            age: form.age.value,
            description: form.description.value
        })
    }
    fetch("http://localhost:3000/monsters", newMonster)
}

monsterForm.addEventListener("submit", event => createMonster(event.target))