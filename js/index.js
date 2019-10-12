document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.querySelector('#monster-container');
    const createMonster = document.querySelector('#create-monster');
    const backButton = document.querySelector('#back');
    const forwardButton = document.querySelector('#forward');
    let pageNumber = 1;

    const form = `<form> 
    <input type="text" name="name" placeholder="Name"> 
    <input type="number" name="age" placeholder="Age">
    <input type="text" name="description" placeholder="Description">
    <input data-action="submit" type="submit" value="Create Monster">
        </form>`

    createMonster.insertAdjacentHTML('afterbegin',form)

    createMonster.addEventListener('click',(event)=>{
        event.preventDefault();
        const nameInput = document.querySelector('[name="name"')
        const ageInput = document.querySelector('[name="age"]')
        const descInput = document.querySelector('[name="description"]')
        if(event.target.dataset.action === "submit"){
            // console.log(nameInput.value)
            // console.log(ageInput.value)
            // console.log(descInput.value)
            fetch("http://localhost:3000/monsters",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    name: nameInput.value,
                    age: parseInt(ageInput.value),
                    description: descInput.value
                })
            })
        }
    }) 

    backButton.addEventListener('click',()=>{
        if(pageNumber > 1){
            pageNumber -= 1;
            pageLoad(pageNumber);
        }
        else
            alert("No Monster");
    })

    forwardButton.addEventListener('click',()=>{
        // monsterContainer.reset();
        pageNumber += 1;
        pageLoad(pageNumber);
        // location.reload();
    })

    pageLoad =(pageNum) => {
        fetch(`http://localhost:3000/monsters/?_limit=5&_page=${pageNum}`)
            .then(function (response) {
                return response.json();
            })
            .then(data =>{
                monsterContainer.innerHTML = ""
                displayMonstars(data)
            })
            .catch(function (error) {
                console.log(error)
            });
            
        displayMonstars = (data) => {
            data.forEach(monster => {
                monsterContainer.insertAdjacentHTML('beforeend',
                `
                <h3>Name: ${monster.name}</h3>
                <h5>Age: ${monster.age}</h5>
                <h5>Bio: ${monster.description}</h5>
                `
                )
            });
        }
    }// end of pageLoad

    pageLoad(pageNumber);
    // console.log("content loaded")
})

