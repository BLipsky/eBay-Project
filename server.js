const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

const EBAY_API_URL = "https://api.ebay.com/buy/browse/v1/item_summary/search?q=ritikite";
const OAUTH_TOKEN = 'v^1.1#i^1#f^0#r^0#I^3#p^1#t^H4sIAAAAAAAA/+VYbWwURRi+u36lQDGk+EH58FzkhzS7N7u3t3e37Z259qg9c7SVa0s/Qure7GzZ9m733JmzvdiGo4kQf0BIEyXBBCs/lKiN8INg+OEPDEoiAoYYoyCSGD9IiMYAIX4E3b07yrUSQHqJTbw/l3nnnXee55n3nZkdkK2sXr+jdceNGnuVYyoLsg67nV0Mqisr6peWOeoqbKDIwT6VfTJbPlH2UyOWkomUuAnhlK5h5BxNJjQs5owBKm1ooi5hFYualERYJFCMhTZGRY4BYsrQiQ71BOWMhAOU2+uDECA/B5AMoQBMq3YrZqceoBSZ9wlexLMQScDt581+jNMoomEiaSRAcYDz0MBNc3wny4usILJ+hue5PsrZjQys6prpwgAqmIMr5sYaRVjvDlXCGBnEDEIFI6GWWHsoEt7Q1tnoKooVLOgQIxJJ49mtZl1Gzm4pkUZ3nwbnvMVYGkKEMeUK5meYHVQM3QLzAPBzUnv9cTf0CjIv+3mP4OFKImWLbiQlcncclkWVaSXnKiKNqCRzL0VNNeJDCJJCq80MEQk7rb/n0lJCVVRkBKgNTaHeUEcHFWxC2pCUVDU6qmKiaoOY7tgUpqEPcn5ZgYDmIOeTkQ8WJspHK8g8Z6ZmXZNVSzTsbNNJEzJRo7nagCJtTKd2rd0IKcRCVOwn3NLQLfRZi5pfxTTZqlnripKmEM5c894rMDOaEEONpwmaiTC3IydRgJJSKVWm5nbmcrGQPqM4QG0lJCW6XCMjI8yIm9GNQRcHAOvq2RiNwa0oKVGmr1XreX/13gNoNUcFInMkVkWSSZlYRs1cNQFog1TQw7EcxxZ0nw0rONf6D0MRZ9fsiihVhShxH+I45OPiguyLA6kUFRIsJKnLwoHiUoZOSsYwIqmEBBENzTxLJ5GhyqLbo3Bun4JoWfArNO9XFDrukQWaVRACCMXj0O/7PxXK/aZ6DEEDkZLkesnyvDPjag1HPZk+7dnWuFvf3KuQLs1o6Qkbo+mhYT/X5GvyC+4MBL1dgfuthjuSb06opjKd5vylEMCq9dKJ0KpjguR50YtBPYU69IQKMwtrgd2G3CEZJBNDiYRpmBfJUCoVKc1eXTJ6/3KbeDDepTuj/qPz6Y6ssJWyC4uVNR6bAaSUylgnEAP1pMuqdV0yrx+WeSCHel68VfPmuqBYmyTzbFU5f+VkcnQZ/CJkDIT1tGHetpl26wbWqQ8jzTzPiKEnEsjonl8GWPWcTKaJFE+ghVbYJUhwVVpghy3r5Tkf5/F6/fPiBXNH6cBC25JKsRWXP/OA12rX7I/8oC33Yyfsx8GE/UOH3Q4awTp2LXiisqyrvGxJHVYJYlRJYbA6qJnfrgZihlEmJamGo9Z2ZmlU3t4avZ6Np49uvva0z1ZT9MYwtQU8NvPKUF3GLi56cgCrbvdUsA89WsN5gJvjWZ4VWH8fWHu7t5x9pHz5N80N56/2X8crttR5Tlw4dmNfLaoHNTNOdnuFrXzCbnt4T8+hsfXn/nzr5YfOhgdW7z9Zv+SPTP+2MWH1OrFrRdYtTf9cdbJh8vFtl6Z317y2rPHg5OJfKpeGt68ePffBxePffbWxZ3r5xaptjsM9V9iKLw/S8Ivzb7jGBi5Xd9cd6x8CL40d+XXys5WLPq4+MPrj8j2T8qmW02fAtR/G0XjPXv6FNZt3KskN7PPL/qp9++xeR1Ww9uArF16N48s7Q+eZZVf0XfunJi/9Vm+7mZEXvXl6ZSQdyDi8TMO7q24eo09d2N19/JN1Z4Vz+77eETsg7K/6/J3x5NVvvz8xvbP3o6Hgkj1PaZ++rxw5cDhxuk3iO6bl8YaoXt9/ygmPDh/atei9108OrPk9v5Z/A3NQGvb9EQAA'; // Replace with your OAuth token

app.use(cors());

app.get('/ebay-listings', async (req, res) => {
    try {
        const response = await axios.get(EBAY_API_URL, {
            headers: { Authorization: `Bearer ${OAUTH_TOKEN}` }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.get('/ebay-listings', async (req, res) => {
    try {
        console.log("Fetching eBay listings...");
        
        const response = await axios.get(EBAY_API_URL, {
            headers: { Authorization: `Bearer ${OAUTH_TOKEN}` }
        });

        console.log("eBay API Response:", response.data); // Log API response
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching eBay listings:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });

        res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.response?.data || error.message 
        });
    }
});




