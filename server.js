const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors({ origin: "http://127.0.0.1:5500" })); // Allow requests from Live Server
app.use(express.static("public")); // Serve static files

const EBAY_AUTH_TOKEN = 
"v^1.1#i^1#I^3#f^0#r^0#p^3#t^H4sIAAAAAAAA/+VZf2wbVx2PE6dr2FI0CtsYhXluq1Wrzn5357PvjtqVUzvEq9O4tvNzGub57p3z4vOdde+dExcksqrqhMQ2aaiwsbEWwTQJoY1J7ToNUcakAWKISRNo0oQQQ0hsfxSkrd3YNAR3dpK6YUtju6iWOMmy7t331+f7vj/eD7C8ZejO42PH3xv2XNd/ahks93s87PVgaMvg3m0D/bcO9oEWAs+p5V3L3qMDb+4jsKJX5SwiVdMgyLdU0Q0iNwajftsyZBMSTGQDVhCRqSLn4uNpmQsAuWqZ1FRM3e9LJaJ+yPOSFhaLPJQ4XtU0Z9RYlZk3o35B41iooKKkSmJIE1jnOyE2ShmEQoNG/RzgBAaEGMDmWV5mOVngA1JYmPP7ppBFsGk4JAHgjzXMlRu8VoutG5sKCUEWdYT4Y6n4aG4inkokD+X3BVtkxVb8kKOQ2uTytwOminxTULfRxmpIg1rO2YqCCPEHY00NlwuV46vGdGB+w9VsKMTBsCQgx5NSiBWviitHTasC6cZ2uCNYZbQGqYwMimn9Sh51vFFcQApdeTvkiEglfO7fYRvqWMPIivqTI/HZyVwy6/flMhnLrGEVqQ2krMAJvBASw/6YhSkqO78VHU1BKx5ep+SAaajY9RfxHTLpCHIMRuvdAlrc4hBNGBNWXKOuMa10wpr7wJw7n80JtOm84U4pqjg+8DVer+z81Wi4NP9XKx7CRQlJKAQlwIZASA1/dDy4ud5eTMTcaYlnMkHXFlSEdaYCrTKiVd1JZEZx3GtXkIVVmXeSmxc1xKhhSWNCkqYxRUENM6yGEECoWFQk8f8kNCi1cNGmaC081n9o4Iv6c4pZRRlTx0rdv56kUWlWgmGJRP3zlFblYHBxcTGwyAdMqxTkAGCDM+PpnDKPKtC/RouvTMzgRlgoyOEiWKb1qmPNkhN1jnKj5I/xlpqBFq3nkK47A6sxe5ltsfWjHwPygI4dD+QdFb2FccwkFKldQVNRDSuogNXeQsZxIU6INHKdE3kA+K5A6mYJG+OIzps9BtMtCKlEV9ic+glpb6FqqS4gvFqFQJgBERmArsDGq9VUpWJTWNRRqsfmUuBYjmO7gle17V5LxFqysHQwfbCU1XFX0Ny2K2OoydQsI+OjSqmb69cWazY5mk3mxgr5iYPJQ12hzSLNQmQ+72LttTiNH44fjDvPeEpbMMaLhxG/kJ6y9i7N0jnWELixdF5ZKs/WkjjNWsFcbSY+ZyxFpFCQPzKK+Ink4YmyOMFr5AhXika7clIOKRbqsdKVrwfHEmmhPmfcNVbkzelZjU4a1uhMwlqyF8oSNyKOSGG+roDZye7Aj5d6LdNXWu5VaLf5j0vxNYBurl8TkFYzMQuNKlRw3roCmiz1XL1WIyorsApiJQHAIgsFQYEhiRU15wlzINx1++0xvCPIWIAVbDBpTKgzQphMNsEoosJJqqYAhlM4UUWi0mVf7rVpvlptmbjbt/8tNDfX24XnyiCOEFjFAXflEFDMStCENp13hwoNq32bIQoSZ/sXaG73HckBC0HVNPR6J8xt8GCj5mwYTaveicI15jZ4oKKYtkE7UbfC2gaHZusa1nX3VKAThS3s7ZhpQL1OsUI6UokNN9pIGyxVWG8AVDGpuvmyKU5nrIIsBQWw2jxV7MRYCzkKYeMgrROmNlWumWyYFGtYacogdpEoFq5u3oqGHDfXN5TViT+IkwttTV2TYVOqWriQinRcQ1a9u+04UrGFFFqwLdxbLWO1UxbSuErKdWZd52T0mlan3a2HXJf24jFLJp7LTU9kuztoSaBary1+JAmCiAgQo7EwwoQiEDJQRCEm4iz6hHAoDCUkdIV5o6Ml771/uSag2UiIF1iejXCbhbZuoOVI+78uMoKXXyLG+hoPe9TzIjjqOdfv8YB9YDe7E9y+ZWDSO3DDrQRTp9hDLUBwyYDUtlCgjOpViK3+7X2vbEur946lLy4X7bPTF/aLfcMtd5in7gG3rN1iDg2w17dcaYIdl74Msp+8eZgTQAiwDmhO4OfAzktfvexN3k9PB95Old4/+c/v//q2ByfNqeGHf/bsXWB4jcjjGezzHvX0nTuZSrzx8tML2Q9OPuktDj21m5387cUHKi984gs37uf7tpfu3jV839+UE95/Ba/7XOm56Kf2f3V35qa3uJcm7//ro3/+BfjwAnijemFnZc+ZZ+4JvPvq9JnA9xaicM8dpn/gM4+9zuLCDxe9i1vf2/rtO35+9pYnlJtP7LrhsdPnzz5w++jWYyff+e72Xz3DvHQ/3Jv5/B/Yrxx/e3bbwwdelb64/4UXF750ceaRHcLg+defHp8vf+v95YeO9f1EefP3b/1j6nfWzHf+9CH70Mv3nXv8XTiZOv/vudN/f/zIb7787Ng3PE+d2XNm/G7w2eF3bvyj+lrpx88/ehv/gxNf/1q6/7T4Te418adD24xHfpnaUfrRB8deubMeTTfn8j8MQ+0SXR4AAA==";

// Fetch all inventory items
const fetchAllInventoryItems = async () => {
  const limit = 200; // Max items per page
  let allItems = [];
  let page = 1;
  let hasMoreItems = true;

  while (hasMoreItems) {
    const url = `https://api.ebay.com/oauth/api_scope/sell.inventory.readonly	`;
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
        throw new Error(`Error fetching inventory items: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`Fetched ${data.inventoryItems?.length || 0} items on page ${page}`);

      allItems = [...allItems, ...(data.inventoryItems || [])];

      // Check if there are more items to fetch
      hasMoreItems = data.inventoryItems && data.inventoryItems.length === limit;
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

app.listen(5000, () => console.log("Server running on port 5000"));
