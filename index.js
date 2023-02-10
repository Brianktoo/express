const Joi =require('joi');
const express  =require('express')
const app = express();

app.use (express.json()); //adding middleware

const courses =[
    { id:1, name:'course1'},
    { id:2, name:'course2'},
    
];
app.get('/',(req,res)=>{
    res.send("hello world brian")

});
// app.get('/api/courses', (req, res)=>{
//     res.send([1,2,3])
// })



app.get('/api/courses', (req, res)=>{
    res.send(courses);
});

// to update resourses , i will use put


// using http post request to create a new post
app.post('/api/courses', (req, res)=>{
    // validation
    const { error } = validateCourse(req.body);
    if (error) return  res.status(400).send(result.error.details[0].message)
   

    const course ={
        id:courses.length +1,
        name: req.body.name,
       
        
    };
courses.push(course);
res.send (course);


});
   
app.put('/api/courses/:id', (req,res)=>{
        const course = courses.find(c =>c.id=== parseInt(req.params.id));
        if (!course) return  res.status(404).send('the given id doesnt exist')
    
        
        const { error } = validateCourse(req.body);
        if (error) return  res.status(400).send(result.error.details[0].message);
        
        course.name = req.body.name;
        res.send(course);

});
function validateCourse(course){
    const Schema ={
        name: Joi.string().min(3).required()
        
    };
    return Joi.validate(course, Schema);
}


app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c =>c.id=== parseInt(req.params.id));
    if (!course) return res.status(404).send('the given id doesnt exist')

   const index =  courses.indexOf(course);
   courses.splice(index,1);

   res.send(course);

})


app.get('/api/courses/:id',(req, res)=>{
   const course = courses.find(c =>c.id=== parseInt(req.params.id));
   if (!course) return res.status(404).send('the given id doesnt exist')
   res.send(course);
    })



//  to get a single course /api/course/1
// app.get('/api/courses/:id', (req, res)=>{
//     res.send(req.params.id);
// })



// port
const port= process.env.PORT || 3000;
app.listen(port ,()=>console.log(`listening on port ${port}`))