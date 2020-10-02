import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './Database/database';
import userRoutes from './users/user.route';
const assertDatabaseConnectionOk = async (): Promise<void> => {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
};
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', userRoutes);
app.use(express.static('public'));
const init = async (): Promise<void> => {
  await assertDatabaseConnectionOk();

  console.log(`Starting Sequelize + Express example on port ${PORT}...`);

  app.listen(PORT, () => {
    console.log(
      `Express server started on port ${PORT}. Try some routes, such as '/api/users'.`
    );
  });
};
init();
export default app;
