let monsterList = document.querySelector('#monsterList');
let createMonster = document.querySelector('#createMonster');
let monsterForm = document.querySelector('#createMonsterForm')
let monsterContainer = document.querySelector('#monsterContainer');
let buttonBack = document.querySelector('#back');
buttonBack.addEventListener('click', event => {
    doPagenation(event)
})
let buttonForward = document.querySelector('#forward');
buttonForward.addEventListener('click', eveny => {
    doPagenation(event)
})
let nameInput = monsterForm.querySelector("input[name=name]");
let ageInput = monsterForm.querySelector("input[name=age]");
let descriptionInput = monsterForm.querySelector("input[name=description]");
let page = 1;

function fetchMonsters() {
    fetch('http://localhost:3000/monsters?_limit=50&_page=' + page, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(function(response){
        response.json().then(onMonstersAvailable);
    })
    .catch(function(error){
        alert("Error during requests to get monsters");
    });
}

function onMonstersAvailable(monsters) {
    deleteChild()
    monsters.forEach(addMonster);
}
function deleteChild() { 
    let e = document.querySelector("ul"); 
    let child = e.lastElementChild;  
    while (child) { 
        e.removeChild(child); 
        child = e.lastElementChild; 
    } 
}

function addMonster(monster) {
    let monsterView = document.createElement('li');
    let name = document.createElement('h2');
    name.innerText = `${monster.name} (${monster.age})`;
    let description = document.createElement('div');
    description.innerText = `${monster.description}`;
    monsterView.appendChild(name);
    monsterView.appendChild(description);
    monsterList.appendChild(monsterView);
}

monsterForm.addEventListener("submit", event => {
    event.preventDefault();
    let monster = {
        name: nameInput.value,
        age: parseFloat(ageInput.value),
        description: descriptionInput.value
    };
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(monster) 
    })
    .then(response => response.json().then(addMonster));
});

function doPagenation(even){
    let direction = event.target.id;
    if (direction === 'back' && page > 1) {
       page = page - 1;
    } else if (direction === 'forward') {
        page = page + 1;
    }
    fetchMonsters();
}

fetchMonsters();
