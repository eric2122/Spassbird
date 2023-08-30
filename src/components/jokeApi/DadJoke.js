import React , {useEffect, useState}from 'react'

export default function DadJoke() {
    const [jokes,setJokes] = useState ("");
    
    const getJokes = () =>{
        let config = {
            headers :{
                Accept : "application/json"
            }
        };

        fetch("https://icanhazdadjoke.com/", config)
        .then ((res) => res.json())
        .then ((data) => {
            // let randumNum = Math.floor(Math.random() * data.length);
            setJokes(data.joke);
        });
       
    }

    useEffect(() => {
        getJokes();
    },[]); 


  return (
    <div>
        {jokes}
        <button onClick={getJokes}> Get Joke</button>
    </div>
  )
}
