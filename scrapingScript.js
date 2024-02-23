const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeAmazon(keyword) {
  try {
    //HTTP solicitation
    const response = await axios.get(`https://www.amazon.com/s?k=${keyword}`);
    
    //Load the html data  
    const $ = cheerio.load(response.data);
    
    //Array for storage
    const products = [];

    //Find the products
    $('.s-result-item').each((index, element) => {
      //Extract the product details
      const title = $(element).find('h2').text().trim();
      const rating = $(element).find('.a-icon-star-small').attr('aria-label');
      const numReviews = $(element).find('.a-spacing-top-micro').text().trim();
      const imgUrl = $(element).find('img').attr('src');

      //ADD the details to the array
      products.push({ title, rating, numReviews, imgUrl });
    });

    //Return as a JSON object
    return products;
  } catch (error) {
    //If error
    throw new Error('Failed to scrape data from Amazon: ' + error.message);
  }
}

module.exports = scrapeAmazon;