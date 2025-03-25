const express = require("express");
const cors = require("cors");

const app = express();  // ✅ Define `app` BEFORE calling `app.use(cors())`

app.use(cors());  // ✅ Now it's safe to use


const EBAY_AUTH_TOKEN = "v^1.1#i^1#f^0#I^3#p^1#r^0#t^H4sIAAAAAAAA/+VYe2wURRjv9a41DZRHAOVhzLHYgJLbm929vd6u3OG1R+lJ4QrXBz1B3Mds2fZu99iZoz0NeNQEiERNFMLDRItRQsBHQjSYEDRCiM+GEBpFBNQ/UNKoUSMYNAF3745yrQSQXmIT95/NfvPNN7/fb75vZnZAprziwY31G/+otN1V2psBmVKbjRoDKsrL5o6zl04vKwEFDrbezP0ZR4/9wjwkJOJJfhlESV1D0NmdiGuIzxr9RMrQeF1AKuI1IQERjyU+GlzcwNMk4JOGjnVJjxPOcMhPeEShmhVFiuGkakmoVkyrdi1mk+4nJFmhBdbjESHDCJzCmO0IpWBYQ1jQsJ+gAc26AOOi2SaK5WmGBwzJeD0xwtkCDaTqmulCAiKQhctn+xoFWG8OVUAIGtgMQgTCwbpoJBgOLVjSNM9dECuQ1yGKBZxCQ79qdRk6W4R4Ct58GJT15qMpSYIIEe5AboShQfngNTB3AD8rNSN5vF6P6PMAwPgEj6coUtbpRkLAN8dhWVTZpWRdeahhFadvpaiphtgBJZz/WmKGCIec1mtpSoirigoNP7GgJtgWbGwkAjVQ6xASquZqUBFWtXbkalwWckk+ieZkRQIuWqJ9MvRJ+YFy0fIyDxupVtdk1RINOZfouAaaqOFwbagCbUyniBYxggq2EBX6VV/TkGVj1qTmZjGFV2vWvMKEKYQz+3nrGRjsjbGhiikMByMMb8hK5CeEZFKVieGN2VzMp0838hOrMU7ybndXVxfZxZC60e6mAaDcyxc3RKXVMCEQpq9V6zl/9dYdXGqWigTNnkjlcTppYuk2c9UEoLUTAZamaJrK6z4UVmC49R+GAs7uoRVRrAqRWSAqHs4LJPPNsWwxKiSQT1K3hQOKQtqVEIxOiJNxQYIuycyzVAIaqswzrEIzPgW6ZC+nuDycorhEVva6KAVCAKEoSpzv/1Qot5vqUSgZEBcl14uW501pd32ogU3HtEfqRUZvbVNws2bULQ8Z3amOTo6u8dVwXiYtgbZm/+1Www3J18ZVU5kmc/xiCGDVevFEqNcRhvKI6EUlPQkb9bgqpUfXBDOG3CgYOB2F8bhpGBHJYDIZLs5aXTR6/3KZuDPexduj/qP96YaskJWyo4uV1R+ZAYSkSlo7ECnpCbdV67pgHj8s86os6hHxVs2T66hibZLMsVXl3JGTzNIl0VqJNCDSU4Z52iYj1gmsSe+EmrmfYUOPx6HRMrIMsOo5kUhhQYzD0VbYRUhwVRhlmy1V7aE5ykv5mBHxkrJb6arRtiQVYyl2LLzDY7V76E9+oCT7UD22I6DH9n6pzQbmgSpqFphZbm922MdORyqGpCooJFLbNfPf1YBkJ0wnBdUonVRyfFyDvKG+4WJGTB1s/X2+r6Sy4I6hdyWYOnjLUGGnxhRcOYB7r7eUUePvqaRZwNAsxdIMYGJg1vVWB3W3Y/K6iU9vGCg50Pv59jdX9M9Z/viPV7wLQeWgk81WVuLosZXMHDs+1vbB/C31e8Nk19Lm9z7dcXrjd5HWtcIK7egZ8WJk//7EtJe+33z0nO2jyWRH7Nf+9N4np6TmNn946Z0p8O1lu+ccefiF4NRHvz0548SXM6dVv7sz9rX/0NnI1T1rLr01MGXP7Ademf5q/5kdD4EJ546+Nj/xYtXOdT/5v2jrPz/p9IQrW2ZUTV3l++ZkZjbXUrv58PpFL5963RHo8194LvrZob7DC7ed+e2+A7t89t3n17yxacB5hAxt7V+5qG+f99lTX5HhlmNloY83PB/ffmHX2YrxrY/xzxzkesbpWweO+deXO+0XJ67ZvOnE1dC2yz8/wT91bvtfP5z+Zbb/8r5P/mzs43bIkzqOz/BXBXNz+TdhRtzf/REAAA=="; // Replace with actual OAuth token

app.get("/ebay-listings", async (_, res) => {
    try {
        const response = await fetch(
            "https://api.ebay.com/buy/browse/v1/item_summary/search?q=laptop",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${EBAY_AUTH_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error(`eBay API error: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching eBay listings:", error);
        res.status(500).json({ error: "Failed to fetch eBay listings" });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
app.get("/", (_, res) => {
    res.send("Welcome to the eBay Listings API");
});
