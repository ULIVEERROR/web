const express = require('express')
const { Sequelize, DataTypes } = require('@sequelize/core')
const bodyParser = require('body-parser')
const path = require('path');
const { PostgresDialect } = require('@sequelize/postgres')
const cors = require('cors')

const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || "localhost"
const DB_URL = process.env.DB_URL || "postgresql://postgres.vttqlbnhpjphsbaptidb:123456qwe!@#@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"

const sequelize = new Sequelize({
  // url: process.env.DB_URL, // Указывайте URL подключения здесь
  dialect: PostgresDialect,
  password: '123456qwe!@#',
  host: 'aws-0-eu-central-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000
  // },
  user: 'postgres.vttqlbnhpjphsbaptidb',
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
const PATH = path.join(process.cwd(), '../frontend/dist')
app = express()
app.use(bodyParser.json())
app.use(express.static(PATH));
const corsOptions = {
  origin: ['http://localhost'],
  allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
  credentials: true,
  enablePreflight: true
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions))

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
