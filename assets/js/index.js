import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-a5a93-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    clearInputFielsEl()
    push(shoppingListInDB, inputValue)
})

onValue(shoppingListInDB, function(snapshot){
    let itemsArray=Object.entries(snapshot.val())
    clearShoppingList()
    for(let i=0; i<itemsArray.length; i++){
        appendItemToShoppingList(itemsArray[i])
    }
})

function clearShoppingList(){
    shoppingListEl.innerHTML=""
}
function clearInputFielsEl(){
    inputFieldEl.value = ""
}

function appendItemToShoppingList(input){
    //shoppingListEl.innerHTML += `<li>${inputValue}</li>`
    let itemID= input[0]
    let itemValue= input[1]

    let newEl=document.createElement("li")
    newEl.textContent=itemValue

    shoppingListEl.append(newEl)

    newEl.addEventListener("dblclick", function(){
        let pathOfTheItemInDatabase = ref(database, `/shoppingList/${itemID}`)
        remove(pathOfTheItemInDatabase)
    })

}