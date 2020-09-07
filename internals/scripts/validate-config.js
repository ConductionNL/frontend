const { validator } = require('@exodus/schemasafe');

const config = require('./helpers/get-config');
const schema = require('../schemas/environment.conf.schema.json');

const validate = validator(schema, { includeErrors: true });
const valid = validate(config);

if (!valid) {
  /* eslint-disable no-console */
  console.log('Configuration is not valid according to environment.conf.schema.json');
  console.log(validate.errors);
  process.exit(1);
}
