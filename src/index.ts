import {Dummy2Application} from './application';
import {ApplicationConfig} from '@loopback/core';

export {Dummy2Application};

export async function main(options: ApplicationConfig = {}) {
  const app = new Dummy2Application(options);
  await app.boot();
  await app.migrateSchema();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
