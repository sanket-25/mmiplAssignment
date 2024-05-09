const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const FormData = require('form-data');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());


const mongoURI = 'mongodb+srv://2022sanketdhuri:WKm6WEKmHe80Mgql@cluster0.91iy5uo.mongodb.net/iot';
const APIKey = process.env.API_KEY;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/hi', (req, res) => {
    res.json({ "hi": "hello" });
});

const dataSchema = new mongoose.Schema({
    userInput: {
        type: String,
        required: true
    },
    openAIResponse: {
        type: Object  
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Data = mongoose.model('Data', dataSchema, 'Chats');

app.post('/api/chat', async (req, res) => {
    const { content } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant.'
                },
                {
                    role: 'user',
                    content: content
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${APIKey}`
            }
        });

        const assistantResponse = response.data.choices[0].message.content;

        const newData = new Data({
            userInput: content,
            openAIResponse: response.data
        });
        await newData.save();

        res.json({ responseChat: assistantResponse });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error calling OpenAI API');
    }
});




const { Schema, model } = require('mongoose');

const audioSchema = new mongoose.Schema({
    userInput: {
        type: String,
        required: true
    },
    openAIResponse: {
        type: Object 
    },
    audioUrl: {
        type: String,
        required: true
    },
    audioDownloadUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Audio = mongoose.model('Audio', audioSchema, 'Audio');

app.post('/api/audio', async (req, res) => {
    const { content } = req.body;

    try {
        const chatCompletionResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant.'
                },
                {
                    role: 'user',
                    content: content
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${APIKey}`
            }
        });

        const chatCompletionData = chatCompletionResponse.data;

        const textToSpeechResponse = await axios.post('https://api.openai.com/v1/audio/speech', {
            model: 'tts-1',
            input: chatCompletionData.choices[0].message.content,
            voice: 'alloy'
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${APIKey}`
            },
            responseType: 'arraybuffer'
        });

        const fileName = uuidv4() + '.mp3';

        const audioContent = Buffer.from(textToSpeechResponse.data, 'binary');
        const downloadUrl = await uploadFileToGitHub(fileName, audioContent, content, chatCompletionData);

        const audioUrl = `https://sanket-25.github.io/cdn/${fileName}`;
        const newAudio = new Audio({
            userInput: content,
            openAIResponse: chatCompletionData,
            audioUrl: audioUrl,
            audioDownloadUrl: downloadUrl
        });
        await newAudio.save();
        
        res.json({ audioUrl: audioUrl, audioDownloadUrl: downloadUrl });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error generating audio');
    }
});

const githubToken = process.env.GITHUB_TOKEN;

async function uploadFileToGitHub(fileName, fileContent, userInput, openAIResponse) {
    const accessToken = githubToken;
    const repositoryOwner = 'sanket-25';
    const repositoryName = 'cdn';
    const apiUrl = `https://api.github.com/repos/${repositoryOwner}/${repositoryName}/contents/${fileName}`;

    try {
        const response = await axios.put(apiUrl, {
            message: `[mmiplAssignment]:${userInput}? -> ${openAIResponse.choices[0].message.content}`,
            content: Buffer.from(fileContent).toString('base64'), 
            branch: 'main' 
        }, {
            headers: {
                Authorization: `token ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.content.download_url;
    } catch (error) {
        console.error('Error uploading file to GitHub:', error);
        throw error;
    }
}
