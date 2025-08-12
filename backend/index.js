import express from 'express';
import { connection } from './src/configs/db.js';

// Routes
import authRoute from './src/routes/auth.route.js';

// App configs and middlewares
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoute);


// App entry
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})