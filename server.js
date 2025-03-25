const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const EBAY_AUTH_TOKEN = "v^1.1#i^1#p^1#f^0#I^3#r^0#t^H4sIAAAAAAAA/+VYf2wTVRxf1w4z52YciAok1hskBtPru2uvu17WarsCG+6XdBswNON69zpua+/qvXduNUa7gejklyQD/UsGGwajMdFADAbm0IQfiaIQjdERI4oGJRJ/oPyBib5ry+gmAWRNXGL/ae77vu/7Pp/P9/t9792B1Izihetr1l8stdxSOJgCqUKLhSkBxTOKHiizFs4pKgA5DpbB1PyUrc96tgqJ8VhCWAZRQlMRtPfEYyoS0kYfZeiqoIlIQYIqxiESsCSEA/V1AksDIaFrWJO0GGWvDfmoCOfh3aIkchHGLbMemVjVyzGbNR8lA1ZiRYYFbikKOQ9LxhEyYK2KsKhiH8UClnMAl4Plmhm3wHECqKS9wN1G2VuhjhRNJS40oPxpuEJ6rp6D9dpQRYSgjkkQyl8bWBxuDNSGFjU0VzlzYvmzOoSxiA008alak6G9VYwZ8NrLoLS3EDYkCSJEOf2ZFSYGFQKXwdwE/LTU7gjHAg8PoZdIGnVJeZFysabHRXxtHKZFkR3RtKsAVazg5PUUJWpEOqGEs08NJERtyG7+PWKIMSWqQN1HLQoGVgaamih/EKqdYlxRHXUKworagRxNy0IOiZdYrxyVgIMQ5mXIS9mFMtGyMk9aqVpTZcUUDdkbNByEBDWcrI07Rxvi1Kg26oEoNhHl+nmyGvJevs1MaiaLBl6jmnmFcSKEPf14/QyMz8ZYVyIGhuMRJg+kJfJRYiKhyNTkwXQtZsunB/moNRgnBKezu7ub7nbRmt7hZAFgnCvq68LSGhgXKeJr9nrGX7n+BIeSpiJBMhMpAk4mCJYeUqsEgNpB+TmWYVkmq/tEWP7J1n8Ycjg7J3ZE3joEAgAlt4fnpUpe4sR8dIg/W6ROEweMiElHXNS7IE7ERAk6JFJnRhzqiiy4uCjr4qPQIXu8UYfbG406IpzscTBRCAGEkYjk5f9PjXKjpR6Gkg5xXmo9b3XenHTWhOq4ZJu6tCbi0pavjOIWVV+8IqT3GJ1dXjbIB70eV1ICK1t8N9oNVyVfHVOIMs1k/XwIYPZ6/kSo0RCG8pTohSUtAZu0mCIlp1eCXbrcJOo4GYaxGDFMiWQgkajNz16dN3r/cpu4Od75O6P+o/PpqqyQWbLTi5U5H5EAYkKhzROIlrS40+x1TSTXD9PcnkY9Jd4KublOK9aEZIatImeunHSaLo2ekGgdIs3QyW2bbjRvYM1aF1TJeYZ1LRaDeuvUKsDs53jcwGIkBqdbY+ehwBVxmh22TKWb9TJuDlROiZeUPkrbp9uWlI+t2LbkJq/Vzokv+f6C9I/ps7wP+iwjhRYLqAILmApw3wxri8162xykYEgrYpRGSodK3l11SHfBZEJU9MKZBR+X1cm9NXW/pyLGO8svPMgXlOZ8Yxh8DNw9/pWh2MqU5HxyAPOujBQxt99VynLAxXIk5STnbaDiyqiNmW2b9ZNsZdte3FwYOr9g+dqSLx869Pa5X0DpuJPFUlRg67MUHOjvXNv9a9cOfeirzdrFXfSp0e4db50+U7rtpTPh/daNa/c0bPg2uDUyNjc894NRGYIPt++7//XBsyfm7yi373+0fGDPom0nn+sdWRc/9mP/luPDB1++oN7z3YaB0v7H143esXus5cSxpnONP3w2kPx6ZCzs0549XzQiD1U9PVT2almqqHfLrIHdO29dzc/eWb1v4+z6A8OXBoXgyVVLftuaeGXVR6cOP9P7rlL/+Qv1R7+/oB/Y/tRf1M8HPxk+svdJ0H5uwfO7vnmPGw4bxdv6xtQlf256w5nsPzRi045Wla++87Xkw6v/uHR6oORea3VF+RetQxush48bn5YJby7cUnhkXkX7zKXsgDy6N5XJ5d+Wn6Bh/REAAA=="; // Replace with your actual OAuth token

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
