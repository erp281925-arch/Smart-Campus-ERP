const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const puppeteer = require('puppeteer');
const gTTS = require('gtts'); // ✅ STABLE TTS
const https = require('https');
const { execSync } = require('child_process');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/videos', express.static('videos'));

// 🔑 Replace with your real Mistral API Key
const MISTRAL_API_KEY = 'xGrzqUd5CFMlXtJ4ZOc9xYXMr2RYH0vF';

// STEP 1: Generate educational content
async function generateContent(topic, duration) {
  const prompt = `Create a structured educational explanation on "${topic}" to be explained in about ${duration}. Include key concepts, subtopics, and examples.`;

  const response = await axios.post(
    'https://api.mistral.ai/v1/chat/completions',
    {
      model: 'mistral-medium',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    },
    {
      headers: {
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content;
}

// STEP 2: Generate slide image
async function generateSlideImage(title, content, outputPath) {
  const htmlTemplate = fs.readFileSync('templates/slide.html', 'utf-8');
  const slideHtml = htmlTemplate
    .replace('{{TITLE}}', title)
    .replace('{{CONTENT}}', content);

  const htmlFilePath = `slides/${Date.now()}-slide.html`;
  fs.writeFileSync(htmlFilePath, slideHtml);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('file://' + path.resolve(htmlFilePath));
  await page.setViewport({ width: 1280, height: 720 });
  await page.screenshot({ path: outputPath });
  await browser.close();
}

// ✅ STEP 3: Generate audio using GTTS
async function generateAudio(text, outputPath) {
  const chunks = text.match(/.{1,200}(\s|$)/g); // max 200 char chunks
  const tempFiles = [];

  for (let i = 0; i < chunks.length; i++) {
    const tempPath = `audio/temp-${i}.mp3`;
    const tts = new gTTS(chunks[i], 'en');

    await new Promise((resolve, reject) => {
      tts.save(tempPath, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    tempFiles.push(tempPath);
  }

  const concatList = 'audio/concat.txt';
  fs.writeFileSync(concatList, tempFiles.map(f => `file '${path.resolve(f)}'`).join('\n'));

  execSync(`ffmpeg -y -f concat -safe 0 -i ${concatList} -c copy ${outputPath}`);

  tempFiles.forEach(f => fs.unlinkSync(f));
  fs.unlinkSync(concatList);
}

// STEP 4: Merge slide + audio to video
function mergeToVideo(imagePath, audioPath, outputPath) {
  const cmd = `ffmpeg -y -loop 1 -i ${imagePath} -i ${audioPath} -shortest -c:v libx264 -c:a aac -pix_fmt yuv420p ${outputPath}`;
  execSync(cmd);
}

// Endpoint: Generate video
app.post('/generate-video', async (req, res) => {
  const { topic, duration } = req.body;
  console.log('🎯 Request:', topic, duration);

  try {
    const content = await generateContent(topic, duration);
    console.log('✅ Content generated');

    const slideImagePath = `slides/${Date.now()}-slide.png`;
    await generateSlideImage(topic, content, slideImagePath);
    console.log('✅ Slide created');

    const audioPath = `audio/${Date.now()}-narration.mp3`;
    await generateAudio(content, audioPath);
    console.log('✅ Audio created');

    const videoPath = `videos/${Date.now()}-video.mp4`;
    mergeToVideo(slideImagePath, audioPath, videoPath);
    console.log('✅ Video created');

    res.json({ videoUrl: `/videos/${path.basename(videoPath)}` });

  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ error: 'Video generation failed.' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
