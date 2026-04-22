# QA Automation Challenge – Express

Repositorio de prueba práctica para candidatos a **QA Automation Engineer**.

## Objetivo

La aplicación contiene bugs funcionales y brechas intencionales de calidad. La meta del candidato es:

- entender el sistema rápido
- priorizar qué automatizar primero
- implementar pruebas útiles
- documentar bugs con claridad

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Persistencia: archivo JSON (simula una base sencilla para la prueba)
- Tests iniciales: Playwright

## Funcionalidad incluida

- Login
- Crear cotización
- Listado de cotizaciones
- API para productos y cotizaciones

## Instalación

```bash
npm run install:all
```

## Ejecutar aplicación en local

```bash
npm run dev
```

- Frontend: http://127.0.0.1:5173
- Backend: http://127.0.0.1:3001

## Ejecutar tests iniciales

```bash
npm test
```

O por suite:

```bash
npm run test:api
npm run test:ui
```

## Credenciales válidas

- email: `qa@test.com`
- password: `Password123`

## Nota para entrevistadores

El sistema contiene defectos intencionales para que el candidato los identifique y automatice los casos más relevantes.
