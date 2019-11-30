const router = require("express").Router()
const Task = require("../models/task")

router.get("/" , async (req , res) => { // Find all the tasks and send them 
    const tasks = await Task.find().sort({date : "desc"})
    res.json(tasks)
})

router.post("/" , async (req , res) => {  //Create a task
    const { title } = req.body

    if (!title) { // Simple title validation 
        res.json("It´s necessary a title !")
    } else {
        if (title == "") {
            res.json("There is no title !")
        } else {
            const newTask = new Task({ // Create new task with the received data and save it
                title : title
            })
            await newTask.save()
            const tasks = await Task.find().sort({date : "desc"}) // If all is right send all the tasks
            .then(newTask => {
                res.json(tasks)
            })
            .catch(err => {
                res.json(err)
            })
        }
    }
})


router.get("/:_id" , async (req , res) => { // Send a specific task
    const task = await Task.findById(req.params._id)
    res.status(200).json(task)
})

router.put("/:_id" , async(req , res) => { //Edit a task
    const {_id} = req.params
    await Task.findByIdAndUpdate(_id , req.body)
    const tasks = await Task.find().sort({date : "desc"})
    res.json(tasks)
})

router.delete("/:_id" , async(req , res) => { //Delete a task
    const {_id} = req.params
    await Task.findByIdAndDelete(_id)
    const tasks = await Task.find().sort({date : "desc"})
    res.json(tasks)
})

module.exports = router