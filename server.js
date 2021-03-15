const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

const port = process.env.PORT || '3000';
const ip = process.env.IP || 'http://localhost:';
const swagger = process.env.SWAGGER_URL || `${ip+port}/api-docs/#/`

require("./routes/routes")(app);
app.listen(port, () => {
    console.log(`Server is running on port ${ip+port}`);
    console.log(`Swagger running on ${swagger}`);
})
