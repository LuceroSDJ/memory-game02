import "./SingleCard.css";

export default function singleCard({cardObj, handleChoice, flipped, disabled}) {

    const handleClick = () => {
        if(!disabled) {
            //trigger handleChoice (function defined in App.js)
            //pass the parameter in this child component up to its parent
            handleChoice(cardObj);
        }
    }
    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img 
                    className="front" 
                    src={cardObj.src}
                    alt="front of card"
                />
                <img 
                    className="back"
                    src={process.env.PUBLIC_URL + "/images/img4.jpeg"}
                    alt="card back"
                    onClick={handleClick}
                />
            </div>

        </div>
    )
}