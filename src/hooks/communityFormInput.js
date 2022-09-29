import { useState, useCallback } from "react";

const Validation = ()=>{
const [isLimitScore, setIsLimitScore] = useState("");
const [isLimitParticipants, setLimitParticipants] = useState("");
const [isTitle, setIsTitle] = useState("");
const [isContent, setIsContent] = useState("");
  const [text, setText] = useState({
    limitScore: "",
    limitParticipants: "",
    title: "",
    content: "",
  })
const   { limitScore,limitParticipants,title, content} = text;
  const textOnChange = (e) =>{
    const { name, value } = e.target;
    setText((form)=>({ ...form, [name]: value }));
      }


const reset = () =>{
  setText({});
  
  }

return [text,textOnChange,reset]

}

export default Validation;
const [isLimitScore, setIsLimitScore] = useState("");
const [isLimitParticipants, setLimitParticipants] = useState("");
const [isTitle, setIsTitle] = useState("");
const [isContent, setIsContent] = useState("");
const [isdate, setIsDate] = useState("");