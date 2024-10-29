const inputElement = document.getElementById("input");
const formElement = document.getElementById("form");
const tasks = document.getElementById("tasks");

formElement.addEventListener("submit", getText );
function getText (event) {
    event.preventDefault();
    const value = event?.target?.elements?.text?.value;

    if (value?.length < 1) 
        {
           return false;
        }
    renderTask(value);
    item.push(value);
 
    localStorage.setItem("tasks", JSON.stringify(item));
    formElement.reset();
};


let item = [];

function renderTask(text) {
    const newDiv = document.createElement("div");
    newDiv.id = text;
    newDiv.className = "task"
    newDiv.innerHTML = `
                            <input class="checkbox" type="checkbox" onchange="strikThrough(event)">
                            <div class="task-child">
                                <span class="task-text">${text}</span>
                                <img class="delete-icon" src="icon/delete.svg" alt="icon" onclick="deleteTask(event)" data-id="${text}">
                            </div>`;
    tasks.appendChild(newDiv);
};

window.addEventListener("load",retrieveFromStore);

function retrieveFromStore () {
        const store = localStorage.getItem("tasks");
        const items = JSON.parse(store) ?? [];

        items.map((text) => renderTask(text));
        item = [...items, ...item];
};

function strikThrough(event)
{
    const checked = event.target.checked;
    const divElement = event.target.nextElementSibling;
    const imageElement = divElement.lastElementChild;
    if (checked) 
    {
        divElement.style.textDecoration = "line-through";
        imageElement.style.cursor = "pointer";
        imageElement.style.opacity = 1;
    }  
    else 
        {
            divElement.style.textDecoration = "none";
            imageElement.style.cursor = "not-allowed";
            imageElement.style.opacity = 0.6;
        }
};

function deleteTask (evnt)
{
    const id = evnt.target.dataset.id;
    const checkboxElement = evnt.target.parentElement.previousElementSibling;
    const checked = checkboxElement.checked;

    if (!checked)
    {
        return null;
    }

    const elementToRemove = document.getElementById(id);

    tasks.removeChild(elementToRemove);
    const newItems = item.filter((text) => text !== id);
    item = newItems;
    localStorage.setItem("tasks", JSON.stringify(newItems));
};
