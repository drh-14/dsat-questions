'use client'

import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import katex from 'katex';

export default function questionPage(){
    const [questionImageUrl, setQuestionImageUrl] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [choice1, setChoice1] = useState("");
    const [choice2, setChoice2] = useState("");
    const [choice3, setChoice3] = useState("");
    const [choice4, setChoice4] = useState("");
    const [choices, setChoices] = useState<string[]>([]);
    const [answerText, setAnswerText] = useState("");
    useEffect(() => {
        setQuestionImageUrl(localStorage.getItem("questionImageUrl") || "");
        setQuestionText(localStorage.getItem("questionText") || "");
        setAnswerText(localStorage.getItem("answerText") || "");
        setChoice1(localStorage.getItem("choice1") || "");
        setChoice2(localStorage.getItem("choice2") || "");
        setChoice3(localStorage.getItem("choice3") || "");
        setChoice4(localStorage.getItem("choice4") || "");
        setChoices([choice1, choice2, choice3, choice4]);
    }, []);
    const router = useRouter();
    const [buttonText, setButtonText] = useState("Reveal Answer");
    const [isHidden, setIsHidden] = useState(true);
    const letters = ["A", "B", "C", "D"];

    const tokenize = (str:string) => {
        let result = [];
        let match;
        const regex = /([^\\]*(?:\\\(.*?\\\)|\\\[.*?\\\]))/g;
        while(match = regex.exec(str)){
          result.push(match[0]);
        }
        console.log(result);
        return result;
      };
    const renderQuestion = (question:string) => tokenize(question).map((e) => e[0].startsWith('/')? <span key = {e}>e</span>:
    <span key = {e} dangerouslySetInnerHTML={{__html: katex.renderToString(e)}}></span>);
    const manageAnswer = () => buttonText === "Reveal Answer" ? 
        (setButtonText("Hide Answer"),setIsHidden(false)): (setButtonText("Reveal Answer"), setIsHidden(true));

    return(
        <div className = 'mt-20 text-3xl flex flex-col items-center gap-16'>
            <div className = 'flex flex-col gap-12 w-7/12 break-words items-center'>
            {questionImageUrl.length === 0 ? null : <Image width = {200} height = {200} src = {questionImageUrl} alt = "" ></Image>}
            <div>{renderQuestion(questionText)}</div>
            {choices.length === 0 ? null: 
            <div className = 'flex flex-col items-center gap-4'>{choices.map((element, index) => <div key = {index}>{letters[index] + ') ' + element}</div>)}</div>}
            <Button variant = 'contained'
             onClick = {manageAnswer}>{buttonText}</Button>
            {isHidden ? null: <div>{renderQuestion(answerText)}</div>}
            </div>
            <Button variant = 'contained' onClick = {() => router.push('./')}>Generate a new question!</Button>
        </div>
    )
}