# Administrador de tareas

Aplicación web sencilla para registrar, visualizar y administrar tareas personales mediante estados, con persistencia de datos usando LocalStorage.

Este proyecto fue desarrollado como práctica de JavaScript enfocado en la manipulación del DOM, lógica de negocio y buenas prácticas de organización del código.

<img width="300" height="400" alt="Grabación 2026-04-27 185159" src="https://github.com/user-attachments/assets/b17c41ba-417d-4440-8ab8-62702f5b4289" />

## Funcionalidades

- Cuando no hay tareas se visualiza en la lista con el texto "No hay tareas registradas"
- Agregar tareas
- Prevenir que se vayan tareas en blanco
- Visualizar las tareas agregadas
- Agregar fecha en la cual fue agregada la tarea de forma dinamica mediante libreria date-fns
- Dar visto bueno de tarea realizada
- Organización de tareas mediante listas como "Todas, Pendientes y Realizadas"
- Organizar las tareas por fecha (Más recientes primero, Más antiguas primero)
- Agregar un prioridad a cada tarea (Alta, Media, Baja)
- Organizar las tareas por prioridad
- Colorimetria a las tareas segun su prioridad
- Eliminar tarea
- Eliminar todas la tareas
- Animacion al eliminarse la tarea
- Confirmación para saber si se desea eliminar la tarea
- Resumen de los estados de las tareas
- Genera un alerta de la tarea cuando la descripción esta vacia
- Editar tarea
- Barra de busqueda por titulo o descripción de la tarea
- Filtro para el resumen, cada vez que se cambie de esta (Todas, Pendientes o Realizadas), se modifica el resumen
- Modo oscuro
- Arrastar tareas para cambiarlas de posicion
- Modales para ver si la tarea realizo la accion correctamente (agregar, editar, eliminar o eliminar todas)
- Botón inicio para volver al formulario, cuando la lista sea muy larga
- Cerrar modales al clikear por fuera de él

## Tecnologías utilizadas

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![LocalStorage](https://img.shields.io/badge/LocalStorage-blue?style=for-the-badge&logo=google-chrome&logoColor=white)

## Estructura del proyecto 

/administrador-tareas
│
├── index.html
├── css/
│ └── .css
├── js/
│ └── administrador_tareas.js
├── icono
│ └── R.png
└── README.md

## Conceptos aplicados

- Manipulación del DOM
- Eventos (`addEventListener`)
- Arreglos y objetos
- Métodos de arrays (`push`, `filter`)
- Separación de responsabilidades
- Persistencia de datos en el navegador
- Refactorización de código
- Control de estado de la interfaz

## Cómo usar la aplicación

1. Escribe el titulo de la tarea
2. Ingresar la descripción de la tarea
3. Escoger la prioridad de la tarea
4. Haz clic en **"Agregar tarea"**
5. Usar botones para la clasificación del listado, entre "Todas",
    "Pendientes" y "Realizadas"
6. Usar el boton "Descripcion" para mostrar la descricion de la tarea
7. Usar el boton editar para modificar una tarea
8. Usar el boton Eliminar para borrar una tarea individual o todos a la vez
9. Usar el boton Realizada para tachar la tarea individual que ya esta realizada
10. Los datos se guardan automáticamente en el navegador
11. Escribir en la barra de busqueda por el titulo o la descripción de la tarea para encontrarla
12. Usar el selector de fecha "Mas antigua" o "Mas reciente" para organizarla por la fecha de entrada
13. Usar el selector de prioridad, para solo mostrar las tareas con dicha prioridad escogida
14. Usar el botón inicio para volver al formulario.

## Capturas de pantalla

<table>
  <tr align="center" >
    <td><b>Barra de búsqueda para filtrar tareas</b></td>
    <td><b>Colorimetria a las tareas segun su prioridad</b></td>
  </tr>
  <tr align="center">
    <td> <img width="200" height="300" src="https://github.com/user-attachments/assets/a8a6db24-e1a4-4b88-a8f0-a8aa365bcd48" /> </td> 
    <td> <img width="200" height="300" src="https://github.com/user-attachments/assets/be82db61-079e-43e7-96aa-28e25d2721ad" /> </td> 
  </tr>
  <tr align="center">
    <td><b>Organizar las tareas por prioridad</b></td>
    <td><b>Modales</b></td>
  </tr>
  <tr align="center">
    <td> <img width="200" height="300" src="https://github.com/user-attachments/assets/bfc2a961-ceda-4d42-8318-22e4c26c8dee" /> </td> 
    <td> <img width="200" height="300" src="https://github.com/user-attachments/assets/7b24f37f-feda-4b18-83f6-33b98b3830d4" /> </td>
  </tr> 
</table>

## Instalación y uso local

1. Hacer Download ZIP.
2. Abre el archivo `index.html` en tu navegador favorito.

## Posibles mejoras futuras

- Versión en React

## Autor

**Héctor Hacid Julio Meza**  
Desarrollo web frontend junior  

## Licencia
Este proyecto es de uso educativo y personal.
