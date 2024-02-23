const express = require('express');
const scrapeAmazon = require('./scrapingScript');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

//Server route
app.get('/api/scrape', async (req, res) => {
  //Require keyword
  const keyword = req.query.keyword;

  
  if (!keyword) {
    return res.status(400).json({ error: 'Missing keyword parameter' });
  }

  try {
   
    const scrapedData = await scrapeAmazon(keyword);
    

    res.json(scrapedData);
  } catch (error) {
    //If error
    res.status(500).json({ error: 'Failed to scrape data from Amazon' });
  }
});

//Run the server on a local port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
