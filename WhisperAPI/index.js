const axios = require('axios');
const FormData = require('form-data');
const KEY = ''; 			//Enter ur API key
const fs = require('fs').promises; 	// Import fs.promises to read the audio file


const getTranscription = async (fileName) => {
    const audioFile = await fs.readFile(fileName);
    const form = new FormData();
    form.append('file', audioFile, fileName);
    form.append('model', 'whisper-1');
    const response = 
    await axios.post(
'https://api.openai.com/v1/audio/transcriptions', 
form,
{
      	headers: {
            	Authorization: `Bearer ${KEY}`,
            },
     	});
    return response.data.text;
};

const main = async () =>  {
    console.log('Running.......');
    console.log("\n==============\n   Transcription:");
    const transcriptionText = await getTranscription('A.wav');
    console.log(transcriptionText);
}


main();