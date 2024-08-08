/* eslint-disable */
import "./style.css";

const cards = [
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "10", value: 10 },
  { name: "J", value: 11 },
  { name: "Q", value: 12 },
  { name: "K", value: 13 },
  { name: "A", value: 14 }
];

const suits = [
  { name: "♠️", icon: "text-dark fs-4" },
  { name: "♥", icon: "text-danger fs-4" },
  { name: "♣", icon: "text-dark fs-4" },
  { name: "♦", icon: "text-danger fs-4" }
];

let getRandomCard = () => {
  let card = cards[Math.floor(Math.random() * cards.length)];
  let cardNumberText = document.querySelector("h1");
  let suit = suits[Math.floor(Math.random() * suits.length)];
  let suitText = document.querySelectorAll("h2");

  cardNumberText.innerHTML = `${card.name}`;
  cardNumberText.className = `${suit.icon}`;
  suitText.forEach(text => {
    text.innerHTML = `${suit.name}`;
    text.className = `${suit.icon}`;
  });
  let cartaUnica = {
    name: card.name,
    value: card.value,
    suit: suit.name,
    style: suit.icon
  };
  return cartaUnica;
};

let generateCards = num => {
  let randomCards = [];
  for (let i = 0; i < num; i++) {
    let individual = getRandomCard();
    randomCards.push(individual);
  }
  return randomCards;
};

const createCardElement = card => {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  cardDiv.style.width = "6rem";
  cardDiv.style.height = "9rem";
  cardDiv.style.margin = "0.5rem";

  const cardBody = document.createElement("div");
  cardBody.className =
    "card-body d-flex flex-column my-0 flex-shrink justify-content-between";

  const topSuit = document.createElement("h2");
  topSuit.className = `card-subtitle fs-4 ${card.style}`;
  topSuit.innerText = card.suit;

  const cardTitle = document.createElement("h1");
  cardTitle.className = `card-title fs-4 my-1 ${card.style}`;
  cardTitle.innerText = card.name;

  const bottomSuit = document.createElement("h2");
  bottomSuit.className = `card-subtitle fs-4 ${card.style}`;
  bottomSuit.innerText = card.suit;

  const topDiv = document.createElement("div");
  topDiv.className = "text-start";
  topDiv.appendChild(topSuit);

  const middleDiv = document.createElement("div");
  middleDiv.className = "my-0";
  middleDiv.appendChild(cardTitle);

  const bottomDiv = document.createElement("div");
  bottomDiv.className = "text-end";
  bottomDiv.appendChild(bottomSuit);

  cardBody.appendChild(topDiv);
  cardBody.appendChild(middleDiv);
  cardBody.appendChild(bottomDiv);

  cardDiv.appendChild(cardBody);

  return cardDiv;
};

// Función para dibujar cartas en el contenedor
const renderCards = (cardsArray, containerId) => {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  cardsArray.forEach(card => {
    const cardElement = createCardElement(card);
    container.appendChild(cardElement);
  });
};

const bubbleSort = arr => {
  console.log("Array desordenado: ", arr);
  let auxArr = [...arr];
  let wall = auxArr.length - 1; //we start the wall at the end of the array
  let iterations = [];
  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      //compare the adjacent positions, if the right one is bigger, we have to swap
      if (auxArr[index].value > auxArr[index + 1].value) {
        let aux = auxArr[index];
        auxArr[index] = auxArr[index + 1];
        auxArr[index + 1] = aux;
      }
      iterations.push([...auxArr]);
      index++;
    }
    wall--; //decrease the wall for optimization
  }
  return iterations;
};

let arrCreated = [];

const DibujarClick = () => {
  const cardCount = document.getElementById("cardAmount").value;
  const numberOfCards = parseInt(cardCount, 10);
  if (!isNaN(numberOfCards) && numberOfCards > 0) {
    const randomDeck = generateCards(numberOfCards);
    renderCards(randomDeck, "randomCards");
    arrCreated.push(...randomDeck);
  } else {
    alert("Por favor, ingresa un número válido de cartas.");
  }
  //return arrCreated;
  return arrCreated;
};

document.getElementById("newCard").addEventListener("click", DibujarClick);

const OrdenarClick = () => {
  let iteratedDeck = bubbleSort(arrCreated);
  for (let i = 0; i < iteratedDeck.length; i++) {
    let newContainer = document.getElementById("sortedCards");
    let newDiv = document.createElement("div");
    let newDivTittle = document.createElement("p");
    newDivTittle.innerHTML = `Iteracion: ${i}`;
    newDiv.id = `Div ${i}`;
    newDiv.className =
      "container-xxl text-center d-flex justify-content-center mx-auto";
    newContainer.appendChild(newDivTittle);
    newContainer.appendChild(newDiv);
    renderCards(iteratedDeck[i], newDiv.id);
  }
};

document.getElementById("sortCards").addEventListener("click", OrdenarClick);
document.getElementById("clean").addEventListener("click", function() {
  location.reload();
});
