import type { NextApiRequest, NextApiResponse } from 'next';
import { Pinecone } from '@pinecone-database/pinecone';
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();
const pc = new Pinecone({apiKey: process.env.PINECONE_API_KEY || ""});
const llm = new ChatOpenAI({ temperature: 0 });


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'POST'){
        const data = req.body();
        const subject = data["subject"];
        const domain = data["domain"];
        const skill = data["skill"];
        const difficulty = data["difficulty"];


        const llm = new ChatOpenAI({
            model: "gpt-4o-mini",
            temperature: 0
          });

        const prompt = `Based on similar questions, please generate a question with the following parameters:
         subject = ${subject}, domain = ${domain}, skill = ${skill}, difficulty = ${difficulty}. You can either generate the
         question with or without a diagram, but make it similar to questions in the specified category 
         and skill. For instance, if questions in the particular skill do not contain diagrams, do not
         create a diagram for the question. To create the diagram, generate code for it and then run it.
         Give me a JSON file in this format:\n{questionText: string, diagramURL: string, answerChoices: string[],
         answerExplanation: string}.\nFor portions containing math expressions, format it in raw LaTeX. For a multiple
         choice question, there should only be 4 answers. diagramURL should be an empty string if there is no diagram,
         and answerChoices should be an empty list if it is not a multiple choice question. Only return the JSON file and
         do not respond with anything else.`;


    }
}