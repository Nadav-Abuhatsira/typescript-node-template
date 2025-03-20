import AppFactory from './AppFactory';

async function init(): Promise<void> {
  const server = AppFactory.create();
  const port = 5008;
  server.listen(port, () => {
    //console.log(`Listening on the port ${port}`);
    console.log(`server is running on http://localhost:${port}/`);
  });
}

init()
  .then(() => console.log('Running'))
  .catch((err) => console.log('Error:', err));
