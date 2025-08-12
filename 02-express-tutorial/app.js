console.log("Express Tutorial");
const { products, people } = require("./data");
const express = require("express");
const app = express();

//week 4 assignment
//Middleware "logger"

const logger = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
};

app.use(logger);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/v1/testlog", logger, (req, res) => {
  res.json({ message: "logger worked!" });
});

//Line tells the server to serve statics files from the "public" folder
app.use(express.static("./public"));

//Lines for handle API responses from different types of requests

//request#1 - to test route
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

//request#2 - Returns all products from the imported data.js file
app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

//req#3 - Returns a specific product based on (parameter) the ID provided in the URL
app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);

  if (!product) {
    return res.status(404).json({ message: "That product was not found." });
  }
  res.json(product);
});

//req#4 - Returns filtered products based on query parameters
app.get("/api/v1/query", (req, res) => {
  const { search, limit, maxPrice } = req.query;
  let filteredProducts = [...products];

  // Filter products by name or description if the search term is provided
  if (search) {
    const searchTerm = search.toLowerCase();

    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
    );
  }

  //Filter products by price if maxPrice is provided
  if (maxPrice) {
    const priceLimit = parseFloat(maxPrice);
    if (!isNaN(priceLimit)) {
      filteredProducts = filteredProducts.filter((p) => p.price <= priceLimit);
    }
  }

  //Limit the number of products returned if limit is provided
  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit));
  }

  //Return 404 if no products match the query
  if (filteredProducts.length === 0) {
    return res.status(404).json({ message: "No products matched your query" });
  }

  res.json(filteredProducts);
});

// //**** */PEOPLE ROUTES
// //GETTING A LIST OF PEOPLE
// app.get("/api/v1/people", (req, res) => {
//   res.json(people);
// });

// //POST-ADDING A PERSON
// app.post("/api/v1/people", (req, res) => {
//   const { name } = req.body;

//   if (!name) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide a name" });
//   }

//   const newPerson = { id: people.length + 1, name };
//   people.push(newPerson);

//   res.status(201).json({ success: true, name });
// });

const peopleRouter = require("./routes/people");
app.use("/api/v1/people", peopleRouter);

//Line to Handle any undefined routes with a 404 response
app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

//Line to Starts the server and listens on port 3000
app.listen(3000, () => {
  console.log("Server listening in port 3000...");
});
