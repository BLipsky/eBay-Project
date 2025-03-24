const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const EBAY_AUTH_TOKEN = "v^1.1#i^1#r^0#f^0#I^3#p^1#t^H4sIAAAAAAAA/+VYf2wTVRxv9zNzDgmoCKLOA0OE3fV+9NrrQYvdutGSsY21+8GIwPXu3Xbb9e649+pWjXEbiEqMUSJBUSNZlBAiiRqDxigxRFBIBAwGSSAhagSHJKJARIM/7toyukkAWROX2H+a933f933fz+d9vu+9e2R/SdncdeF1v1Y4Swu29JP9BU4nVU6WlRTPm1RYMKPYQeY4OLf0z+4vGiz8YQEUEqrBNwNo6BoElX0JVYN82ujHkqbG6wJUIK8JCQB5JPLR4JJ6niZI3jB1pIu6ilVGQn5MpBjAknHSzXJMXCZ9llW7HDOm+zHGzTGkyFAcR4q0j5WsfgiTIKJBJGjIj9EkzeIkg9PuGOXmGZqnWYImmQ6sshWYUNE1y4UgsUA6XT491szJ9dqpChACE1lBsEAkWBdtDEZCtQ2xBa6cWIEsD1EkoCQc3arRJVDZKqhJcO1pYNqbjyZFEUCIuQKZGUYH5YOXk7mJ9NNUyyzLyWLcIzJuipI5kBcq63QzIaBr52FbFAmX06480JCCUtdj1GIj3g1ElG01WCEioUr7b2lSUBVZAaYfq60OLgs2NWGBaqB1CwlFw+sViBStE+JNzSFc5CzJSLJI4rRIcxLgxOxEmWhZmsfMVKNrkmKTBisbdFQNrKzBWG7oHG4sp0at0QzKyM4o18+T5ZDyeTvsRc2sYhJ1afa6goRFRGW6ef0VGBmNkKnEkwiMRBjbkabIjwmGoUjY2M60FrPy6YN+rAshg3e5ent7iV6G0M1OF02SlKt9SX1U7AIJAbN87VrP+CvXH4AraSiipS3Ln0cpw8qlz9KqlYDWiQVYmqJpKsv76LQCY63/MORgdo2uiHxVCMf63IBxe70UE7f2HU8+KiSQFanLzgPEhRSeEMwegAxVEAEuWjpLJoCpSDzDyjTDyQCXPD4Zd/tkGY+zkgenZABIAOJx0cf9nwrlRqUeBaIJUF60njedx1KucKieTXVoi8NxRm9bJqMWzaxrD5l9ye4eH13NVfs8TEokl7X4b7Qargq+RlUsZmLW/PkgwK71/JEQ1iEC0rjgRUXdAE26qoipibXAjCk1CSZKRYGqWoZxgQwaRiQ/e3Xe4P3LbeLmcOfvjPqPzqerooK2ZCcWKns8tAIIhkLYJxAh6gmXXeu6YF0/bPPKdNbjwq1YN9cJhdoCmUGrSJkrJ5GGS8BHRMIEUE+a1m2baLRvYDG9B2jWeYZMXVWB2To+Bdj1nEgkkRBXwUQr7DwIXBEm2GFLed00R3u8bnZcuMT0Ubpyom1J+diKixbd5LXaNfojP+BI/6hB525y0LmrwOkkF5APULPI+0sKW4oKb50BFQQIRZAJqHRq1rerCYgekDIExSyY6jg4qV4aCNdf6I8n3287v5BzVOS8MWx5mLxr5JWhrJAqz3lyIGde6SmmbptWQbMkQ7spN0PTbAc560pvEXVn0e1zDgwH9ze3RGZScslHFz4tG17df4asGHFyOosdRYNOx9CXU46fO3RumH5q+8bHDn9/FPzx7Fdtm3ZVnXj6RTz1yQuv19LPDXweMS+6Vq89v23gp1MHmrv+/OutzcR3K6Y1hE/Vdu4snf3qsT3vfjN/qnR2/R3bSvVu9Z6yvatXcTO2lj3zdfDbXSdaLyVK1xhrNhce8i5sa/9xz8xTx/bHjvh3vLFx+S1r7704r3TfGmXpy9OnDKiXHg0d3HT67IbTzw+uD752+Pyhgg1V2JOfrZzlPz48/e7lvpPb9/3+S19obvOkVR8zrUeH1KNTvvj5lUtvfyiG9lbvlm57p3lFVflL99WUtw89QU+GJ6vCbXW/vecYety11TF/8kNvHvEmex/0zwknznyww9i5OFxx+uCizFr+DedcAmD9EQAA"; // Replace with your actual OAuth token

app.get("/ebay-listings", async (req, res) => {
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
        res.json(data.itemSummaries || []); // Send only relevant data
    } catch (error) {
        console.error("Error fetching eBay listings:", error);
        res.status(500).json({ error: "Failed to fetch eBay listings" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
