'use client'

import { useState } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import katex from 'katex';

export default function questionPage(){
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
        return result;
      };
    const renderQuestion = (question:string) => tokenize(question).map((e) => e[0].startsWith('/')? <span>e</span>:
    <span dangerouslySetInnerHTML={{__html: katex.renderToString(e)}}></span>);
    const [questionImageUrl, setQuestionImageUrl] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [choices, setChoices] = useState<string[] | number[]>([]);
    const [answerText, setAnswerText] = useState("");
    const manageAnswer = () => buttonText === "Reveal Answer" ? 
        (setButtonText("Hide Answer"),setIsHidden(false)): (setButtonText("Reveal Answer"), setIsHidden(true));

    return(
        <div className = 'mt-20 text-3xl flex flex-col items-center gap-16'>
            <div className = 'flex flex-col gap-12 w-7/12 break-words items-center'>
            {questionImageUrl.length === 0 ? null : <Image src = {questionImageUrl} alt = "" ></Image>}
            <div>{renderQuestion(questionText)}</div>
            {choices.length === 0 ? null: 
            <div className = 'flex flex-col items-center gap-4'>{choices.map((element, index) => <div>{letters[index] + ') ' + element}</div>)}</div>}
            <Button variant = 'contained'
             onClick = {manageAnswer}>{buttonText}</Button>
            {isHidden ? null: <div>{renderQuestion(answerText)}</div>}
            </div>
            <Button variant = 'contained' onClick = {() => router.push('./')}>Generate a new question!</Button>
        </div>
    )
}