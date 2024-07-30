
const express = require('express');
const cors = require('cors');
const app = express();
const port = 4900;
const connectToMongoDB = require('./db');
// const userRoutes = require('./Routes/UserData');

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,  // Enable credentials (cookies, authorization headers)
}));

// Custom middleware to handle headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ success: false, message: 'Invalid JSON' });
  }
  next();
});

connectToMongoDB();



app.use(express.json());
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));
// app.use('/api', require('./Routes/UserData')); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
