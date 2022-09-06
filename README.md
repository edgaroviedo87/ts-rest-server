# Rest Server with Typescript

_This project includes a rest server developed with typescript. It does not contains database conecction. It declares some endpoint for user without data just structure of a rest server._

## How to start 🚀

You should run the following statement:
```
npm install
```

### Requirements 📋

_To run ths project, you should install a couple of libraries_

```
npm i cors express dotenv
```
You will need some dev libraries as well
```
npm i --save-dev @types/express tslint typescript
```

### Installation 🔧

_You must create tsconfig file typing the following statement on a power shell console_

```
tsc --init
```

Once you have created the tsconfig.json file, you need to make sure of the following configuration:

* "moduleResolution": "node",
* "sourceMap": true,  
* "outDir": "./dist",
* "esModuleInterop": true,  
* "strict": true,

## Despliegue 📦

_It is recommended to have two power shell consoles open, this in order to launch both the Typescript monitor and the NodeJs monitor._

In a console execute the following command (Typescript):
```
tsc --watch
```
In the another console execute(NodeJS):
```
nodemon dist/app.js
```


