'use client'
import {FormControl, MenuItem, Select, InputLabel, Button }  from '@mui/material';
import { useState } from 'react';
export default function Home() {
  const [subject, setSubject] = useState("");
  const RWDomains = ["Information and Ideas", "Craft and Structure", "Expression of Ideas", "Standard English Conventions"];
  const mathDomains =  ["Algebra", "Advanced Math", "Problem-Solving and Data Analysis", "Geometry and Trigonometry"];
  const [domain, setDomain] = useState("");
  return (
    <main>
      <div className = 'flex items-center flex-col mt-20 text-4xl gap-8'>
        <h1>Welcome to DSAT-Questions</h1>
        <h2 className = 'text-2xl mb-20'>To get started, pick the subject, domain, and skill.</h2>
        <FormControl className = 'w-2/12'>
          <InputLabel>Subject</InputLabel>
          <Select value = {subject}>
          <MenuItem value = "Math" onClick  ={() => {setSubject("Math")}}>Math</MenuItem>
          <MenuItem value = "Reading/Writing" onClick = {() => setSubject("Reading/Writing")}>Reading/Writing</MenuItem></Select>
        </FormControl>
        <FormControl className = 'w-2/12'>
          <InputLabel>Domain</InputLabel>
          <Select value = {domain}>
            {(subject === "Reading/Writing") ? RWDomains.map((text) => <MenuItem key = {text} value = {text} onClick = {() => setDomain(text)}>{text}</MenuItem>): mathDomains.map((text) => <MenuItem key = {text} value = {text} onClick = {() => setDomain(text)}>{text}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className = 'w-2/12'>
          <InputLabel>Skill</InputLabel>
          <Select></Select>
        </FormControl>     
        <Button variant = "contained">Generate my Question!</Button>
      </div>
    </main>
  );
}
