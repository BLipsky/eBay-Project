const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors({ origin: "http://127.0.0.1:5500" })); // Allow requests from Live Server
app.use(express.static('public'));  // Serve static files

const EBAY_AUTH_TOKEN = "v^1.1#i^1#r^0#f^0#p^1#I^3#t^H4sIAAAAAAAA/+VYe2xTVRhf23VkgWIEZTIxlMszkN5XX/de1pKOgh0UVuheLCq7j3O3u93e29xzalf/wG5xoAkRjJGgSECDAlHRMAiGBA1qYmJ8EBEl8RHRP0ANmhDJEiXGe7tudJMAsiYusf805zvf+c7v9zvfd865h8xXVS/dGts65LJNse/Pk3m7zUZNJaurnMumO+y1zgqyxMG2P78gX9nvuFQH+ZSa5jYCmNY1CNy9KVWDXMEYwjKGxuk8VCCn8SkAOSRyyci6OEfjJJc2dKSLuoq5G6IhTKBkliUZmfEBKSj4AqZVG4nZpIcwQAcEf4DiGUkWvIJPMvshzIAGDSJeQyGMJmm/h/R6aKaJCnIky3kpPBj0t2PuFmBARddMF5zEwgW4XGGsUYL15lB5CIGBzCBYuCGyOtkYaYiuWt9UR5TEChd1SCIeZeDY1kpdAu4WXs2Am08DC95cMiOKAEKMCA/PMDYoFxkBcwfwC1IHWB9FkYzkY/2MQPN8WaRcrRspHt0ch2VRJI9ccOWAhhSUu5WiphpCNxBRsbXeDNEQdVt/GzK8qsgKMELYqvrIpkgigYXrgdbNpxTNE1cgUrRO6ElsjHpERqRZSRZJDy3SjAQYsTjRcLSizONmWqlrkmKJBt3rdVQPTNRgrDYBzl+ijenUqDUaERlZiEr92BENA6YfMbKKGdSlWesKUqYQ7kLz1iswOhohQxEyCIxGGN9RkCiE8em0ImHjOwu5WEyfXhjCuhBKcwSRzWbxrBfXjU6CJkmKaFsXT4pdIGVmSG/KqvVhf+XWAzxKgYoIzJFQ4VAubWLpNXPVBKB1YmE/TdE0VdR9LKzweOs/DCWcibEVUa4KAZREBVhGFEiK5QUyUI4KCReTlLBwAIHPeVK80QNQWuVF4BHNPMukgKFInNcv015GBh4pwMoeHyvLHsEvBTyUDAAJgCCILPN/KpTbTfUkEA2AypLrZcvzphwRi8b9uXZtTUzw6q2bZNSsGavbokZvpruHpeuZejbgzYnkpubQ7VbDDcmvVBVTmSZz/nIIYNV6+USI6RABaUL0kqKeBgldVcTc5FpgryEleAPlkkBVTcOESEbS6Yby7NVlo/cvt4k7412+M+o/Op9uyApaKTu5WFnjoRmATyu4dQLhop4irFrXefP6YZk3F1BPiLdi3lwnFWuT5DBbRRq+cuIFujh8VMQNAPWMYd628UbrBtak9wDNPM+QoasqMFomlgFWPadSGcQLKphshV2GBFf4SXbYUkGfl2KoYHBivMTCUbp5sm1J5diKKx+8w2s1MfYjP1xR+FH9tvfIfts7dpuNrCMXUvPJeVWO5krHtFqoIIArvIxDpVMzv10NgPeAXJpXDPvMis+mx6W+WPxqXsicaP19BVPhKnlj2P8wed/oK0O1g5pa8uRAzrne46TuqnHRftJLmytOsl6qnZx/vbeSmlV5z5yLh3+6tNedse0dOoW7r+x8aMq+5aRr1Mlmc1ZU9tsqgKNj5ofVB797decj9lbfzu3Z87NWXNm7aMGBRfH365hftszelsi+9OY2u1M5/cHRT7/Gvlhc+2vj6Xs/+a2q77lY85Flx2qc2xIDK9bYvvl54R9qmzO5+6lru46HQpfn/XClzuU+JUb33f/40Y/mhwbauwcGHXcffvH0FmZPDTOjZ/nnzr6atSeeYGb0TT8kXnw2e+Zylp96/lrdM+d27Rlsfcx15gjxsTK7rcPxxoX+uceSJ7/cPO3CoHr4xwf+/OoA0RGbebaldencKW1Dnd8fevk45/1ryZLeq9jgyRfOMsZA/7mNz4d2dLy+oct18MnXthNDvm9rE4tOLX07O+fs7Au2WfPefeWtp3fnF68dXsu/Aew4xJ39EQAA";

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
