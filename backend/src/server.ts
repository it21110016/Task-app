// src/server.ts
import { app, sequelize } from './app';

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  sequelize.authenticate()
    .then(() => {
      console.log(`Connected to ${process.env.DB_NAME} DB!`);
      return sequelize.sync();
    })
    .then(() => {
      console.log('DB synced!');
    })
    .catch((err) => {
      console.error('DB Connection failed:', err);
    });
}
