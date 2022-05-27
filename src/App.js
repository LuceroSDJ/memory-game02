import {useState, useEffect} from "react";
import SingleCard from "./components/SingleCard";
import './App.css';

const cardImages = [
  {"src": process.env.PUBLIC_URL + "/images/img1.jpeg", matched: false},
  {"src": process.env.PUBLIC_URL + "/images/img2.jpeg", matched: false},
  {"src": process.env.PUBLIC_URL + "/images/img3.jpeg", matched: false},
  {"src": process.env.PUBLIC_URL + "/images/img4.jpeg", matched: false},
  {"src": process.env.PUBLIC_URL + "/images/img5.jpeg", matched: false},
  {"src": process.env.PUBLIC_URL + "/images/img7.jpeg", matched: false}
]

function App() {
  //state variables
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);


  //shuffle cards: duplicate cards and randomize order
  const shuffleCards = () => {
    const shuffleCardsList = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))

    //reset pieces of state
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCardsList);
    setTurns(0);
  }

  // this function is triggered when the back of a card is clicked: 
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    console.log(choiceOne, choiceTwo)
  }

  //check if cards match
  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src) {
        console.log("yes, cards match");
        //keep track of which cards have been matched:
        //override existing "matched" property 
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else { //if choiceOne.src !== choiceTwo.src
        console.log("not a match")
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo])

  //reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  //automatically start the game right after the 1st render 
  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <h1>Family Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key = {card.id}
            cardObj = {card}
            handleChoice = {handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
