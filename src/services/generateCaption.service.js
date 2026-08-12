const  { GoogleGenAI } =  require("@google/genai");
const fs = require("node:fs");

const client = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});


const generateCaption= async(base64ImageFile)=>{
try {

    const interaction = await client.interactions.create({
    model: "gemini-3.6-flash",
    input: [
        {type: "text", text: "Caption this image."},
        {
            type: "image",
            data: base64ImageFile,
            mime_type: "image/jpeg"
        }
    ],
    system_instruction:`
    You are a expert social media manager and you have to generate a caption for the given image. 
    The caption should be engaging, creative, and relevant to the image.
    The caption should be in a single line .
    Caption should be small and concise
    You should include hashtags and Emozi in the caption.
    Create asthetic and trendy caption for the image.
    `   
});
    return interaction.output_text 
} catch (error) {
    res.status(400).json({
        success:false,
        message:"Something went wrong"

    })
}
}

module.exports = generateCaption;