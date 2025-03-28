const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors({ origin: "http://127.0.0.1:5500" })); // Allow requests from Live Server
app.use(express.static('public'));  // Serve static files

const EBAY_AUTH_TOKEN = "v^1.1#i^1#p^1#r^0#f^0#I^3#t^H4sIAAAAAAAA/+VYf2wTVRxf1w4cYyNmigR/lQOJmd717vrzzrba0o2VFFZpB2wJkuvdu3Fb7wf3Xt1qQiiLDqMSfyQSEiEsaPxBIAiJQAANSIiJ0SA4o0YS0YgsYiAhgGKM8e5aRjcJIGviEvtP877v+77v8/m87/e9d48sTKptGmgd+K3eNrl6sEAWqm02qo6snVTzSIO9emZNFVnmYBsszCk4+u3DQcjJWY1dDKCmKhA4++SsAlnLGMJyusKqHJQgq3AygCzi2VRkYYKlCZLVdBWpvJrFnPFYCGNExid4eY8X0AwFON6wKldjptUQRmcyQsYjCH4BeD1eX8DohzAH4gpEnIKMfpL24qQbpwNpys+SNEt5CMrr68ScS4AOJVUxXAgSC1twWWusXob1xlA5CIGOjCBYOB5pSbVF4rHmRemgqyxWuKRDCnEoB0e35qkCcC7hsjlw42mg5c2mcjwPIMRc4eIMo4OykatgbgO+JbXfTzIcLfrcHpKmGa+/IlK2qLrMoRvjMC2SgIuWKwsUJKH8zRQ11Mh0Ax6VWouMEPGY0/x7MsdlJVECeghrjkY6IskkFo4CpZuTJQVPSBBJShfEk4tjOB/gaUYQeRKneToggABfmqgYrSTzmJnmqYogmaJB5yIVRYGBGozWxsd6y7QxnNqUNj0iIhNRuR9zVUNPoNNc1OIq5tBKxVxXIBtCOK3mzVdgZDRCupTJITASYWyHJVEI4zRNErCxnVYultKnD4awlQhprMvV29tL9LoJVe9y0SRJuZYtTKT4lUDmMMPXrPWiv3TzAbhkUeGBMRJKLMprBpY+I1cNAEoXFvbSFE1TJd1HwwqPtf7DUMbZNboiKlUhHE1mgJE1otvDmbtRJSokXEpSl4kDZLg8LnN6D0BaluMBzht5lpOBLgms2yvS7oAIcMHHiLiHEUU84xV8OCUCQAKQyfBM4P9UKLea6inA6wBVJNcrlufpvKs1lvDmO5UFrRm3urRDRO2K3rIspvflunsYOhqIMj53nic72kO3Wg3XJT8vKxnKpI35KyGAWeuVE6FVhQgI46KX4lUNJNWsxOcn1gK7dSHJ6SifAtmsYRgXyYimxSuzV1eM3r/cJm6Pd+XOqP/ofLouK2im7MRiZY6HRgBOkwjzBCJ4VXaZta5yxvXDNK+wUI+Lt2TcXCcUa4Nkka0kFK+chEWXgE/zhA6gmtON2zbRZt7A0moPUIzzDOlqNgv0JePLALOeZTmHuEwWTLTCrkCCS9wEO2wpv8dNBSi32zMuXrx1lK6YaFtSJbZix/zbvFa7Rn/kh6usH9Vv+5jst31UbbORQfIhajY5a5K93WGfOhNKCBASJxJQ6lKMb1cdED0gr3GSXt1YdawhIaxtTVwqZHJ7l158PFBVX/bGMLicnDHyylBrp+rKnhzI+6711FDT7qmnvaSbDlB+kqY8neTsa70Oarrjrp2ZtduODNUp/fxX4ciaRsg6Jw+T9SNONltNlaPfVhV8dQ/xhB1Dr33yMjftp+bUw05i+qGTJ05EDx59brO24tAr63u0C7Yf9uCYMpT2f+GM6gX/1JpH/xxsku84vHPK74XmRO/nmx3y8Y5nz7++v79u+LGBNY27mjcN7Kk/c3bjp2s+tO9m4u0t+Kmh8/KBafL2dec2vDQl+80x/1Mzap8J/qW98eD+HS9+e+e+75rmMDO4S1ufh2u7N+wL+5OdP873XX7ry+Sqo+8z757cjfOnHC80LX8HYcMNd+9q21E4Ejx4uvHMhQXUlqbC1jfPbr7/ynt9b5+/2ClumXX4s2V7P/h6sv1neGXdnNUPbLv8yxFmrvb9vUPHF8b+WOXbvvr0rwfObTs7N9iwaWNxLf8GDXs32v0RAAA=";

// Fetch all inventory items
const fetchAllInventoryItems = async () => {
    const sellerId = "salesbyzuki";  // eBay seller ID
    const limit = 200;  // Max items per page
    let allItems = [];
    let page = 1;
    let hasMoreItems = true;

    while (hasMoreItems) {
        const url = `https://api.ebay.com/sell/inventory/v1/inventory_item?limit=${limit}&page=${page}&seller=${sellerId}`;
        console.log(`Fetching page ${page}...`);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${EBAY_AUTH_TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching inventory items: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`Fetched ${data.inventoryItems?.length || 0} items on page ${page}`);

        allItems = [...allItems, ...(data.inventoryItems || [])];

        // Check if there are more items to fetch
        hasMoreItems = data.inventoryItems && data.inventoryItems.length === limit;
        page++;
    }

    return allItems;
};


app.get("/ebay-listings", async (_, res) => {
    try {
        const items = await fetchAllInventoryItems();
        console.log("Total Items Fetched:", items.length);  // Log the total number of items fetched
        res.json(items);  // Send all items as the response
    } catch (error) {
        console.error("Error fetching eBay listings:", error); // Log full error details
        res.status(500).json({ error: error.message });  // Return the actual error message to the client
    }
});
app.listen(4000, () => console.log("Server running on port 4000"));
