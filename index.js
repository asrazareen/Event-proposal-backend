const express = require("express")
const mongoose = require("mongoose")
const Event = require("./models/event")
const { body, validationResult } = require("express-validator")
const fileUpload = require("express-fileupload")
const app = express()

app.use(express.json())
app.use(fileUpload())

app.post("/v1/events",
    body("title").notEmpty().isLength({ max: 20, min: 5 }),
    body("description").notEmpty().isLength({ max: 30 }),
    body("location").notEmpty().isLength({min:4, max:10}),
    body("startTime").notEmpty().isLength({max:10}),
    body("endTime").notEmpty().isLength({max:10})
    , async (req, res) => {
        try {
            const { title, description, location, startTime, endTime } = req.body
            //console.log(title)
            const errors = validationResult(req)
            //console.log(errors)
            if (!errors.isEmpty()) {
                const error = errors.array()[0]
                //console.log(error)
                if (error.param === "title" && error.value == "") {
                    return res.status(400).json({
                        error: "validation error : title field are required"
                    })
                } else if (error.param == "title") {
                    return res.status(400).json({
                        error: "validation error: title field requires minLength of 5 and maxLength of 20"
                    })
                }
                else if (error.param === "description" && error.value == "") {
                    return res.status(400).json({
                        error: "validation error : description field are required"
                    })
                } else if (error.param === "description") {
                    return res.status(400).json({
                        error: "validation error: description field require maxLength of 30"
                    })
                }
                else if (error.param === "location") {
                    return res.status(400).json({
                        error: "valoidation error:location field is required and has maxLenght of 10 and minLenght of 4"
                    })
                }
                else if (error.param === "startTime") {
                    return res.status(400).json({
                        error: "valoidation error:startTime field is required and its a string and has maxLength of 10 "
                    })
                }
                else if (error.param === "endTime") {
                    return res.status(400).json({
                        error: "valoidation error:endTime field is required ans its a string and has maxLength of 10"
                    })
                }
            }
            const data = await Event.create({
                title: title,
                description: description,
                location: location,
                startTime: startTime,
                endTime: endTime
            })
            //console.log(data)
            res.status(201).json({
                data
            })
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }

    })

app.get("/v1/events", async (req, res) => {
    const data = await Event.find()

    res.status(200).json({
        data: data
    })
})

app.get("/v1/events/:id", async (req, res) => {
    try {
        const id = req.params.id
        const event = await Event.findOne({ _id: id })
        if(!event){
            return res.status(404).json({
                error:"There's no event with that id"
            })
        }
        res.status(200).json({
            event: event 
        })
    } catch (e) {
        res.status(404).json({
            error: "There's no event with that id"
        })
    }

})

app.delete("/v1/events/:id" , async(req,res) => {
    const id = req.params.id
    //console.log(id)
  await Event.deleteOne({_id : id})
    res.status(204).json({
        message:"Deleted successfully"
    })

})

app.put("/v1/events/:id",
    body("title").notEmpty().isLength({ max: 20, min: 5 }),
    body("description").notEmpty().isLength({ max: 30 }),
    body("location").notEmpty().isLength({min:4, max:10}),
    body("startTime").notEmpty().isLength({max:10}),
    body("endTime").notEmpty().isLength({max:10})
    , async (req, res) => {
        try {
            const { title, description, location, startTime, endTime } = req.body
            //console.log(title)
            const errors = validationResult(req)
            //console.log(errors)
            if (!errors.isEmpty()) {
                const error = errors.array()[0]
                //console.log(error)
                if (error.param === "title" && error.value == "") {
                    return res.status(400).json({
                        error: "validation error : title field are required"
                    })
                } else if (error.param == "title") {
                    return res.status(400).json({
                        error: "validation error: title field requires minLength of 5 and maxLength of 20"
                    })
                }
                else if (error.param === "description" && error.value == "") {
                    return res.status(400).json({
                        error: "validation error : description field are required"
                    })
                } else if (error.param === "description") {
                    return res.status(400).json({
                        error: "validation error: description field require maxLength of 30"
                    })
                }
                else if (error.param === "location") {
                    return res.status(400).json({
                        error: "valoidation error:location field is required and has maxLenght of 10 and minLenght of 4"
                    })
                }
                else if (error.param === "startTime") {
                    return res.status(400).json({
                        error: "valoidation error:startTime field is required and its a string and has maxLength of 10 "
                    })
                }
                else if (error.param === "endTime") {
                    return res.status(400).json({
                        error: "valoidation error:endTime field is required ans its a string and has maxLength of 10"
                    })
                }
            }
            const id = req.params.id
       await Event.updateOne({ _id:id} , {$set:{
                title: title,
                description: description,
                location: location,
                startTime: startTime,
                endTime: endTime

            }})
            //console.log(data)
            const data = await Event.findOne({_id:id})
            res.status(200).json({
                data
            })
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }

    })

mongoose.connect("mongodb://localhost:27017/eventProposal")
    .catch(error => { console.log(error) })
    .then(() => console.log("connected to db"))

app.listen(3000, () => { console.log("server is up at port 3000") })