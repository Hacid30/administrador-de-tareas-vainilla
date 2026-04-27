# Administrador de tareas

Aplicación web sencilla para registrar, visualizar y administrar tareas personales mediante estados, con persistencia de datos usando LocalStorage.

Este proyecto fue desarrollado como práctica de JavaScript enfocado en la manipulación del DOM, lógica de negocio y buenas prácticas de organización del código.

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

- [HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- [CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- [JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- [LocalStorage](https://img.shields.io/badge/LocalStorage-blue?style=for-the-badge&logo=google-chrome&logoColor=white)

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

## Instalación y uso local

1. Clona el repositorio: `git clone https://github.com/tu-usuario/tu-repositorio.git`
2. Abre el archivo `index.html` en tu navegador favorito.

## Posibles mejoras futuras

- Versión en React

## Autor

**Héctor Hacid Julio Meza**  
Desarrollo web frontend junior  

## Licencia
Este proyecto es de uso educativo y personal.