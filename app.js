let addToDoButton = document.getElementById("addToDo");
let toDoContainer = document.getElementById("toDoContainer")
let inputText = document.getElementById("inputText")
let clear = document.getElementById("clearToDo")


addToDoButton.addEventListener("click", function(){
    let paragraph = document.createElement("p");
    paragraph.classList.add("paragraph-styling");
    toDoContainer.appendChild(paragraph);
    paragraph.innerText = "👀   " + inputText.value;
    inputText.value = "";

    paragraph.addEventListener("click",function(){
        paragraph.style.textDecoration = "line-through"
    });
    paragraph.addEventListener("dblclick",function(){
        setTimeout
        toDoContainer.removeChild(paragraph);
    });
    clear.addEventListener("click",function(){
        paragraph.remove()
        // toDoContainer.removeChild(paragraph);
        // paragraph.style.display= "none"
    });


})

