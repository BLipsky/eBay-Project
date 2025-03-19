
const proxyUrl = "https://cors-anywhere.herokuapp.com/";  // Make sure you have access
const apiEndpoint = "https://api.ebay.com/buy/browse/v1/item_summary/search?q=ritikite";  // eBay API endpoint

const oauthToken = 'v^1.1#i^1#p^1#I^3#r^0#f^0#t^H4sIAAAAAAAA/+VYf2wTVRxvt25kgU0iBghCrAf8oeau96PX9i5rXUfBVcs2144fi4Rc795tb2vvznuvbAUNZSJkKoE/MGYhJIskLhDRGIkofwwloBEkSjT6ByECEVHij6AiETF415bRTQLImrjE/tO87/u+7/t8Pu/7fe/do3PVNQ9vatp0udY5pWIoR+cqnE5mKl1TXfVIXWXFnCoHXeLgHMotyLn6K7+rR1I6ZYhtABm6hoC7L53SkJg3BomMqYm6hCASNSkNkIhlMR5eGhNZihYNU8e6rKcIdzQSJHjgAxwIyLQaSAqc4Les2vWYCT1ISCqb9CdV1hcIqF7FL1v9CGVAVENY0nCQYGmWJ2mOZIQEw4u8X+RYivMKHYR7GTAR1DXLhaKJUB6umB9rlmC9NVQJIWBiKwgRioaXxFvC0cji5kS9pyRWqKhDHEs4g8a2FukKcC+TUhlw62lQ3luMZ2QZIER4QoUZxgYVw9fB3AX8gtQMx0uMovq9fj/n95VHyiW6mZbwrXHYFqiQat5VBBqGOHs7RS01kt1AxsVWsxUiGnHbf09mpBRUITCDxOLG8MpwaysRagRat5SGGhmDCEOtE5GtbRFSDsisoKgyTbIyG1CsLCtOVIhWlHncTIt0TYG2aMjdrONGYKEG47XxlmhjObVoLWZYxTaiUj//dQ1ZvsNe1MIqZnCXZq8rSFtCuPPN26/A6GiMTZjMYDAaYXxHXiKrbAwDKsT4znwuFtOnDwWJLowN0ePp7e2lejlKNzs9LE0znhVLY3G5C6QlwvK1a73gD28/gIR5KjKwRiIo4qxhYemzctUCoHUSIZ5lWJYp6j4WVmi89R+GEs6esRVRrgqRAgrj83KMQicDPpVTy1EhoWKSemwcICllybRk9gBspCQZkLKVZ5k0MKEicrzKcgEVkIpPUEmvoKpkkld8JKMCQAOQTMpC4P9UKHea6nEgmwCXJdfLlueJrKcpEuOzHdrjTUlOX75Sxe2auWRFxOzLdPcIbGOgUfBxWZle2R6802q4KflFKWgpk7DmL4cAdq2XT4QmHWGgTIheXNYN0KqnoJydXAvMmUqrZOJsHKRSlmFCJMOGES3PXl02ev9ym7g73uU7o/6j8+mmrJCdspOLlT0eWQEkA1L2CUTJetpj17ouWdcP27w6j3pCvKF1c51UrC2SBbZQKVw5qTxdCq2RKRMgPWNat22qxb6BJfQeoFnnGTb1VAqYyyaWAXY9p9MZLCVTYLIVdhkSHEqT7LBl/F6WE4QAz06Il5w/SldPti2pHFux67G7vFZ7xn7khxz5H9PvPET3O0cqnE66nl7IzKcfrK5sd1VOm4MgBhSUVArBTs36djUB1QOyhgTNihmOT+tiyoam2KVcMrN/+W+PBhy1JW8MQ6vo2aOvDDWVzNSSJwd67o2eKuaeWbUsT3OMwPC8n2M76Pk3el3MTNd9r11qEbfu2n7ul4HjxvF5l49u2f/HQbp21MnprHK4+p2OjRf3nJm+04/Pfk8fnCU1Rs88O2/3sb1f//XBxw3Vu3fMTH578uTwlOe2wJpd147+MPBlgr3weTUc3Dn4Sfeh8Nqdp4259dPq2hIf5hKfXbrafGBk79SfT697YM6Zs3vWP71v9rqLWxIVy4cO/9jjW/jOr1l6I7+vbcqh+RtfGt7G4RNvfHHlzWNvDcacvamBgeHj559iGuTnVy3OXBk5deKrIyPnNydOzVaGzp3Y3jl9uP2ZK3WvfrTg9XXXGhbcf+RYML0iEqSCjYMXnnAd6Dr5J3HxG/fb5A7pcPfW6a3R3vfWgt9ntK1/n2zaGnto7osOuObdrDAwQ/vJfKV++8tD976wufqqFBU2NSzdUFjLvwEuaUtv/REAAA=='; // Replace with your OAuth token

const headers = {
    'Authorization': `Bearer ${oauthToken}`,
    'Content-Type': 'application/json',
};

async function getListings() {
    try {
        const response = await fetch(proxyUrl + apiEndpoint, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            console.error('Failed to fetch listings:', response.status);
            return;
        }

        const data = await response.json();
        console.log(data);  // Log the data to check what is returned

        displayListings(data); // Display the data
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
}

window.onload = getListings;
