/* eslint-disable no-undef */
db = db.getSiblingDB('knigths');
db.createUser({
  user: 'mongo',
  pwd: 'mongo',
  roles: [
    {
      role: 'dbOwner',
      db: 'knigths',
    },
  ],
});
