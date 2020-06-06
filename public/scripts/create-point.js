// Select Stats and Cities
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {

        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade<option>"
    citySelect.innerHTML = true
   
    fetch(url)
    .then(res => res.json())
    .then(cities => {

        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Colect itens
// Get all li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector ("input[name=itens]")

let selectedItems = []


function handleSelectedItem (event) {

    const itemLi = event.target

    //Add or remove class with javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    

    //Check if having items selected, if yes
    //Get items selected

    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId
        return itemFound
    })

    //If already selected

    if(alreadySelected >= 0) {
        //remove form selection
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else{
    //If not selected, add in selection
        selectedItems.push(itemId)
    }    

    //Update the hidden field with selected items
    collectedItems.value = selectedItems
}

