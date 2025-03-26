const express = require('express')
const { Sequelize, DataTypes } = require('@sequelize/core')
const bodyParser = require('body-parser')
const path = require('path');

const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || "localhost"
const DB_URL = process.env.DB_URL || "postgresql://postgres:123456qwe!@#@db.vttqlbnhpjphsbaptidb.supabase.co:5432/postgres"

const sequelize = new Sequelize({
  url: process.env.DB_URL, // Указывайте URL подключения здесь
  dialect: 'postgres',
  password: '123456qwe!@#',
});

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
});
const PATH = path.join(process.cwd(), 'frontend/dist')
app = express()
app.use(bodyParser.json())
app.use(express.static(PATH));

app.get('/', async (req, res) => {
  res.sendFile(path.join(PATH, 'index.html'));
});

app.get('/users', async (req, res) => {
  res.send(await User.findAll())
});

app.post('/users', async (req, res) => {
  const user = await User.create(req.body)
  res.send(user)
});

app.listen(PORT, HOST, async () => {
  await sequelize.sync({ alter: true });
  console.log(`Server is running on port ${PORT}`)
});
