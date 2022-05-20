const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

let persons = [
  {
    name: "Arto Hellas",
    cel: "033-726556",
    id: 1
  },
  {
    name: "lucia perez",
    cel: "040-123456",
    id: 2
  },
  {
    name: "Jeorge",
    cel: "051-532456",
    id: 3
  },
  {
    name: "Sebastian",
    cel: "089-152634",
    id: 4
  }
]
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
app.get('/api/persons', (request, response) => {
	response.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id) 
	console.log(id)
	const person = persons.find(person => person.id === id)	
	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})
app.get('/info', (request, response) => {
	date = new Date()
  response.send(
  	`<p>Phonebook has info for ${persons.length} people<p/>
  	<strong>${date}</strong>`
  )
})
app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id) 
	persons = persons.filter(person => person.id !== id)	

	response.status(204).end()
})
app.post('/api/persons', (request, response) => {
  const person = request.body
  const filter = persons.filter(dato =>dato.name === person.name)
  if(filter.length === 0) {
    if (person.name !== '' && person.cel !== '') {
      person.id = Math.round(Math.random()*(100 - 0) - 0)
      persons = [...persons,{...person}]
      response.json(person)
    } else {
      response.json({ error: 'you must have name or phone' })
    }
  } else {
    response.json({ error: 'name must be unique' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

