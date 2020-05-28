const Sequelize = require('sequelize');

async function checkServer(ip, dbName) {
  const dbServer = new Sequelize('CustomerDB', 'customeruser', '123456a$', {
    host: '163.44.192.123',
    dialect: 'mssql',
    operatorsAliases: '0',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false,
      freezeTableName: true
    }
  });
  try {
    await dbServer.authenticate();

    const serverInfo = await dbServer.define('Customer', {
      ID: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      ServerIP: Sequelize.STRING,
      Username: Sequelize.STRING,
      Password: Sequelize.STRING,
      DatabaseName: Sequelize.STRING,
    });

    const serverData = await serverInfo.findOne({
      where: { ServerIP: ip, DatabaseName: dbName }
    })

    var server = {
      ip: serverData['ServerIP'],
      dbName: serverData['DatabaseName'],
      username: serverData['Username'],
      password: serverData['Password']
    };
    return Promise.resolve(server)
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = {
  serverDB: function (ip, dbName) {

    checkServer(ip, dbName)
    return new Promise((resolve) => {
      var dbServer = new Sequelize('CustomerDB', 'customeruser', '123456a$', {
        host: '163.44.192.123',
        dialect: 'mssql',
        operatorsAliases: '0',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
        define: {
          timestamps: false,
          freezeTableName: true
        }
      });

      dbServer.authenticate().then(() => {
        var serverInfo = dbServer.define('Customer', {
          ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
          },
          ServerIP: Sequelize.STRING,
          Username: Sequelize.STRING,
          Password: Sequelize.STRING,
          DatabaseName: Sequelize.STRING,
        });

        serverInfo.findOne({
          where: { ServerIP: ip, DatabaseName: dbName }
        }).then(data => {
          if (data) {
            var server = {
              ip: data['ServerIP'],
              dbName: data['DatabaseName'],
              username: data['Username'],
              password: data['Password']
            };
            resolve(server);
          }
        }).catch(() => resolve())
      }).catch(() => resolve())
    })


  },
  mainDB: function (ip, dbName, username, password) {
    return new Promise((resolve, reject) => {
      var db = new Sequelize(dbName, username, password, {
        host: ip,
        dialect: 'mssql',
        operatorsAliases: '0',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
        define: {
          timestamps: false,
          freezeTableName: true
        }
      });

      if (db)
        resolve(db);
      else
        reject();
    })
  }
}