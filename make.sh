#!/bin/bash
#!/bin/bash

echo "Creando proyecto restaurant-reservations-backend..."

mkdir restaurant-reservations-backend
cd restaurant-reservations-backend

echo "Creando carpeta src..."
mkdir src

echo "Creando estructura aplicacion..."
mkdir src/aplicacion
mkdir src/aplicacion/auth
mkdir src/aplicacion/reserva
mkdir src/aplicacion/usuario

echo "Creando estructura dominio..."
mkdir src/dominio
mkdir src/dominio/entidades
mkdir src/dominio/puertos
mkdir src/dominio/puertos/repositorios
mkdir src/dominio/puertos/servicios
mkdir src/dominio/enum

echo "Creando estructura infraestructura..."
mkdir src/infraestructura
mkdir src/infraestructura/config
mkdir src/infraestructura/controladores
mkdir src/infraestructura/middleware
mkdir src/infraestructura/repositorios
mkdir src/infraestructura/rutas
mkdir src/infraestructura/servicios

echo "Creando estructura interfaces..."
mkdir src/interfaces
mkdir src/interfaces/http
mkdir src/interfaces/http/dto
mkdir src/interfaces/http/dto/auth
mkdir src/interfaces/http/dto/reserva

echo "Creando estructura compartido..."
mkdir src/compartido
mkdir src/compartido/errores
mkdir src/compartido/utils

echo "Creando carpeta pruebas..."
mkdir pruebas
mkdir pruebas/unitarias
mkdir pruebas/integracion

echo "Estructura de carpetas creada correctamente 🚀"




echo "Creando archivos..."

touch src/aplicacion/auth/ServicioAuth.ts
touch src/aplicacion/reserva/ServicioReserva.ts
touch src/aplicacion/usuario/ServicioUsuario.ts

touch src/dominio/entidades/Reserva.ts
touch src/dominio/entidades/Usuario.ts

touch src/dominio/puertos/repositorios/IRepositorioReserva.ts
touch src/dominio/puertos/repositorios/IRepositorioUsuario.ts

touch src/dominio/puertos/servicios/IEncriptador.ts

touch src/dominio/enum/Rol.ts

touch src/infraestructura/config/db.ts

touch src/infraestructura/controladores/ControladorAuth.ts
touch src/infraestructura/controladores/ControladorReserva.ts
touch src/infraestructura/controladores/ControladorUsuario.ts

touch src/infraestructura/middleware/middlewareAuth.ts
touch src/infraestructura/middleware/manejadorErrores.ts

touch src/infraestructura/repositorios/RepositorioReservaMySQL.ts
touch src/infraestructura/repositorios/RepositorioUsuarioMySQL.ts

touch src/infraestructura/rutas/rutasAuth.ts
touch src/infraestructura/rutas/rutasReserva.ts
touch src/infraestructura/rutas/rutasUsuario.ts

touch src/infraestructura/servicios/EncriptadorBcrypt.ts
touch src/infraestructura/servicios/ServicioTokenJwt.ts

touch src/infraestructura/servidor.ts

touch src/interfaces/http/dto/auth/SolicitudLoginDTO.ts
touch src/interfaces/http/dto/auth/SolicitudRegistroDTO.ts

touch src/interfaces/http/dto/reserva/SolicitudCrearReservaDTO.ts
touch src/interfaces/http/dto/reserva/SolicitudActualizarReservaDTO.ts

touch src/compartido/errores/ErrorApp.ts
touch src/compartido/errores/TiposError.ts
touch src/compartido/utils/paginacion.ts

touch swagger.yaml
touch README.md
touch .gitignore
touch package.json
touch tsconfig.json

echo "Archivos creados correctamente 🚀"