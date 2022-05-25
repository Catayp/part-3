// const mongoose = require('mongoose')
// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }
// const password = process.argv[2]
// const url =
//   `mongodb+srv://lcyep:${password}@cluster0.smmyx.mongodb.net/?retryWrites=true&w=majority`
// mongoose.connect(url)
// const contactSchema = new mongoose.Schema({
//   name: String,
//   cel: String,
// })
// const Contact = mongoose.model('Contact', contactSchema)
// const contact = new Contact({
//   name: 'blabal',
//   cel: '964395'
// })
// //contact.save().then(result => {
//   //console.log('note saved!')
// //})
// Contact.find({}).then(result => {
//     result.forEach(contact => {
//       console.log(contact)
//     })
//     mongoose.connection.close()
// })