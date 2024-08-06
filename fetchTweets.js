const puppeteer = require("puppeteer");

async function fetchTweets(twitterUsername) {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const url = `https://twitter.com/${twitterUsername}`;

  // Navigate to the Twitter page
  await page.goto(url, { waitUntil: "networkidle0" });

  // Wait for the tweets to load
  await page.waitForSelector("article");
  //#id__vzh2m6xs21k

  // Extract tweets
  const tweets = await page.evaluate(() => {
    const tweetElements = document.querySelectorAll("article div[lang] span");
    const tweetTexts = [];
    tweetElements.forEach((tweet) => {
      tweetTexts.push(tweet.innerText);
    });
    return tweetTexts;
  });

  // Close the browser
  await browser.close();

  return tweets;
}

module.exports = fetchTweets;
