const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const person=require('./models/person')
const record=require('./models/record')
const connectdb=require('./db')

// Suggested code may be subject to a license. Learn more: ~LicenseLog:3005790945.
connectdb();
app.get('/',(req,res)=>{
  res.end('i work')
})


// Question 1
app.get('/saverecord',async(req,res)=>{
  const addPerson = new person(
    {
    name:'kola',
    age:55,
    favouriteFoods:['Beans','egg','rice']
},)
  const addedPerson=await addPerson.save()
  console.log(addedPerson)
  res.json(addedPerson)
})


// Question 2
app.get('/multiplerecord',async(req,res)=>{
  const addRecord =await person.create([
    {
    name:'kola',
    age:55,
    favouriteFoods:['Beans','egg','rice']
},
{
  name:'tola',
  age:22,
  favouriteFoods:['Suya','tozo','milk']
},
{
  name:'pola',
  age:18,
  favouriteFoods:['Beans','salad','rice']
},
{
  name:'rola',
  age:49,
  favouriteFoods:['plantain','egg','rice']
},
{
  name:'sola',
  age:33,
  favouriteFoods:['zobo','bread','rice']
},
])
  // const addedRecord= await addRecord.save()

  console.log(addRecord)
  res.json(addRecord)
})

// Question 3
app.get('/find',async(req,res)=>{
  const findRecord=await person.find({
  // name: 'kola' 
  })
  console.log(findRecord)
  res.json(findRecord)
})


// Question 4
app.get('/findone',async(req,res)=>{
  const findRecord=await person.findOne({
  favouriteFoods: 'Beans'
  })
  console.log(findRecord)
  res.json(findRecord)
})


// Question 5
app.get('/findByid',async(req,res)=>{
  const findRecord=await person.findById({
  _id: '66cdda3d1a92569ebb5ef395' 
  })
  console.log(findRecord)
  res.json(findRecord)
})


// Question 6
app.get('/findUpdateById',async(req,res)=>{
  const findRecord=await person.findById({
  _id: '66cdda3d1a92569ebb5ef395' 
  })
  const newFood='Hambuger'
  findRecord.favouriteFoods.push(newFood)
  await findRecord.save()
  console.log(findRecord)
  res.json(findRecord)
})

// Question 7
app.get('/findOneAndUpdate',async(req,res)=>{
  findRecord=await person.findOneAndUpdate({
    name:'kola'
  },{
    age:20
  },{
    new:true
  })
  console.log(findRecord)
  res.json(findRecord)
})

// Question 8
app.get('/findByIdAndRemove',async(req,res)=>{
  findRecord=await person.findByIdAndDelete(
   '66cf92320f71a708f1faf956'
  )
  console.log(findRecord)
  res.json(findRecord)
})

// Question 9
app.get('/remove',async(req,res)=>{
  findRecord=await person.deleteMany({
    name:'tola'
  })
  console.log(findRecord)
  res.json(findRecord)
})

// Question 10
app.get('/chainSearch',async(req,res)=>{
  findRecord=await person.find({
    favouriteFoods:'egg'
  }).sort({
    name:1
  }).limit(2).select(
    '-_id name age'
  )

  console.log(findRecord)
  res.json(findRecord)
})







app.listen(4500,()=>{
  console.log(`server running on port http://localhost:4500 `)
})