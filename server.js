const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors({ origin: "http://127.0.0.1:5500" })); // Allow requests from Live Server
app.use(express.static('public'));  // Serve static files

const EBAY_AUTH_TOKEN = "v^1.1#i^1#f^0#I^3#p^1#r^0#t^H4sIAAAAAAAA/+VYb2wURRTv9dpKrcUoFir4oWzBVGT3Znfvz96md+Tao7RS6NnrQako2ZudbZfe7V525mivxKRUU6OBYIQQNWgwkoiSaCIxxWqB8MVoNCCECCGIaIj4BUNBagwEd++Ocq0EkF5iE+/LZd68efP7/ea9mdkB/SWliwYbB8fKbQ8U7uoH/YU2G1sGSkuKn55pL5xbXAByHGy7+hf0Fw3YL9RiKR5LiK0IJ3QNo6reeEzDYtroo5KGJuoSVrGoSXGERQLFcGBFs8gxQEwYOtGhHqOqmoI+CkGWRZyX9SKPh/N4FdOq3YzZppv9spsVZE5yQ8R7JCc0+zFOoiYNE0kjPooDnIsGPM0JbaxTdHGii2d4ADqoqlXIwKqumS4MoPxpuGJ6rJGD9c5QJYyRQcwglL8p0BBuCTQFl65sq3XkxPJndQgTiSTxxFa9LqOqVVIsie48DU57i+EkhAhjyuHPzDAxqBi4CeY+4Kel5hEbdULAQcWruLwI5EXKBt2IS+TOOCyLKtNK2lVEGlFJ6m6KmmpE1yNIsq2VZoimYJX192xSiqmKigwftbQusCYQClH+OqStl+KqRjermKhaJ6ZDrUEaCpDzygoENAc5QUYCzE6UiZaVedJM9bomq5ZouGqlTuqQiRpN1saZo43p1KK1GAGFWIhy/dxZDTkv32EtamYVk6RLs9YVxU0hqtLNu6/A+GhCDDWaJGg8wuSOtEQ+SkokVJma3JnOxWz69GIf1UVIQnQ4enp6mB6e0Y1OBwcA62hf0RyGXSguUaavVesZf/XuA2g1TQUicyRWRZJKmFh6zVw1AWidlN/FsRzHZnWfCMs/2foPQw5nx8SKyFeFuIGZMS634HF6nLIn6slHhfizSeqwcKColKLjktGNSCImQURDM8+ScWSossi7FI4XFETLbq9CO72KQkddsptmFYQAQtEo9Ar/p0K511QPI2ggkpdcz1uet6UcjcFmV6pDe6Yxyuur1ygkohkN7UGjN7m+28vVCXVeN5+CYE3Ed6/VcFvy9THVVKbNnD8fAli1nj8RGnVMkDwlemGoJ1BIj6kwNb0WmDfkkGSQVBjFYqZhSiQDiURTfvbqvNH7l9vE/fHO3xn1H51Pt2WFrZSdXqys8dgMICVUxjqBGKjHHVat65J5/bDM69Kop8RbNW+u04q1STLDVpUzV04mTZfBGyBjIKwnDfO2zbRYN7A2vRtp5nlGDD0WQ8aqqWWAVc/xeJJI0RiaboWdhwRXpWl22LIeJ896eJeHnxIvmD5K1023LSkfW3HRsvu8VjsmfuT7C9I/dsB2GAzYDhTabKAWLGSrwfwSe6TI/tBcrBLEqJLCYLVTM79dDcR0o1RCUo3CWQVHZjbLmxqb/+iPJodWX1kiFJTnvDHseh5Ujr8ylNrZspwnB/DErZ5i9uE55ZwL8JzAOl2ci+8A1bd6i9jZRY9tP/FgTfzyYKSm2r9o7ebFH3xS+W4XKB93stmKC4oGbAX1ytibfyW3jc3qFI3KVvfBS6XzjozNernnyGej7nP7vtlY01e6h7/aN/LGQMvskY9P7Y/Q7Tu3DFWM1u6MbDl0bcu+81dObt69+/w7p0rYlprrV04Mf39h4Y0FOz8dfrWze0Q4WfHWt/Ydw18+Ujtv9KtXvuj96OjgdebzvQeGft70NbkIzng7u869ENj7y3t/vtT7mqdv0/H2388sOtswtIRbew0oiyvW/vRUWWT5nOHdPxw7diP2HH91x3clq0+r3Ghp3w6uJLV3a+TH9yOHXxQWl7lD27bbHZcVekbo+Nuth4RHl79+8exvp/bfqDxa8eSvlwo3nN4Y3Hr08WIAoeD7cMaykfnOY8KeuQcza/k3jp4EB/0RAAA=";

const fetchAllItems = async (url) => {
    let allItems = [];
    let currentUrl = url;

    while (currentUrl) {
        const response = await fetch(currentUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${EBAY_AUTH_TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching eBay listings: ${response.statusText}`);
        }

        const data = await response.json();
        allItems = allItems.concat(data.itemSummaries); // Accumulate all items
        currentUrl = data.pagination?.next; // Get next page URL, if any
    }

    return allItems;
};

app.get("/ebay-listings", async (_, res) => {
    try {
        const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?seller_ids=salesbyzuki`; // eBay API URL to get seller items
        const items = await fetchAllItems(url);  // Fetch all items from the seller
        res.json(items);  // Send all items as the response
    } catch (error) {
        console.error("Error fetching eBay listings:", error);
        res.status(500).json({ error: "Failed to fetch eBay listings" });
    }
});

app.listen(4000, () => console.log("Server running on port 4000"));
