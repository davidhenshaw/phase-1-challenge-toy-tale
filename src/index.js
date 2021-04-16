const url = 'http://localhost:3000/toys';

let addToy = false;

let toyCollection;
let toyForm;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  toyCollection = document.querySelector('#toy-collection');
  toyForm = document.querySelector('form.add-toy-form');

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    toyFormContainer.style.display = addToy ? "block" : "none";
  });

  fetchToys().then(result => renderToys(result));
  
  toyForm.addEventListener('submit', onSubmit)
});

function fetchToys()
{
  return fetch(url).then(response => response.json());
}

function onSubmit(event)
{
  event.preventDefault();
  let inputs = document.querySelectorAll('form.add-toy-form input');
  
  postToy(inputs[0].value, inputs[1].value);
}

function postToy(name, image, likes=0)
{
  toyInfo = {
    name : name,
    image : image,
    likes : likes
  }

  options = {
    method : "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyInfo)
  }

  fetch(url, options)
  .then(response => {
    if(response.ok)
    {
      fetchToys().then(result => renderToys(result));
    }
  });
}

function renderToys(toyArr)
{
  //Clear previously rendered toys
  toyCollection.innerHTML = "";

  toyArr.forEach( (toy) =>{
    toyCollection.appendChild(makeCard(toy));
  })
}

function updateToy(newToyInfo)
{
  let card = document.querySelectorAll("div.card")[newToyInfo.id - 1];
  card.querySelector("img").src = newToyInfo.image;
  card.querySelector("h2").innerText = newToyInfo.name;
  card.querySelector("p").innerText = newToyInfo.likes + " Likes";
}

function makeCard(toy)
{
  let div = document.createElement('div');
  div.classList = ['card'];
  div.id = +toy.id;

  let h2 = document.createElement('h2');
  h2.innerText = toy.name;
  div.appendChild(h2);

  let img = document.createElement('img');
  img.src = toy.image;
  img.classList = 'toy-avatar';
  div.appendChild(img);

  let p = document.createElement('p');
  p.innerText = `${toy.likes} Likes`;
  div.appendChild(p);

  let button = document.createElement('button');
  button.id = toy.id;
  button.classList = ['like-btn'];
  button.innerText = 'Like <3';
  div.appendChild(button);

  button.addEventListener('click', (event) =>{
    let toyId = +event.target.id;
    fetch(`${url}/${toyId}`)
      .then(response => response.json())
      .then(toy => onLike(toy));
  });

  return div;
}

function onLike(toy)
{
  let options = {
    method: 'PATCH',

    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      "likes": toy.likes + 1
    })
  }

  fetch(`${url}/${toy.id}`, options)
    .then(response => response.json())
    .then(toy => updateToy(toy));
}