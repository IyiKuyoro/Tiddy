import express from 'express';
import exphbs from 'express-handlebars';
import morgan from 'morgan';

import router from './routes';

const app = express();

app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(morgan('dev'));

app.use('/', router);

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    success: false,
  });
});

export default app;
