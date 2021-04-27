﻿// To validate objects

const Joi = require('joi');             // return class

const express = require('express');     // return a function
const app = express();                  // return an object

app.use(express.json());
const port = process.env.port || 3000

app.listen(port /*PortNumber*/, () => console.log(`Listeneing on port ${port}......`) /* optionally a function that called when the app starts listening to the given port */);

const courses = [
    { id: 1, name: 'course1',code:'aaa111',description:'yyyyy' },
    { id: 2, name: 'course2',code:'bbb222',description:'mmmmm' },
    { id: 3, name: 'course3',code:'ccc333',description:'zzzzz' }
];

const students=[
     { id: 1, name: 'ali',code:'aaaaaaa' },
    { id: 2, name: 'ahmed',code:'bbbbbbb' },
    { id: 3, name: 'sam',code:'ccccccc'}


];

// we vave bunch of methods like corresponds to http verbs or http methods
// app.get();
// app.put();
// app.post();
// app.delete();

// To respond to http get request
app.get('/'/* path or url '/' represrnts route of the website*/, /* callback function */(req, res) => {
    // This req object has a bunch of useful propereties u can refrence documentation for more info
    res.sendfile(__dirname+'/course_creation.html');
});
app.get('/api/courses/create'/* path or url '/' represrnts route of the website*/, /* callback function */(req, res) => {
    // This req object has a bunch of useful propereties u can refrence documentation for more info
    res.sendfile(__dirname+'/course_creation.html');
});
app.get('/api/students/create'/* path or url '/' represrnts route of the website*/, /* callback function */(req, res) => {
    // This req object has a bunch of useful propereties u can refrence documentation for more info
    res.sendfile(__dirname+'/course_creation.html');
});
// to get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// to get single course
// api/courses/1 to get course of id 1
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
if (!course) // error 404 object not found
{
    res.status(404).send('THe course with the given id was not found.');
    return;
}
res.send(course);
});

// // we can have multiple parameters
// // http://localhost:3000/api/posts/2021/5
// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);  
// });


// Add course
app.post('/api/courses', (req, res) => {
    // validate request
    const schema = {
        name: Joi.string().min(5).required(),
        description: Joi.string().max(200).required(),
        code:Joi.string().regex(/^[a-zA-Z]{3}\d{3}$/).required()
}

    const result = Joi.validate(req.body, schema);
//console.log(result);

if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
}

// //Manual validation 
// if (!req.body.name || req.body.name.length < 3)   //if name does not exist
// {
//     // 400 bad request
//     res.status(400).send('Name is required and should be minimum 3 characters.');
//     return;
// }


// create a new course object
    const course = {
        id: courses.length + 1,
        name: req.body.name, // assuming that request body there's a name property
        code:req.body.code,
        description:req.body.description
    };
courses.push(course);
res.send(course);
});


// Updating resources
app.put('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
if (!course) // error 404 object not found
{
    res.status(404).send('THe course with the given id was not found.');
    return;
}

// validate 
// If not valid, return 400 bad request
    const { error } = validateCourse(req.body); // result.error
if (error) {
    res.status(400).send(error.details[0].message);
    return;
}

// Update the course 
// Return the updated course
course.name = req.body.name;
course.description=req.body.description;
course.code=req.body.code;
res.send(course);
});


// Deleting a course
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
if (!course) // error 404 object not found
{
    res.status(404).send('THe course with the given id was not found.');
    return;
}

// Delete
    const index = courses.indexOf(course);
courses.splice(index, 1);

// Return the same course
res.send(course);
});
//////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/students', (req, res) => {
    res.send(students);
});

// to get single course
// api/courses/1 to get course of id 1
app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
if (!student) // error 404 object not found
{
    res.status(404).send('THe student with the given id was not found.');
    return;
}
res.send(student);
});

// // we can have multiple parameters
// // http://localhost:3000/api/posts/2021/5
// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);  
// });


// Add course
app.post('/api/students', (req, res) => {
    // validate request
    const schema = {
        name: Joi.string().regex(/^[a-zA-Z-']+$/i).required(),
        code:Joi.string().regex(/^[a-zA-Z]{7}$/).required()
    }

    const result = Joi.validate(req.body, schema);
//console.log(result);

if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
}

// //Manual validation 
// if (!req.body.name || req.body.name.length < 3)   //if name does not exist
// {
//     // 400 bad request
//     res.status(400).send('Name is required and should be minimum 3 characters.');
//     return;
// }


// create a new course object
    const student = {
        id: students.length + 1,
        name: req.body.name, // assuming that request body there's a name property
        code:req.body.code
    };
students.push(student);
res.send(student);
});


// Updating resources
app.put('/api/students/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const studnet = students.find(c => c.id === parseInt(req.params.id));
if (!student) // error 404 object not found
{
    res.status(404).send('THe student with the given id was not found.');
    return;
}

// validate 
// If not valid, return 400 bad request
    const { error } = validateStudent(req.body); // result.error
if (error) {
    res.status(400).send(error.details[0].message);
    return;
}

// Update the course 
// Return the updated course
student.name = req.body.name;
student.code=req.body.code;
res.send(student);
});


// Deleting a course
app.delete('/api/students/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
if (!student) // error 404 object not found
{
    res.status(404).send('THe student with the given id was not found.');
    return;
}

// Delete
    const index = students.indexOf(student);
students.splice(index, 1);

// Return the same course
res.send(student);
});





















/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Environment variable




function validateCourse(course) {
    const schema = {
        name: Joi.string().min(5).required(),
    description: Joi.string().max(200).required(),
    code:Joi.string().regex(/^[a-zA-Z]{3}\d{3}$/).required()
    }
    return Joi.validate(course, schema);
}


function validateStudent(student) {
    const schema = {
        name: Joi.string().regex(/^[a-zA-Z]+[-]+[’]$/).required(),
        code:Joi.string().regex(/^[a-zA-Z]{7}$/).required()
    }
    return Joi.validate(student, schema);
}