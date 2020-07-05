import express from 'express';
import bodyParser from 'body-parser';
import routes from '../routes';
import generatePeopleArray from '../productsMaker';

const app = express();
const router = express.Router();

// For parsing JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Hello! :)',
  });
});

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

routes(router);
app.use('/api', router);

const port = process.env.PORT || 5000;

generatePeopleArray();

app.use(express.static('dist'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
