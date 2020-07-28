import express from 'express';
import bodyParser from 'body-parser';
import routes from '../routes';
import { handleError } from '../src/utilities/errorHandler';

const app = express();
// const router = express.Router();

// For parsing JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Hello! :)',
  });
});

// router.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   next();
// });

// routes(router);
app.use('/', routes);

const port = process.env.PORT || 5050;

app.use(express.static('dist'));

app.use((err, req, res) => {
  handleError(err, res);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
