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

  makeToyCards();
});

function makeToyCards() {
  fetch(`http://localhost:3000/toys`)
    .then(r => r.json())
    .then(toys => {
      // console.log(toys);
      toys.forEach(toy => {
        const div = document.createElement(`div`);
        div.className = `card`;
        const h2 = document.createElement(`h2`);
        h2.textContent = toy['name'];
        const img = document.createElement(`img`);
        img.src = toy[`image`];
        img.className = `toy-avatar`;
        const p = document.createElement(`p`);
        p.textContent = `${toy[`likes`]} Likes`;
        const btn = document.createElement(`button`);
        btn.className = `like-btn`;
        btn.id = toy[`id`];

        div.append(h2, img, p, btn);
        document.querySelector(`div#toy-collection`).append(div);

        btn.addEventListener(`click`, () => {
          toy[`likes`] ++;
          p.textContent = `${toy[`likes`]} Likes`;
          updateToyLikes(toy)
        })
      })
      
    })
}

function postNewToy(toyName, toyImg) {
  fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            name: toyName,
            image: toyImg,
            likes: 0,
        }),
    })
    .then(r => r.json())
    .then(toys => makeToyCards())
}

function updateToyLikes(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj[`id`]}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(toyObj)
    })
    .then(r => r.json())
    .then(toy => console.log(toy))
}