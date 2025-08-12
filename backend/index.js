
import express from 'express';

// EL CAMPO CODE EN LAS RESPUESTAS ES UN CATALOGO DE TIPOS DE ERROR PARA QUE EL CLIENTE (FRONTEND) LO MANEJE DE MEJOR MANERA
// 0 ES OPERACION EXITOSA
// 1 ES ERROR DEL CLIENTE O DE PROCESAMIENTO
// 2 ES ERROR DE PROGRAMACION, FALLO ALGUN TRY Y ENTRO AL CATCH

// Routes imports
import authRoute from './src/routes/auth.route.js';
import accountRoute from './src/routes/account.route.js';

// App configs and middlewares
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoute);
app.use('/product', accountRoute);


// App entry
app.listen(PORT, () => {
  console.log(`BankApp listening on port ${PORT}`)
})