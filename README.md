# Proyecto Backend con Node.js y Prisma

## Descripción
Este proyecto es un backend desarrollado con Node.js que utiliza Prisma como ORM para la gestión de la base de datos. La configuración y despliegue de la base de datos se realiza mediante Docker y el archivo `docker-compose.yml`.

## Requisitos
- **Node.js**: Versión 20.18.1
- **Docker**: Asegúrate de tener Docker y Docker Compose instalados en tu sistema.

## Instalación
1. Clona este repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

3. Crea el archivo `.env` a partir del archivo `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Asegúrate de completar las variables necesarias en el archivo `.env`.

## Configuración de la Base de Datos

1. Levanta la base de datos con Docker utilizando el archivo `docker-compose.yml`:

   ```bash
   docker-compose up -d
   ```

   Esto iniciará el contenedor de la base de datos en segundo plano.

2. Genera las tablas necesarias en la base de datos ejecutando las migraciones:

   ```bash
   npm run migrate
   ```

   Este comando aplica las migraciones definidas en el esquema de Prisma.

## Scripts Disponibles

### Iniciar el Servidor
Para iniciar el servidor en modo de desarrollo, utiliza:

```bash
npm run dev
```

### Linter
Para revisar el código y asegurarte de que cumple con las reglas de estilo configuradas:

```bash
npm run lint
```

## Prisma
Este proyecto utiliza [Prisma](https://www.prisma.io/) como ORM para interactuar con la base de datos. Prisma permite:

- Definir el esquema de la base de datos en un archivo centralizado (`schema.prisma`).
- Generar consultas tipadas para una experiencia de desarrollo más fluida.
- Manejar migraciones de forma sencilla.

Para más información sobre Prisma, consulta su [documentación oficial](https://www.prisma.io/docs).
