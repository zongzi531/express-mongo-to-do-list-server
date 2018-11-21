import errorHandler from 'errorHandler';
import app from './app';

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App is running at http://localhost:%d', port);
});
