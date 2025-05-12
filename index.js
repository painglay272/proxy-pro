const express = require('express');
const request = require('request');
const app = express();

app.get('/', (req, res) => {
  res.send('Video Proxy Server Running');
});

app.get('/proxy', (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).send('No video URL provided');

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'video/mp4');

  request
    .get(videoUrl)
    .on('error', () => res.status(500).send('Error fetching video'))
    .pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
