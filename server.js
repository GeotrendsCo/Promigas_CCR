// server.js
const express = require('express');
const path = require('path');
const dbRoutes = require('./routes/db');
const indexRouter = require('./routes/index');
const app = express();
const PORT = process.env.PORT || 3030;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar rutas
app.use('/', indexRouter);
app.use('/api', dbRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
