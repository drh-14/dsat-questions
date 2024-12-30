'use client'

import { useState } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function questionPage(){
    const router = useRouter();
    const [buttonText, setButtonText] = useState("Reveal Answer");
    const [isHidden, setIsHidden] = useState(true);
    const manageAnswer = () => buttonText === "Reveal Answer" ? 
        (setButtonText("Hide Answer"),setIsHidden(false)): (setButtonText("Reveal Answer"), setIsHidden(true));
    return(
        <div className = 'flex flex-col items-center mt-20 gap-8'>
            {/* Question*/}
            <div></div>
            <Button variant = 'contained'
             onClick = {manageAnswer}>{buttonText}</Button>
             {/* Answer */}
            <div>{isHidden ? null: <div>testing</div>}</div>
            <Button variant = 'contained' onClick = {() => router.push('./')}>Generate a new question!</Button>
        </div>
    )
}