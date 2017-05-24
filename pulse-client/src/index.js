import cors from 'cors';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';

import schema from './graphql';
import api from './routes/api';

const app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

app.use('/api', api);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(3000, () => {
  console.log('REST Service listening on port 3000!');
});
