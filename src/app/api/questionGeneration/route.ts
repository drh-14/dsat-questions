import { NextResponse } from 'next/server';
import OpenAI from 'openai';


export async function POST(req:Request){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    try{
        const data = await req.json();
        const subject = data["Subject"];
        const domain = data["Domain"];
        const skill = data["Skill"];
        const difficulty = data["difficulty"];
        const prompt = `Please generate a question with the following parameters:
         subject = ${subject}, domain = ${domain}, skill = ${skill}, difficulty = ${difficulty}. You can either generate the
         question with or without a diagram, but make it similar to questions in the specified category 
         and skill. For instance, if questions in the particular skill do not contain diagrams, do not
         create a diagram for the question. To create the diagram, generate code for it and then run it.
         Give me a JSON file turned into a string in this format:\n{passageText: string, questionText: string, questionImageURL: string, choices: string[],
         answerText: string}.\nFor portions containing math expressions, format it in raw LaTeX. For a multiple
         choice question, there should only be 4 answers. passageText should be an empty string if the question does not involve a passage to read. questionImageUrl should be an empty string if there is no diagram,
         and choices should be an empty list if it is not a multiple choice question. answerText should contain the full explanation to the answer. Only return the  plain JSON string with no backticks and
         do not respond with anything else.`;
         const chatCompletion = await openai.chat.completions.create({
            messages: [{role: 'user', content: prompt}],
            model: "chatgpt-4o-latest"
         });
         const responseString = await chatCompletion.choices[0].message.content;
         console.log(responseString);
         if(responseString){
            return NextResponse.json({data: JSON.parse(responseString)});
         }
         else{
            console.log("Empty response string.");
         }
        }
        catch(error){
            console.log(error);
        }
}