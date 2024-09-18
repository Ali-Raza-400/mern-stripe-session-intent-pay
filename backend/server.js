const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')
require("./connection/db.js")(); 
const paymentRoutes = require("./routes/payment.js");
const productRoutes = require("./routes/products.routes.js");
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/api/payments", paymentRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})