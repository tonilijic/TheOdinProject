const list = document.querySelector("ul");
const button = document.querySelector("button");
const input = document.querySelector("input");


button.addEventListener(`click`, () => {
const myItem = input.value;
input.value = "";

const listItem = document.createElement('li');
const listText = document.createElement('span');
const listBtn = document.createElement('button');


listItem.appendChild(listText);
listText.textContent = myItem;

listItem.appendChild(listBtn);
listBtn.textContent = "Delete";

list.appendChild(listItem);

listBtn.addEventListener(`click`, () => {
    list.removeChild(listItem)
});

input.focus();

});