import React , {useEffect, useState}from 'react' ;
import {FaStar} from 'react-icons/fa';

export default function DadJoke() {

    const [rating , setRating]= useState(null);
    const [hover , setHover] = useState(null);
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
        <p>{jokes}</p>
        <div className='starRating'  >
                {[...Array(5)].map((star,index) => {
                    const currentRating = index + 1 ;
                    return (
                        <label >
                            <input 
                            type="radio"
                            name='rating'
                            value={currentRating}
                            onClick={()=> setRating(currentRating)}
                             />
                             <FaStar
                             className='star'
                             size={30}
                             color ={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9" }
                             onMousEnter={()=> setHover(currentRating)}
                             onMousLeave={()=> setHover(null)}
                             />
                        </label>
                    );
                })}
                <p>your rating is {rating}</p>
                </div>
        <button onClick={getJokes}> Get Joke</button>
    </div>
  )
}
