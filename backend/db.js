
// const mongoose = require('mongoose');
// const password = encodeURIComponent('Kalra@12345');

// // Update the MongoDB connection URI with the correct format
// const mongoURI = `mongodb+srv://FoodApp:${password}@cluster0.56eizga.mongodb.net/FoodAppMERN?retryWrites=true&w=majority`;

// // Retry options
// const maxRetries = 3; // Maximum number of retry attempts
// const retryInterval = 5000; // Retry interval in milliseconds (e.g., 5 seconds)

// let retryAttempts = 0; // Variable to track the number of retry attempts

// const connectToMongoDB = async (retryCount) => {
//   try {
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log('Connected to MongoDB');

//     // Additional code for fetching and logging data
//     const fetchedData = await mongoose.connection.db.collection('food_items');
//     const data = await fetchedData.find({}).toArray();

//     const foodCategory = await mongoose.connection.db.collection('foodCategory');
//     const catData = await foodCategory.find({}).toArray();

//     global.food_items = data;
//     global.foodCategory = catData;

//     // You can use global.food_items and global.foodCategory here

//   } catch (error) {
//     // Check if the error is ECONNRESET
//     if (error.code === 'ECONNRESET') {
//       console.error('Connection reset by peer. Retrying connection...');

//       // Check if maximum retry attempts exceeded
//       if (retryAttempts < maxRetries) {
//         // Increment retry attempts count
//         retryAttempts++;

//         console.log(`Retrying connection in ${retryInterval / 1000} seconds (Attempt ${retryAttempts}/${maxRetries})...`);

//         // Retry connection after delay
//         setTimeout(connectToMongoDB, retryInterval);
//       } else {
//         console.error('Maximum retry attempts exceeded. Unable to connect to MongoDB.');
//       }
//     } else {
//       // For other errors, log the error and handle accordingly
//       console.error('Error connecting to MongoDB:', error);
//     }
//   };

//   module.exports = connectToMongoDB;

const mongoose = require('mongoose');
const password = encodeURIComponent('Kalra@12345');

// Update the MongoDB connection URI with the correct format
const mongoURI = `mongodb+srv://FoodApp:${password}@cluster0.56eizga.mongodb.net/FoodAppMERN?retryWrites=true&w=majority`;

// Retry options
const maxRetries = 3; // Maximum number of retry attempts
const retryInterval = 5000; // Retry interval in milliseconds (e.g., 5 seconds)

let retryAttempts = 0; // Variable to track the number of retry attempts

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Additional code for fetching and logging data
    const fetchedData = await mongoose.connection.db.collection('food_items');
    const data = await fetchedData.find({}).toArray();

    const foodCategory = await mongoose.connection.db.collection('foodCategory');
    const catData = await foodCategory.find({}).toArray();

    global.food_items = data;
    global.foodCategory = catData;

    // You can use global.food_items and global.foodCategory here

  } catch (error) {
    // Check if the error is ECONNRESET
    if (error.code === 'ECONNRESET') {
      console.error('Connection reset by peer. Retrying connection...');

      // Check if maximum retry attempts exceeded
      if (retryAttempts < maxRetries) {
        // Increment retry attempts count
        retryAttempts++;

        console.log(`Retrying connection in ${retryInterval / 1000} seconds (Attempt ${retryAttempts}/${maxRetries})...`);

        // Retry connection after delay
        setTimeout(connectToMongoDB, retryInterval);
      } else {
        console.error('Maximum retry attempts exceeded. Unable to connect to MongoDB.');
      }
    } else {
      // For other errors, log the error and handle accordingly
      console.error('Error connecting to MongoDB:', error);
    }
  }
};

module.exports = connectToMongoDB;
