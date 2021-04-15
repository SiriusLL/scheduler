
import { useState } from "react";

export default function useVisualMode (initial) {
  //take in an initial mode
  //set the mode state with the initial ode provided
  //return an object with a mode property

  //const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    // history.push(newMode);
    
    let newHistory = [...history];
    if(replace) {
      newHistory.pop();
    }
      newHistory = [...newHistory, newMode];
      setHistory(newHistory);
      //setMode(newMode);
    

  }

  const back = () => {
    
    if(history.length < 2) {
      setHistory([initial]);
      
    } else {

      const newHistory = [...history]
      newHistory.pop()
      setHistory(newHistory);
    }
  }

  return { mode: history[history.length-1], transition, back };
}

