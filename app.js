const fetchTweets = require("./fetchTweets");

const twitterAccounts = [
  "Mr_Derivatives",
  "warrior_0719",
  "ChartingProdigy",
  "allstarcharts",
  "yuriymatso",
  "TriggerTrades",
  "AdamMancini4",
  "CordovaTrades",
  "Barchart",
  "RoyLMattox",
];

const ticker = "$SPX"; // Example ticker symbol
const intervalMinutes = 15;

// Function to scrape data from Twitter
const scrapeTwitterAccount = async (account, ticker) => {
  try {
    const tweets = await fetchTweets(account);
    const regex = new RegExp(`\\${ticker}`, "ig");
    let matchesCount = 0;
    tweets.forEach((tweet) => {
      const matches = tweet.match(regex);
      if (matches) {
        matchesCount += matches.length;
      }
    });
    return matchesCount;
  } catch (error) {
    console.error(`Error fetching data from ${account}:`, error);
    return 0;
  }
};

// Function to scrape all accounts
const scrapeAllAccounts = async () => {
  let totalMentions = 0;
  for (const account of twitterAccounts) {
    const mentions = await scrapeTwitterAccount(account, ticker);
    totalMentions += mentions;
    console.log(`"${ticker}" was mentioned ${mentions} times on ${account}.`);
  }
  console.log(
    `"${ticker}" was mentioned ${totalMentions} times in the last ${intervalMinutes} minutes.`
  );
};

// Schedule the task
const intervalMillis = intervalMinutes * 60 * 1000;

const startScraping = () => {
  scrapeAllAccounts();
  setInterval(scrapeAllAccounts, intervalMillis);
};

// Start the scraping
startScraping();
