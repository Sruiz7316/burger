// const mysql = require('mysql');
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const methodOverride = require('method-override')
const path = require('path')
// const bodyParser = require('body-parser');

const app = express()
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(methodOverride('_method'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
express.static(path.join(__dirname, 'public'))

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('App listening at port:', PORT)
})

// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

var connection = mysql.createConnection(
  process.env.JAWSDB_URL || {
    host: 'localhost',
    user: 'root',
    password: 'Capaluna$731600',
    database: 'burgers_db'
  } 
)

connection.connect(function (err) {
  if (err) throw err
  console.log(
    'connected a id:' + connection.threadId,
    'connected as port:' + PORT
  )
})

app.get('/', function (req, res) {
  connection.query('SELECT * from burgers;', function (err, data) {
    res.render('index', { burgers: data })
  })
})

app.post('/create', function (req, res) {
  connection.query(
    'INSERT INTO burgers SET ?',
    { burger_name: req.body.burger },
    function (err, result) {
      if (err) throw err
      res.redirect('/')
    }
  )
})
