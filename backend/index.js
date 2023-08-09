const express = require("express")
const cors=require("cors")
require("./db/config")
const User = require("./db/user")
const Product=require("./db/product")
const app = express()
app.use(express.json())
app.use(cors())
app.post("/register",async (req, resp) => {
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    resp.send(result)
})
app.post("/login", async (req, resp) => {

    if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password")
    if (user) {
        resp.send(user)
    } else {
        resp.send({result: "No user Found"})
    }    
    }
    else {
        resp.send({result: "No user Found"})
    }
    
})
app.post("/add-product", async(req,resp) => {
    let product = new Product(req.body)
    let result = await product.save()
    resp.send(result)
})
app.get("/getproducts", async (req, resp) => {
    let getProduct = await Product.find()
    if (getProduct.length>0) {
    resp.send(getProduct)    
    }
    
})
app.delete("/delete/:id", async(req, resp) => {
    let deleteProduct = await Product.deleteOne({ _id: req.params.id })
    resp.send(deleteProduct)
})
app.get("/getproducts/:id", async (req, resp) => {
    let getProduct = await Product.findOne({ _id: req.params.id })
    if (getProduct) {
        resp.send(getProduct)
    } else {
        resp.send({ result: "No record found" })
    }
})
app.put("/getproducts/:id", async (req, resp) => {
    let updateProduct = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(updateProduct)
})
app.get("/search/:key",async (req, resp) => {
    let result = await Product.find(
        {
            "$or": [
                { name: { $regex: req.params.key } },
                {category:{$regex:req.params.key}},
                {company:{$regex:req.params.key}}
            ]
            
        }
    )
    resp.send(result)
})
app.listen(5000)