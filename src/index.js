const url = 'http://localhost:3000/toys';

fetch(url)
.then(response => response.json())
.then(json => console.log(json));

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  let div = makeCard("pink", '', 7, 3);
  document.querySelector("#toy-collection").appendChild(div);
});

function makeCard(name, imgSource, likes, toyId)
{
  let div = document.createElement('div');
  div.classList = ['card'];

  let h2 = document.createElement('h2');
  h2.innerText = name;
  div.appendChild(h2);

  let img = document.createElement('img');
  img.src = imgSource;
  img.classList = 'toy-avatar';
  div.appendChild(img);

  let p = document.createElement('p');
  p.innerText = `${likes} Likes`;
  div.appendChild(p);

  let button = document.createElement('button');
  button.id = toyId;
  button.classList = ['like-btn'];
  button.innerText = 'Like <3';
  div.appendChild(button);

  return div;
}


