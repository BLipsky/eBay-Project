const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors({ origin: "http://127.0.0.1:5500" })); // Allow requests from Live Server
app.use(express.static("public")); // Serve static files

const EBAY_OAUTH_TOKEN =
"v^1.1#i^1#p^3#I^3#f^0#r^0#t^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"
// Fetch all inventory items
const fetchAllInventoryItems = async () => {
  const sellerId = "salesbyzuki"; // eBay seller ID
  const limit = 200; // Max items per page
  let allItems = [];
  let page = 1;
  let hasMoreItems = true;

  while (hasMoreItems) {
    const url = `https://api.ebay.com/sell/inventory/v1/inventory_item?limit=${limit}&page=${page}&seller=${sellerId}`;
    console.log(`Fetching page ${page}...`);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${EBAY_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error fetching inventory items: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(
        `Fetched ${data.inventoryItems?.length || 0} items on page ${page}`
      );

      allItems = [...allItems, ...(data.inventoryItems || [])];

      // Check if there are more items to fetch
      hasMoreItems =
        data.inventoryItems && data.inventoryItems.length === limit;
      page++;
    } catch (error) {
      console.error("Error fetching inventory items on page", page, error);
      throw error;
    }
  }

  return allItems;
};

app.get("/ebay-listings", async (_, res) => {
  try {
    const items = await fetchAllInventoryItems();
    console.log("Total Items Fetched:", items.length); // Log the total number of items fetched
    res.json(items); // Send all items as the response
  } catch (error) {
    console.error("Error fetching eBay listings:", error); // Log full error details
    res.status(500).json({ error: error.message }); // Return the actual error message to the client
  }
});
app.listen(4000, () => console.log("Server running on port 4000"));
