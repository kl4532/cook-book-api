const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const db = require('./dbConfig');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

const port = process.env.PORT || '3000';
const ip = process.env.IP || 'http://localhost:';

require("./routes/routes")(app);
app.listen(port, () => {
    console.log(`Server is running on port ${ip+port}`);
    console.log(`Swagger on ${ip+port}/api-docs/#/`);
    console.log('DB-config', [db.host, db.user, db.database]);
})
