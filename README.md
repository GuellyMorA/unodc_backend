## API para Sistema de Información Educativa

### Acerca del repositorio
API SIE, estructurado para propositos generales, es decir, servir datos a diferentes sistemas o subsistemas.

### Documentación
- [Expressjs](https://expressjs.com/)
- [Sequelize](http://docs.sequelizejs.com/)

### Requerimientos
Para trabajar de forma local
- [Nodejs y Npm, ultima versión en lo posible](https://nodejs.org/en/)

### Instalar dependencias
```
npm install
```
en su versión corta
```
npm i
```

#### Iniciar API con npm
```
npm start
```

#### Iniciar API con yarn
```
yarn start
```

### Sequelize
Instalar sequelize-cli
```
npm install -g sequelize-cli
```

### Configurar .sequelizerc
Se debe configurar lo siguiente: ***'./models/demo'*** el **demo** es la carpeta personaliza para cada proyecto.
```
"models-path": path.resolve('./models/demo'),
"seeders-path": path.resolve('./seeders/demo'),
"migrations-path": path.resolve('./migrations/demo')
```

Generar modelos y migraciones
- **name**, nombre del modelo en singular (***usuario***, reflejo en trabla ***usuarios*** plural).
- **attributes**, nombre de las columnas de la tabla ***usuarios*** sin separacion entre las mismas.

Instrucción, en caso de no tener instalado el sequelize-cli de forma global.
```
npx sequelize-cli model:generate --name usuario --attributes nombre:string,apellidos:string,correo:string
```
Si se tiene instalado proceder de la siguiente manera.
```
sequelize model:generate --name usuario --attributes nombre:string,apellidos:string,correo:string
```

Ejecutar las migraciones
```
sequelize db:migrate
```
Deshacer la migración
```
sequelize db:migrate:undo
```

Generar los seeders
- **name**, se recomienda que el nombre sea el mismo nombre de la tabla.

```
sequelize seed:generate --name usuarios
```

Ejecutar los seeders
```
sequelize db:seed:all
```

Deshacer los seeders
```
sequelize db:seed:undo:all
```

Para más información, vease [sequelize-migrations](http://docs.sequelizejs.com/manual/migrations.html)

### Ejemplo de asociaciones
Tablas
- **cursos**, el modelo será singular ***curso***.
- **maestros**, el modelo será singular ***maestro***.
- **estudiantes**, el modelo será singular ***estudiante***.

Generando modelos
```
sequelize model:create --name estudiante --attributes nombre:string,apellidos:string,edad:integer
sequelize model:create --name maestro --attributes nombre:string,apellidos:string,especialidad:string
sequelize model:create --name curso --attributes maestro_id:integer,descripcion:string,capacidad:integer
sequelize model:create --name estudiante_curso --attributes estudiante_id:integer,curso_id:integer
```

Asociaciones
- Un ***curso*** tiene un ***maestro*** y un ***maestro*** atiende a un **curso** (relacion de 1 - 1).
- Un ***curso*** tienen una o varios ***estudiantes*** y un ***estudiante*** esta inscrito en una o varios ***cursos***, (relacion de N a N).

##### Expresado en Sequelize
Asociación en el modelo ***maestro***.
```
Maestro.associate = function(models) {
  Maestro.hasOne(models.Curso, {
    foreignKey: 'maestro_id',	//Se indica la columna de la tabla cursos
    as: 'maestro',
  });
};
```
Asociación en el modelo ***curso***, con el ***estudiante*** y ***maestro***.
```
Curso.associate = function(models) {
  Curso.belongsToMany(models.Estudiante, {
    through: 'EstudianteCurso',	//Tabla intermedia de N a N
    as: 'estudiantes',
    foreignKey: 'curso_id'	//Se indica la columna curso_id de la intermedia
  });
  Curso.belongsTo(models.Maestro);
};
```
Asociación en el modelo ***estudiante*** con el ***curso***.
```
Estudiante.associate = function(models) {
  Estudiante.belongsToMany(models.Curso, {
    through: 'EstudianteCurso',	//Tabla intermedia de N a N
    as: 'cursos',
    foreignKey: 'estudiante_id'	//Se indica la columna estudiante_id de la intermedia
  });
};
```
Para más información, vease [sequelize-associations](http://docs.sequelizejs.com/manual/associations.html)

##### Otros ejemplos
Cuando se agrega el **usuario_id** en el modelo **rol**
```
Rol.hasOne(Usuario);	//Rol con un Usuario
Usuario.belongsTo(Rol);	//Usuario con un Rol

Rol.belongsToMany(Usuario);	//Rol con varios Usuarios
Usuario.hasMany(Rol);	//Usuario con varios Roles

```

### Consultas sin usar el modelo
```
const Rol = require('../models').rol;
const sequelize = Rol.sequelize;

getRoles(req, res) {
  return sequelize.query("SELECT * FROM roles WHERE(estado=:mi_estado)",
    {
      replacements: {
        mi_estado: true,	//Parametros de where
      }
    },
    { type: sequelize.QueryTypes.SELECT }, {
      raw: true
    })
    .then((roles) => res.status(200).send(roles))
    .catch((error) => res.status(400).send(error));
}
```

### Incluir logs en CRUD
```
const Rol = require('../models').rol;
const logger = require('winston');
logger.configure({ transports: [new logger.transports.File({ filename: 'logs/log.log' })] });

add(req, res) {
  return Rol
    .create({
      descripcion: req.body.descripcion,
      estado: req.body.estado,
    })
    .then((rol) => res.status(200).send(rol))
    .catch((error) => { logger.log('error', error); res.status(400).send(error) });
},

```

### Incluir transacciones en CRUD
Registro de **roles**. También se puede utilizar funciones o procedimientos almacenados.
```
const Rol = require('../models').rol;
const sequelize = Rol.sequelize;
const logger = require('winston');
logger.configure({ transports: [new logger.transports.File({ filename: 'logs/log.log' })] });

addRol(req, res) {
  return sequelize.transaction(t => {
    return Rol
	  .create({
	    descripcion: req.body.descripcion,
		estado: req.body.estado
	  }, {transaction : t})
	  .then(rol => {
		t.commit();
		res.status(200).send(rol)
	  })
	  .catch(error => { 
	    t.rollback();
	    logger.log('error', error);
	    res.status(400).send(error)
	  });
    });
  }
```

```
const Rol = require('../models').rol;
const sequelize = Rol.sequelize;
const logger = require('winston');
logger.configure({ transports: [new logger.transports.File({ filename: 'logs/log.log' })] });

addRol(req, res) {
  var sql = "INSERT INTO roles('descripcion', 'estado', 'createdAt', 'updatedAt') VALUES('Administrador',true,"+new Date()+","+new Date()+")";
  return sequelize.transaction(t => {
    return sequelize.query(sql, {transaction : t})
      .then(rol => {
        t.commit();
        res.status(200).send(rol);
      })
      .catch(error => { 
        t.rollback();
        logger.log('error', error);
        res.status(400).send(error)
      });
    });
  }
```

### Uso de async y await
Permite trabajar de manera sincrona, aplicando el **async** en la función y **await** en los proocesos.
```
async function tasks() {
  let result1 = await resolveTask1();
  let result2 = await resolveTask2();
  return (result1, result2);
}
```

### Uso de Promesas
Con el uso de **promises** los métodos asíncronos devuelvan valores como si fueran síncronos, en vez de inmediatamente retornar el valor final.
```
return new Promise(function(resolve, reject) {
  request.get('http://localhost:3000/api/prueba', function(err, resp, body) {
    if (err) {
      reject(err);
    } else {
      resolve(JSON.parse(body));
    }
  })
})
```

### Subir o cargar archivos 
Para subir archivos se recomienda el **multer** habiendo alternativas a disposición.
```
npm install multer --save
```

Configuración necesaria para el uso de **multer**. La ruta base es el **public** del proyecto **backend**, solo se debe indicar la carpeta o la ruta donde se subiran los archivos.
```
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })
```

El **upload** debe ser usado en la ruta indicando si es solo para subir uno o multiples archivos.

```
router.post('/api/usuarios', upload.single('foto'), usuariosController.add);
```

En el controller recibir el nombre del archivo con la siguiente instrucción.
```
const file = req.file
```

```
router.post('/api/usuarios', upload.array('fotos', 5), usuariosController.add);
```

En el controller se reciben en un array los nombres de los archivos con la siguiente instrucción.
```
const files = req.files
```

### Descargar o exportar archivos Excel o PDF 
Pendiente