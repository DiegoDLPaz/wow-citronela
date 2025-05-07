import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import routes from './routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
