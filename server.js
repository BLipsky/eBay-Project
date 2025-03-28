const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors({ origin: "http://127.0.0.1:5500" })); // Allow requests from Live Server
app.use(express.static('public'));  // Serve static files

const EBAY_AUTH_TOKEN = "v^1.1#i^1#I^3#f^0#r^0#p^1#t^H4sIAAAAAAAA/+VYbWwURRjufRRT8Sj4UbFK0i71E3Z3du+2t7f2Dq/XYg9KW7h+QEHJfsy2S+92LztztmdUSjGIUTQxalRMQI3+MBCjQWoiCpqIRoklJKIGiQVighA0qYgiRN29O8q1EkB6iU28P5d55513nueZ952ZHdA/peSudQ3rfvM4rnJu7gf9ToeDmQpKphTPmeZylhcXgTwHx+b+qn73gOtoDRIT8aSwBKKkoSNY0ZeI60jIGINEytQFQ0QaEnQxAZGAZSEWXtQosBQQkqaBDdmIExXRuiDBcjL0+/wsz8oBnlM4y6qfi9lqBAnO7/fxilcV/dWST2J8Vj9CKRjVERZ1bI0HLEcCL8nyrUy1wAEBsJSP8XYSFe3QRJqhWy4UIEIZuEJmrJmH9eJQRYSgia0gRCganh9rDkfr6ptaa+i8WKGcDjEs4hQa24oYCqxoF+MpePFpUMZbiKVkGSJE0KHsDGODCuFzYK4AfkZqH1QYnygzPoXjoU/lCyLlfMNMiPjiOGyLppBqxlWAOtZw+lKKWmpIq6CMc60mK0S0rsL+W5wS45qqQTNI1NeGl4VbWohQLdRXiQlNJxs1hDW9C5EtS+pImZfZgKLKgGRlllcgL+cmykbLyTxupoihK5otGqpoMnAttFDD8dr48rSxnJr1ZjOsYhtRvh9/TkPAd9qLml3FFO7W7XWFCUuIikzz0iswOhpjU5NSGI5GGN+RkShIiMmkphDjOzO5mEufPhQkujFOCjTd29tL9Xopw+yiWQAYeumixpjcDRMiYfnatZ711y49gNQyVGRojUSagNNJC0uflasWAL2LCHEsw7JMTvexsELjrf8w5HGmx1ZEoSpEAX6Rl3x8gOFYn58LFKJCQrkkpW0cUBLTZEI0eyBOxkUZkrKVZ6kENDVF8HIq6+VVSCrVAZX0BVSVlDilmmRUCAGEkmRtkP+nQrncVI9B2YS4ILlesDxvTdMNdY1culNf0CB5jY5lKm7TzflL68y+1KqeAFvL1waqvWkZLGsLXm41XJB8JK5ZyrRa8xdCALvWCydCg4EwVCZELyYbSdhixDU5PbkW2GsqLaKJ0zEYj1uGCZEMJ5PRwuzVBaP3L7eJK+NduDPqPzqfLsgK2Sk7uVjZ45EVQExqlH0CUbKRoO1aN0Tr+mGbV2ZQT4i3Zt1cJxVri2SWraZkr5xUhi6FHpApEyIjZVq3barZvoG1Gj1Qt84zbBrxODTbJ5YBdj0nEiksSnE42Qq7AAmuiZPssGX8Pi/Dg2rAToiXnDlKV062LakQW7H73iu8VtNjP/JDRZkfM+D4GAw4PnQ6HKAG3MrMBpVTXG1u1zXlSMOQ0kSVQlqXbn27mpDqgemkqJnO64qGpjUqaxoaf+2XUoMdJ+fxRZ68N4bN94GZo68MJS5mat6TA7jlfE8xU3qjh+WAl+WZag4AthPMPt/rZsrc16cOHt24w/nkjH189+47DkiPVnbMWww8o04OR3GRe8BRtGPD3pPHtXvWzBSHd6x3CUeiN3tqfp4ncQfurjzVs/bRz4n4HPX3b6JrR47Vxzr2jNy0cfnt04MzN137xuCWN7cy/Z5db2851D5If+aesfrs001/TV9+4o+1H2wq+3b960fPPu4Z2X2nfvDTV7a5E0+1cZH60u/2n/5zxc7Y4fecC8ufnUHNPXH4tTnDV7+1cOtXp4ed1I8tZzZ8cbzJLDvy3PpHDh0qe3ibupoZHN4yQC5IHv7phSHaI9Xvj5ScfAjsfueJ2146sGdW2/03tD24t/z53i9fpt/9JLp8HT33hxXHqlylj5nv//JReST94plZrmdOfN9QenzXyNfiqVdrK7c3RtXZ24f6tg3tjFRV7cuu5d+GZz4K/REAAA==";

// Fetch all inventory items
const fetchAllInventoryItems = async () => {
    const sellerId = "salesbyzuki"; // Your eBay store ID
    const limit = 200; // Max items per page
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

        console.log(`Status: ${response.status} - ${response.statusText}`);

        if (!response.ok) {
            throw new Error(`Error fetching inventory items: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`Fetched ${data.inventoryItems.length} items on page ${page}`);

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
        console.error("Error fetching eBay listings:", error);
        res.status(500).json({ error: "Failed to fetch eBay listings" });
    }
});

app.listen(4000, () => console.log("Server running on port 4000"));
