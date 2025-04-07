const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
app.use(cors({ origin: "http://127.0.0.1:5500" })); // Allow requests from Live Server
app.use(express.static("public")); // Serve static files

const EBAY_AUTH_TOKEN = 
"v^1.1#i^1#f^0#r^0#I^3#p^3#t^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";
const EBAY_API_ENDPOINT = "https://api.ebay.com/ws/api.dll"; // Trading API endpoint

// Fetch all inventory items
// Function to fetch all listings using GetSellerList
const fetchAllListings = async () => {
  const entriesPerPage = 50; // Number of listings per page
  let allListings = [];
  let pageNumber = 1;
  let hasMoreItems = true;

  while (hasMoreItems) {
    const body = `
      <?xml version="1.0" encoding="UTF-8"?>
      <GetSellerListRequest xmlns="urn:ebay:apis:eBLBaseComponents">
        <RequesterCredentials>
          <eBayAuthToken>${EBAY_AUTH_TOKEN}</eBayAuthToken>
        </RequesterCredentials>
        <StartTimeFrom>2025-01-07T00:00:00.000Z</StartTimeFrom>
        <StartTimeTo>2025-04-07T23:59:59.000Z</StartTimeTo>
        <Pagination>
          <EntriesPerPage>${entriesPerPage}</EntriesPerPage>
          <PageNumber>${pageNumber}</PageNumber>
        </Pagination>
      </GetSellerListRequest>
    `;

    console.log(`Fetching page ${pageNumber}...`);

    try {
      const response = await fetch(EBAY_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "text/xml",
          "X-EBAY-API-COMPATIBILITY-LEVEL": "967",
          "X-EBAY-API-DEV-NAME": "Your-Dev-ID",
          "X-EBAY-API-APP-NAME": "Your-App-ID",
          "X-EBAY-API-CERT-NAME": "Your-Cert-ID",
          "X-EBAY-API-CALL-NAME": "GetSellerList",
          "X-EBAY-API-SITEID": "0",
        },
        body,
      });

      if (!response.ok) {
        console.error(
          `Error fetching data from eBay: ${response.status} ${response.statusText}`
        );
        throw new Error("Failed to fetch data from eBay API.");
      }

      const responseText = await response.text();
      const json = convertXmlToJson(responseText); // Convert XML to JSON for easier handling

      if (json.GetSellerListResponse.Ack === "Success") {
        const items = json.GetSellerListResponse.ItemArray.Item || [];
        allListings = allListings.concat(items);

        hasMoreItems =
          json.GetSellerListResponse.HasMoreItems === "true" &&
          items.length === entriesPerPage;

        pageNumber++;
      } else {
        console.error("eBay API Error:", json.GetSellerListResponse.Errors);
        throw new Error("API Error occurred.");
      }
    } catch (error) {
      console.error(`Error on page ${pageNumber}:`, error);
      throw error;
    }
  }

  return allListings;
};

// Convert XML response to JSON
const xml2js = require("xml2js");
const convertXmlToJson = async (xml) => {
  const parser = new xml2js.Parser({ explicitArray: false });
  return parser.parseStringPromise(xml);
};

// API route
app.get("/ebay-listings", async (_, res) => {
  console.log("Request received for /ebay-listings");
  try {
    const listings = await fetchAllListings();
    const formattedListings = listings.map((item) => ({
      title: item.Title,
      imageUrl: item.PictureURL,
      price: item.SellingStatus.CurrentPrice["__value__"],
      currency: item.SellingStatus.CurrentPrice["@currencyID"],
      itemWebUrl: `https://www.ebay.com/itm/${item.ItemID}`,
    }));
    console.log("Fetched items:", formattedListings);
    res.json(formattedListings);
  } catch (error) {
    console.error("Error fetching eBay listings:", error);
    res.status(500).send("Error fetching eBay listings.");
  }
});

// Start server
const PORT = 4000; // Change if needed
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});