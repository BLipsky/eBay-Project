const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors({ origin: "http://127.0.0.1:5500" })); // Allow requests from Live Server
app.use(express.static("public")); // Serve static files

const EBAY_AUTH_TOKEN = 
"v^1.1#i^1#r^0#f^0#p^3#I^3#t^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";

// Fetch all inventory items
const fetchAllInventoryItems = async () => {
  const limit = 200; // Max items per page
  let allItems = [];
  let page = 1;
  let hasMoreItems = true;

  while (hasMoreItems) {
    const url = `https://api.ebay.com/sell/inventory/v1/inventory_item`;

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
        throw new Error(`Error fetching inventory items: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("eBay API Response:", data); // Log the full response

      allItems = [...allItems, ...(data.inventoryItems || [])];
      hasMoreItems = data.inventoryItems && data.inventoryItems.length === limit;
      page++;
    } catch (error) {
      console.error(`Error on page ${page}:`, error);
      throw error;
    }
  }

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

