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