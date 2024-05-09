import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();
const ContextProvider = (props) => {

    const [input,setInput] = useState(""); //resets input field after entering the prompt 
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompt,setPrevPrompt] = useState([]);
    const [showResult,setShowResult] = useState(false); //hides the default  ui and shows response
    const [loading,setLoading] = useState(false); //loading animations till response arrives
    const [resultData,setResultData] = useState(""); //stores teh response in <p> tag

    const submitData = (event) => {
      if (event.key === 'Enter') {
        setInput("")
        onSent();
      }
    }
    // function that will show the typing effect
    const delayParagraph = (index,nextWord) => {
      setTimeout(() => {
        setResultData(prev=>prev+nextWord)
      }, 75*index);
    }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        
        setRecentPrompt(input)
        setPrevPrompt(prev=>[...prev,input])
        const response = await runChat(input)
        // line 25-35 : generates new line and automatically and bolds the ** text
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
          if (i===0||i%2!==1) {
          newResponse += responseArray[i];
          }else{
            newResponse += "<b>"+responseArray[i]+"</b>"
          }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
          const nextWord = newResponseArray[i];
          delayParagraph(i,nextWord+" ")
        }
        setLoading(false)
        setInput("")
    } 
  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    submitData
  };

  return (
    <Context.Provider value={contextValue}>
        {props.children}
    </Context.Provider>
  );
};
export default ContextProvider;
