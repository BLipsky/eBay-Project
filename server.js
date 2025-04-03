const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
app.use(cors({ origin: "http://127.0.0.1:5500" })); // Allow requests from Live Server
app.use(express.static("public")); // Serve static files

const EBAY_AUTH_TOKEN = 
"v^1.1#i^1#r^0#f^0#p^3#I^3#t^H4sIAAAAAAAA/+VZf2wbVx2P82uULZvQxoBuqJ67ddKqs9/9su+utcGOncSL0zh23Cytgnm+exe/+Hxn7r1L4iIgK1P/QBOgIYGGNjVAQaLr1GkSoG2ISYC0CgkqoBKwH2ITSGzSqo3RUfYHG3d2krphS5O4qJY4ybLue99fn++P9xMs9e+459jIsYsDvuu6l5fAUrfPx14PdvT37b2xp3tnXxdoYfAtL9251Hu059X9BFaNmpJDpGaZBPkXq4ZJlAYxGnBsU7EgwUQxYRURhapKPj6WUbggUGq2RS3VMgL+dDIakPkIH2GFkixIrAjDuks1V3VOWtFAmItEJCCXoBbmWcQD9zshDkqbhEKTRgMc4EQGCAzgJ1lREYEiCEFeCh8K+A8im2DLdFmCIBBruKs0ZO0WXzd2FRKCbOoqCcTS8aH8eDydTB2Y3B9q0RVbiUOeQuqQy98GLQ35D0LDQRubIQ1uJe+oKiIkEIo1LVyuVImvOrMN9xuhFktSGHERnpMiKkBS+KqEcsiyq5Bu7IdHwRqjN1gVZFJM61eKqBuN0hxS6crbAVdFOun3/iYcaGAdIzsaSCXi04V8Khfw57NZ25rHGtI8pCwrciIvCi7GmI0pqri/FRtNRSsRXmdk0DI17MWL+A9YNIFch9H6sAgtYXGZxs1xO65Tz5lWvsha+MAhL5/NBDq0bHopRVU3Bv7G65WDv1oNl/J/teohzIphUWZ1lXVbDyHx/evB6/Wt1UTMS0s8mw15vqASrDNVaFcQrRlQRYzqhtepIhtrCi/qHC/piNHCss4Isq4zJVELM6yOEECoVFJl6f+kNCi1ccmhaK081n9o4IsG8qpVQ1nLwGo9sJ6lMdKsFMMiiQbKlNaUUGhhYSG4wActezbEAcCG7hvL5NUyqsLAGi++MjODG2WhIleKYIXWa643i27VucbN2UCMt7UstGk9jwzDJazW7GW+xdZTPwDkoIHdCEy6JjoL44hFKNLagqaheayiItY6CxnHCZwYafQ6J/EA8G2BNKxZbI4hWrY6DGZqLJ7OtAXNHT4h7SxQLYMLkFYHIUFmQEQBoC2w8VotXa06FJYMlO6wVIocy3FsW/BqjtNpfTifKi6OZkZncwZuC5o36yoY6gq1Ksh835HU6/VrijWXGsql8iPFyfHR1IG20OaQbiNSnvSwdlqdxifio3H3GUsaNFXWpdoE/7lCJl1gS9NzdoYThyNodG+qEIKVcn5vJVVYSJcHTZpWa5Wp8uh8fHh+8OB4eCrhSBPRaFtByiPVRh02dE3WQyPJjFg/ZN47UuKtqWmdFkx76L6kvejMVWQuISXkMF9XwXShPfBjs53W6Ssz7lWYbSc/sMXXAHq9fi1A2s3GLDZGoaL71hbQ1GzHjde6KkqCKOusLAIIS7wehjJCkqB7jywIbU+/HYY3gcw5WMUmk8GEuhTCZHNJRpVUTtZ0FTCcykkaktQ25+VOS/PVmpaJt3v7H0Pzen2L8DwdxFUCazjorRyCqlUNWdChZY9UbHjt3wxTiLi7v2Bzt+9qDtoIapZp1LcjvAUZbM67+0XLrm/H4JrwFmSgqlqOSbdjbkV0CxK6Y+jYMLxDge0YbBHfipsmNOoUq2RbJrHpVRvZgkgN1hsANUxqXr9sStKlVZGtoiDWmoeK23HWRq5B2DhH247QFk2uuWxaFOtYbeogTomoNq5t3oumHq/XN9K1nXgQtxe2lLqmwKZMtUghDRl4Htn19rbjSMM2UmnRsXFnTRmrM2Uxg2ukUmfWzZyMMa/XaXvrIS+knXjKko3n81PjuWRb4JJovtMWP7IMQUQCiNFZGGGECIQMlJDAREQVimHBW/qJbWHe8Gip9/5XrgVoNiLwYVkUhE1vUtYRWk60/+seI3T5HWKsq/GwR30/B0d9P+v2+cB+cBe7G9zR31Po7blhJ8HUHeyhHiR41oTUsVGwguo1iO3um7vO3pjR7h/JvL1Ucn4ydeFTUtdAyxXm8gz4+Nol5o4e9vqWG01w+6UvfexNHxvgRCAAnhXdP+EQ2H3pay97a+8tod3WDPzFsR+cL8HDOfK3mZcTH34BDKwx+Xx9Xb1HfV17Hil+I/Whz/z1hLrv1JOJmYt/On3yhpc+/Uz/qds+cbNwty1+hX77k/IRadfp77x1y9/r+379zK1fevcLzi+HX/n98r96CvtuT9195uWhd899US68+c8h34P7zgi/uan71It/PPnGOz1/eHvonRO5aHn4tuCF4f7Ym98//O/ik4b0xo9iu7rOn2bFZ0sn1eerg88GzvMXnk7M9e2chnuqD98Z3fXec38+fMfTH/3IXPHVn/7KnJn+evbR145/83Xzrokfn33oL7qgfXU5DU4cv/hANvbQkbc++/gDP9xjvr6DmTx27oiY+MdzTx1/or549rXfzS06qee/+8JT6e89fPDRw+cei3wt9p705Ue+pfkHzOs+/+Jvk2deureZy/8AkkBG0FweAAA=";


// Fetch all inventory items

console.log("Using token:", EBAY_AUTH_TOKEN);
console.log("Authorization Header:", {
    Authorization: `Bearer ${EBAY_AUTH_TOKEN}`,
    "Content-Type": "application/json"
});

const fetchAllInventoryItems = async () => {
  const limit = 200; // Max items per page
  let allItems = [];
  let page = 1;
  let hasMoreItems = true;

  while (hasMoreItems) {
    const url = `https://api.ebay.com/sell/inventory/v1/inventory_item?limit=2&offset=0`;

    console.log(`Fetching page ${page}...`);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${EBAY_AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(`Error fetching data from eBay: ${response.status} ${response.statusText}`);
        const errorText = await response.text(); 
        console.error("Response Error:", errorText); // Logs the full error response
              }

      const data = await response.json();
      console.log("Raw eBay API Response:", data); // Log the full response for inspection

      allItems = [...allItems, ...(data.inventoryItems || [])];
      hasMoreItems = data.inventoryItems && data.inventoryItems.length === limit;
      page++;
    } catch (error) {
      console.error(`Error on page ${page}:`, error);
      throw error;
    }
  }
  console.log("Raw eBay API Response:", response); 
  return allItems;
};


app.get("/ebay-listings", async (_, res) => {
  console.log("Request received for /ebay-listings");
  try {
    const items = await fetchAllInventoryItems();
    console.log("Fetched items:", items); // Check if data is returned
    res.json(items); // Send items as response
  } catch (error) {
    console.error("Error fetching eBay listings:", error);
    res.status(500).send("Error fetching eBay listings.");
  }
});

const PORT = 4000; // Change to a different port, e.g., 4000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
