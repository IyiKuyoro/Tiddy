import express from 'express';
import morgan from 'morgan';

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(morgan('dev'));

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    success: false,
  });
});

export default app;
