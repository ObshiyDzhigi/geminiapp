import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState(""); // сохранить ввод данных
  const [recentPrompt, setRecentPrompt] = useState(""); // когда мы нажимаем на кнопку отправки, данные поля ввода будут сохранены в этом recentprompt, и мы отобразим его на нашем главном компоненте
  const [prevPrompts, setPrevPrompts] = useState([]); // сохранить всю историю ввода и отобразить ее на вкладке недавних
  const [showResult, setShowResult] = useState(false); // Как только это правда, он скроет текст в главном компоненте и карточки, а затем отобразит результат
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(""); // Отображение наших результатов на веб-странице

  const delayPara = (index,nextWord)=>{
    setTimeout(function(){
        setResultData(prev=>prev+nextWord)
    },75*index)
  }

    const newChat = ()=>{
        setLoading(false)
        setShowResult(false)
    }
  const onSent = async (prompt) => {
    try {   
      setInput("")
        setResultData(""); // prev response will be removed from the state variable
        setLoading(true);
        setShowResult(true)
        
        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt)
            setRecentPrompt(prompt)
        }
        else if(prompt){
          setRecentPrompt(prompt);
          response = await runChat(prompt);
        }
        else{
            setPrevPrompts(prev=>[...prev,input]);
            setRecentPrompt(input)
            response = await runChat(input)
        }

      let resultArray = response.split("**");
      let newResponse="";
      for (let i = 0; i < resultArray.length; i++) {
        if(i === 0 || i%2 !== 1){
            newResponse += resultArray[i];
        }
        else{
            newResponse += "<b>"+resultArray[i]+"</b>"
        }
      }
      let newResponse2 = newResponse.split("*").join("</br>");
      let newResponseArray =  newResponse2.split(" ");
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i]
        delayPara(i,nextWord+" ");
        
      }
      setLoading(false);
      setInput("")
      // обработка результата
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    input,
    newChat,
    setInput,
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;