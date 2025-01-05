'use client'
import {FormControl, MenuItem, Select, InputLabel, Button }  from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation' 

export default function Home() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const RWDomains = ["Information and Ideas", "Craft and Structure", "Expression of Ideas", "Standard English Conventions"];
  const mathDomains =  ["Algebra", "Advanced Math", "Problem-Solving and Data Analysis", "Geometry and Trigonometry"];
  const [domain, setDomain] = useState("");
  const [skill, setSkill] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const valid_reading_and_writing_skills: {[key:string]: string[]} = {
    "": [],
    "Information and Ideas": ["Central Ideas and Details", "Inferences", "Command of Evidence"], 
    "Craft and Structure": ["Words in Context", "Text Structure and Purpose", "Cross-Text Connections"],
    "Expression of Ideas": ["Rhetorical Synthesis", "Transitions"],
    "Standard English Conventions": ["Boundaries", "Form, Structure, and Sense"]
  };
  const valid_math_skills: Record<string, string[]> = {
  "": [],
  "Algebra": 
      ["Linear equations in one variable", "Linear functions", "Linear equations in two variables", 
      "Systems of two linear equations in two variables", "Linear inequalities in one or two variables"
      ], 
  "Advanced Math": 
      ["Nonlinear functions", "Nonlinear equations in one variable and systems of equations in two variables", "Equivalent expressions"], 
       "Problem-Solving and Data Analysis": [
      "Ratios, rates, proportional relationships, and units", "Percentages", 
      "One-variable data: Distributions and measures of center and spread", "Two-variable data: Models and scatterplots", 
      "Probability and conditional probability", "Inference from sample statistics and margin of error", 
      "Evaluating statistical claims: Observational studies and experiments"
      ], 
  "Geometry and Trigonometry": ["Area and volume", "Lines, angles, and triangles", "Right triangles and trigonometry", "Circles"]
   };
   const generateQuestion = async () => {
    try{
      const res = await fetch('/route',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "Subject": subject,
          "Domain": domain,
          "Skill": skill
         }),
    });
    if(!res.ok){
      throw new Error(`Error ${res.status}`);
    }
    const data = await res.json();
  }
  catch(error){
    console.error(error);

  }
  }
    const letterChoices = ["A", "B", "C", "D"];

  return (
    <main>
      <div className = 'flex items-center flex-col mt-20 text-4xl gap-8'>
        <h1>Welcome to DSAT-Questions</h1>
        <h2 className = 'text-2xl mb-20'>To get started, pick the subject, domain, skill, and difficulty.</h2>
        <FormControl className = 'w-2/12'>
          <InputLabel>Subject</InputLabel>
          <Select value = {subject}>
          <MenuItem value = "Math" onClick  ={() => {
            setSubject("Math");
            setDomain("");
            setSkill("");
            setDifficulty("");

          }}>Math</MenuItem>
          <MenuItem value = "Reading/Writing" onClick = {() => 
            {setSubject("Reading/Writing");
             setDomain("");
             setSkill("");
             setDifficulty("");
            }}>Reading/Writing</MenuItem></Select>
        </FormControl>
        <FormControl className = 'w-2/12'>
          <InputLabel>Domain</InputLabel>
          <Select value = {domain}>
            {(subject === "Reading/Writing") ? RWDomains.map((text) => <MenuItem key = {text} value = {text} onClick = {() => setDomain(text)}>{text}</MenuItem>): mathDomains.map((text) => <MenuItem key = {text} value = {text} onClick = {() => setDomain(text)}>{text}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className = 'w-2/12'>
          <InputLabel>Skill</InputLabel>
          <Select value = {skill}>
            {(subject === "Reading/Writing") ? valid_reading_and_writing_skills[domain].map((text) => <MenuItem value = {text} key ={text} onClick = {() => setSkill(text)}>{text}</MenuItem>): 
            valid_math_skills[domain].map((text) => <MenuItem value = {text} key = {text} onClick = {() => setSkill(text)}>{text}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className = 'w-2/12'>
          <InputLabel>Difficulty</InputLabel>
          <Select value = {difficulty}>
            <MenuItem value = "Easy" onClick = {() => setDifficulty("Easy")}>Easy</MenuItem>
            <MenuItem value = "Medium" onClick = {() => setDifficulty("Medium")}>Medium</MenuItem>
            <MenuItem value = "Hard" onClick = {() => setDifficulty("Hard")}>Hard</MenuItem>
          </Select>
        </FormControl>     
        <Button variant = "contained" onClick = {() => {
          if(subject != "" && domain != "" && skill != "" && difficulty != "")
          {(router.push('./questionPage'), generateQuestion())}}}>Generate my Question!</Button>
      </div>
    </main>
  );
}