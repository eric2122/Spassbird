import React , {useState}from 'react'

export default function DadJoke() {
    const [jokes,setJokes] = useState ("");
    
    const getJokes = () =>{
        fetch("https://type.fit/api/quotes")
        .then ((res) => res.json())
        .then ((data) => {
            let randumNum = Math.floor(Math.random() * data.length);
            setJokes(data[randumNum]);
        });
    }
  return (
    <div>
        {jokes.text}
        <button onClick={getJokes}> Get Joke</button>
    </div>
  )
}
