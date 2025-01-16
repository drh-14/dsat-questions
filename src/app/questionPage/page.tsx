'use client'

import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function QuestionPage(){
    const [questionImageUrl, setQuestionImageUrl] = useState<string>("");
    const [questionText, setQuestionText] = useState<string>("");
    const [passageText, setPassageText] = useState<string>("");
    const [choices, setChoices] = useState<string[]>([]);
    const [answerText, setAnswerText] = useState<string>("");
    useEffect(() => { 
        setQuestionImageUrl(localStorage.getItem("questionImageUrl") || "");
        setQuestionText(localStorage.getItem("questionText") || "");
        setAnswerText(localStorage.getItem("answerText") || "");
        setPassageText(localStorage.getItem("passageText") || "");
        setChoices(JSON.parse(localStorage.getItem("choices") || "[]"));  
        console.log(answerText);
    }, []);
    const router = useRouter();
    const [buttonText, setButtonText] = useState("Reveal Answer");
    const [isHidden, setIsHidden] = useState(true);
    const manageAnswer = () => buttonText === "Reveal Answer" ? 
        (setButtonText("Hide Answer"),setIsHidden(false)): (setButtonText("Reveal Answer"), setIsHidden(true));

    const resetFields = () => {
        setQuestionImageUrl("");
        setQuestionText("");
        setPassageText("");
        setChoices([]);
        setAnswerText("");
        localStorage.removeItem("questionImageUrl");
        localStorage.removeItem("questionText");
        localStorage.removeItem("answerText");
        localStorage.removeItem("passageText");
        localStorage.removeItem("choices");
    }
    return(
        <div className = 'mt-20 text-3xl flex flex-col items-center gap-16'>
            <div className = 'flex flex-col gap-12 w-7/12 break-words items-center'>
            {questionImageUrl && questionImageUrl != "undefined" ? <Image width = {200} height = {200} src = {questionImageUrl || ""} alt = "" ></Image>: null}
            {questionText ? <Latex>{questionText}</Latex>: null}
            {passageText ? <h1>{passageText}</h1>: null}
            {!choices ? null: 
            <div className = 'flex flex-col text-left gap-4'>{choices.map((element, index) => <div key = {index}><Latex>{element}</Latex></div>)}</div>}
            <Button variant = 'contained'
             onClick = {manageAnswer}>{buttonText}</Button>
            {!isHidden && answerText ? <Latex>{answerText}</Latex>: null}
            </div>
            <Button variant = 'contained' onClick = {() => (router.push('./'), resetFields())}>Generate a new question!</Button>
        </div>
    )
}