import { NextResponse } from 'next/server';
import OpenAI from 'openai';


export async function POST(req:Request){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
        const data = await req.json();
        const subject = data["subject"];
        const domain = data["domain"];
        const skill = data["skill"];
        const difficulty = data["difficulty"];
        const prompt = `Please generate a question with the following parameters:
         subject = ${subject}, domain = ${domain}, skill = ${skill}, difficulty = ${difficulty}. You can either generate the
         question with or without a diagram, but make it similar to questions in the specified category 
         and skill. For instance, if questions in the particular skill do not contain diagrams, do not
         create a diagram for the question. To create the diagram, generate code for it and then run it.
         Give me a JSON file in this format:\n{questionText: string, diagramURL: string, answerChoices: string[],
         answerExplanation: string}.\nFor portions containing math expressions, format it in raw LaTeX. For a multiple
         choice question, there should only be 4 answers. diagramURL should be an empty string if there is no diagram,
         and answerChoices should be an empty list if it is not a multiple choice question. Only return the JSON file and
         do not respond with anything else.`;
         const chatCompletion = await openai.chat.completions.create({
            messages: [{role: 'user', content: prompt}],
            model: "chatgpt-4o-latest"
         });
         const responseString = chatCompletion.choices[0].message.content;
         return NextResponse.json({data: responseString});
}