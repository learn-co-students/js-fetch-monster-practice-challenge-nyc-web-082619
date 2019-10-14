const monsterDiv = document.querySelector("#monster-container")
const controls = document.querySelector(".controls")
let pageNumber = 1
const createMonster = document.querySelector("#create-monster")


fetch(`http://localhost:3000/monsters/?_limit=5&_page=${pageNumber}`)
    .then(res => res.json())
    .then(monsters => displayMonsters(monsters))


// initial display monsters--------------------------------------------------------------------------------
function displayMonsters(monsters){
    monsters.forEach(monster => {
        monsterDiv.insertAdjacentHTML("beforeend", 
        `
        <div class="card">
            <h2>${monster.name}</h2>
            <h4>age: ${monster.age}</h4>
            <p>bio: ${monster.bio}</p>
        </div>
        `
        )
    });
}
// initial display monsters--------------------------------------------------------------------------------



controls.addEventListener("click", function(event){
    const back = document.querySelector("#back")
    const forward = document.querySelector("#forward")

    if (event.target === forward){
        monsterDiv.innerHTML = ""
        pageNumber += 1

        fetch(`http://localhost:3000/monsters/?_limit=5&_page=${pageNumber}`)
            .then(res => res.json())
            .then(monsters => displayMonsters(monsters))

    } else if (event.target === back && pageNumber >= 1){
        monsterDiv.innerHTML = ""
         
        pageNumber -= 1 

        fetch(`http://localhost:3000/monsters/?_limit=5&_page=${pageNumber}`)
            .then(res => res.json())
            .then(monsters => displayMonsters(monsters))
    } 
})


// createMonster form -----------------------------------------------------------------------------------------
    let form = document.createElement('form')
    createMonster.appendChild(form)

    form.insertAdjacentHTML('beforeend', 
    `
  
        name: <input id="formName" type="text" name="name">
        age: <input id="formAge" type="number" name="age">
        description: <input id="formDescription" type="text" name="description">
        <input type="submit" value="create monster">

    `
  )
  form.className = "monster-form"
/* // createMonster form ----------------------------------------------------------------------------------------- */

/* // submit form ----------------------------------------------------------------------------------------- */
let monsterForm = document.querySelector(".monster-form")

monsterForm.addEventListener('submit', function (event){

event.preventDefault()

let formName = document.querySelector("#formName")
let formAge = document.querySelector("#formAge")
let formDescription = document.querySelector("#formDescription")
    fetch(`http://localhost:3000/monsters`, {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
          {
            
            name: formName.value,
             age: formAge.value, 
             description: formDescription.value
             
          }
        )
})
})
/* // submit form ----------------------------------------------------------------------------------------- */



