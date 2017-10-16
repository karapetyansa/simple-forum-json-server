const fs = require('fs')
const faker = require('faker')
const json2csv = require('json2csv')

faker.locale = 'ru'

const getPerson = id => ({
  id,
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  address: faker.address.streetAddress(),
  avatar: faker.image.avatar(),
  registeredAt: faker.date.past()
})

const getPost = (author, id) => {
  const textPreview = faker.lorem.paragraphs()
  return {
    id,
    authorId: author.id,
    authorName: author.name,
    title: faker.lorem.sentence(),
    titleImage: faker.image.image(),
    textPreview,
    text:
      textPreview +
      faker.lorem.paragraphs() +
      faker.lorem.paragraphs() +
      faker.lorem.paragraphs() +
      faker.lorem.paragraphs(),
    createAt: faker.date.recent()
  }
}

const getRandomInt = max => Math.floor(Math.random() * max) + 1

const numberOfUsers = 10
const maxNumberOfPosts = 15

const persons = []
const posts = []

let counter = 1
for (let i = 1; i <= numberOfUsers; i++) {
  let user = getPerson(i)
  persons.push(user)
  let numberOfPosts = getRandomInt(maxNumberOfPosts)
  for (let j = 1; j <= numberOfPosts; j++) {
    posts.push(getPost(user, counter))
    counter++
  }
}

const dataBase = { persons, posts }

fs.writeFile('./data/db.json', JSON.stringify(dataBase, null, 2), err => {
  if (err) throw err
  console.log('bigDataSet generated successfully!')
})

fs.writeFile('./data/users.csv', json2csv({ data: persons }), err => {
  if (err) throw err
  console.log('users.csv saved')
})

fs.writeFile('./data/posts.csv', json2csv({ data: posts }), err => {
  if (err) throw err
  console.log('posts.csv saved')
})
