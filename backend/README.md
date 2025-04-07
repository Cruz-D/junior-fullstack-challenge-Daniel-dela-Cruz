# 🧪 Instrucciones de la prueba técnica

Esta prueba consiste en completar una API y desarrollar una pequeña aplicación frontend que consuma dicha API. El backend ya tiene una estructura base siguiendo **Clean Architecture**, con una base de datos **en memoria**.

---

## 🧠 Backend

### ✅ Estado inicial
- La solución está estructurada siguiendo Clean Architecture.
- Se utiliza una **In-Memory Database** (tenlo en cuenta: **los datos se pierden al reiniciar el servidor**).
- La entidad principal es `TaskItem`.
- El repositorio (`ITaskRepository`) está parcialmente implementado.
- Algunos **casos de uso** (`UseCases`) están implementados, otros están incompletos.
- El controlador (`TaskItemController`) tiene algunas acciones funcionales y otras a medio hacer.

### 🎯 Qué tienes que hacer

#### ✍️ Terminar de implementar los siguientes endpoints:

- `GET /api/TaskItem` — Obtener todas las tareas.
- `GET /api/TaskItem/{id}` — Obtener una tarea por su ID.
- `POST /api/TaskItem` — Crear una nueva tarea.
- `PUT /api/TaskItem/{id}/complete` — Marcar una tarea como completada.
- `DELETE /api/TaskItem/{id}` — Eliminar una tarea.

#### ➕ Implementar estos dos endpoints adicionales:

1. `PUT /api/TaskItem/{id}` — Editar tarea (solo **nombre**, **descripción** y **fecha de vencimiento**).  
   ❌ **No debe permitir editar el campo `IsCompleted`.**

2. `PUT /api/TaskItem/{id}/priority` — Asignar una **prioridad** a la tarea.  
   🔢 La prioridad debe ser un número del 1 al 5.

> Puedes modificar la entidad `TaskItem` si lo necesitas para agregar campos como `Priority` u otros.

### 🧠 Recomendaciones

- No necesitas ser experto en Clean Architecture, pero se valorará que respetes la arquitectura actual.
- Sigue las convenciones REST para naming y rutas.
- Crea las clases necesarias (DTOs, casos de uso, validaciones...).
- El código base ya te da todas las pistas necesarias para seguir un buen patrón.

---

## 💻 Frontend

El objetivo es desarrollar una **aplicación web en React** que consuma la API REST anterior. El uso de **Typescript** es obligatorio.

### 🎯 Requisitos mínimos funcionales

Tu aplicación debe permitir:

1. **Listar todas las tareas** existentes.
2. **Cambiar la prioridad** de una tarea.
3. **Eliminar una tarea**.

> **No es necesario implementar formularios de creación o edición de tareas.**  
> **No es necesario implementar login, gestión de usuarios, ni autenticación.**

### 🛠 Tips y aclaraciones

- Como la base de datos es **en memoria**, cada vez que reinicies el backend **se perderán los datos**.
- Para poder probar el frontend, deberás registrar tareas **manualmente** utilizando alguna de estas opciones:
  - **Postman** apuntando a la API en `localhost`.
  - **Swagger UI** incluido en la API, accesible en la ruta `https://localhost:{puerto}/swagger`.
- Asegúrate de que el frontend **consume la API local** correctamente (mismo puerto, CORS, etc.).
- Lo que se pide es el mínimo. Puedes ampliar la funcionalidad o la estética como consideres.

---

## ⏱ Tiempo estimado

- Si ya tienes experiencia, podrías completarlo en unas 3-4 horas.
- Si estás empezando, puede llevarte algo más. Se valorará la calidad y la claridad del código, no solo que funcione.

---

## 🚚 Cómo entregarlo

1. **Haz un fork** de este repositorio.
2. Clona el repositorio a tu máquina local y realiza los cambios necesarios para completar la prueba.
3. Una vez que hayas completado la prueba, **haz un commit de tus cambios**.
4. **Sube tus cambios** al repositorio de tu fork.
5. Envía la URL de tu repositorio con la solución.

> **Nota**: Asegúrate de que tu código esté limpio, documentado y funcional antes de enviarlo.
