require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

app.use(express.json())
app.use(express.static('build'))
app.use(morgan('dev'))
app.use(cors())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
	date = new Date()
  response.send(
  	`<p>Phonebook has info for ${persons.length} people<p/>
  	<strong>${date}</strong>`
  )
})

app.get('/api/persons', (request, response) => {
  Contact
  .find({})
  .then(result => response.json(result))
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	Contact
    .findById(request.params.id)
    .then(person =>{
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error)) 
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const person = request.body
  if (person.name !== '' || person.cel !== '') {
    const contact = new Contact({
      name: person.name,
      cel: person.cel
    })
    contact
      .save()
      .then(result => {response.json(result)})
      .catch(error => next(error))
  } else {
    response.json({ error: 'you must have name or phone' })
  }
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

