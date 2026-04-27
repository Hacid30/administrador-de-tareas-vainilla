const { formatDistanceToNow } = window.dateFns;
const { es } =  window.dateFns.locale;

//==== Selectores DOM ====
    const formulario = document.getElementById('formulario');
    const tituloTarea = document.getElementById('tituloTarea');
    const descripcion = document.getElementById('descripcion');
    const lista = document.getElementById('lista');
    const btnTodas = document.getElementById('btnTodas');
    const btnPendientes = document.getElementById('btnPendientes');
    const btnRealizadas = document.getElementById('btnRealizadas');
    const resumen = document.getElementById('resumen');
    const buscar = document.getElementById('buscar');
    const vacioTituloTarea = document.getElementById('vacioTituloTarea');
    const btnEliminarTodo = document.getElementById('btnEliminarTodo');
    const filtroFecha = document.getElementById('filtroFecha');
    const mostrarFiltroFecha = document.getElementById('mostrarFiltroFecha');
    const prioridad = document.getElementById('prioridad');
    const modoOscuroClaro = document.getElementById('modoOscuroClaro');
    const body = document.getElementById('cuerpo');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const editarTitulo = document.getElementById('editarTitulo');
    const editarDescripcion = document.getElementById('editarDescripcion');
    const editarPrioridad = document.getElementById('editarPrioridad');
    const parrafoDescripcion = document.getElementById('parrafoDescripcion');
    const modalDescripcion = document.getElementById('modalDescripcion');
    const cerrarModal = document.getElementById('cerrarModal');
    const modalEliminarTarea = document.getElementById('modalEliminarTarea');
    const modalEliminarTodasTarea = document.getElementById('modalEliminarTodasTarea');
    const modalCambioEstado = document.getElementById('modalCambioEstado');
    const parrafoEstado = document.getElementById('parrafoEstado');
    const imagenEstado = document.getElementById('imagenEstado');
    const mostrarFiltroPrioridad = document.getElementById('mostrarFiltroPrioridad');
    const filtroPrioridad = document.getElementById('filtroPrioridad');
    const inicio = document.getElementById('inicio');
    const mostrarParrafo = document.getElementById('mostrarParrafo');

initApp();

function initApp(){
    const estadoApp = {
    tareas : [],
    ui : {
        busqueda : '',
        modo : localStorage.getItem('modo') || 'claro',
        filtro : 'todas',
        tareaArrastrada : null,
        tareaParaEditar : null,
        tareaParaEliminar : null,
        mensajeEstado : null,
        modalActivo : null,
        valorFiltroPrioridad:'ninguna',
        valorFiltroFecha: 'ninguna'
    }
    };

    // === Inicialización ===
    initPersistencia();
    initUI();
    initEventos();
    renderUi();

    setInterval(()=> { renderUi(); }, 60000);

    // === Inits ===
    function initPersistencia(){
        cargaLocalStorage();
    }

    function initUI(){
        aplicarModo();
    }

    //==== Eventos ====
    function initEventos(){
        formulario.addEventListener('submit', agregarTarea);

        buscar.addEventListener( 'input', (e) => {
            estadoApp.ui.busqueda = e.target.value.toLowerCase();
            renderUi();
        });

        btnTodas.addEventListener('click', ()  => {
            estadoApp.ui.filtro = 'todas';
            btnPendientes.classList.remove('btnActivo');
            btnTodas.classList.add('btnActivo');
            btnRealizadas.classList.remove('btnActivo');
            renderUi();
        });

        btnPendientes.addEventListener('click', () => {
            estadoApp.ui.filtro = 'pendiente';
            btnPendientes.classList.add('btnActivo');
            btnTodas.classList.remove('btnActivo');
            btnRealizadas.classList.remove('btnActivo');
            renderUi();
        });

        btnRealizadas.addEventListener('click', () => {
            estadoApp.ui.filtro = 'realizada';
            btnPendientes.classList.remove('btnActivo');
            btnTodas.classList.remove('btnActivo');
            btnRealizadas.classList.add('btnActivo');
            renderUi();
        });

        btnEliminarTodo.addEventListener('click', () => {
            modalEliminarTodasTarea.classList.add('activo');
            clicksEnModal(modalEliminarTodasTarea);
        });

        filtroFecha.addEventListener('change', organizarFechas);
        filtroPrioridad.addEventListener('change', organizarPrioridad);

        modoOscuroClaro.addEventListener('click',cambioModo);

        lista.addEventListener('click', (e) =>{
            const li = e.target.closest('li');
            if(!li) return;
            const id = Number(li.dataset.id);
            const tarea = estadoApp.tareas.find(t => t.id === id);

            if(e.target.classList.contains('realizada-btn')){
                tarea.estado = tarea.estado === "pendiente" ? "realizada" : "pendiente";
                actualizarEstado();
                }
            else if(e.target.classList.contains('eliminar')){
                modalEliminarTarea.classList.add('activo');
                estadoApp.ui.tareaParaEliminar = tarea.id;
                clicksEnModal(modalEliminarTarea);
                }
            else if(e.target.classList.contains('editar-btn')){
                modal.classList.add('activo');
                clicksEnModal(modal);
                cargarDatosEditados(tarea);
                }
            else if(e.target.classList.contains('descrip')){
                parrafoDescripcion.textContent = tarea.descripcion;
                modalDescripcion.classList.add('activo');
                clicksEnModal(modalDescripcion);
                cerrarModal.onclick = () => modalDescripcion.classList.remove('activo');
                }
            });

        //Evento para cerrar los modales con el botón escape
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && estadoApp.ui.modalActivo) {
                estadoApp.ui.modalActivo.classList.remove('activo');
                estadoApp.ui.modalActivo =  null;
            }
        });

        //Evento para el modal de elimiar tarea
        modalEliminarTarea.addEventListener('click', manejarModalEliminar);

        modalEliminarTodasTarea.addEventListener('click', (e) => {
            modalEliminarTodasTarea.classList.add('activo');

            if(e.target.classList.contains('aceptarEliminar')){
                eliminarTodo();
                modalEliminarTodasTarea.classList.remove('activo');
            }
            else if(e.target.classList.contains('CancelarEliminar')){
                modalEliminarTodasTarea.classList.remove('activo');
            }
        })

        //Eventos de Drag & Drop
        lista.addEventListener('dragover', (e) => {
                e.preventDefault();
        });

        lista.addEventListener('drop', (e) => {
            const item =  e.target.closest('li');
            if(!item) return;
            const id = Number(item.dataset.id);

            const indexArrastrado = estadoApp.tareas.findIndex(t => t.id === estadoApp.ui.tareaArrastrada);
            const indexDestino =  estadoApp.tareas.findIndex(t => t.id === id);

            const tareaMovida = estadoApp.tareas.splice(indexArrastrado, 1) [0];
            estadoApp.tareas.splice(indexDestino,0,tareaMovida);
            estadoApp.ui.tareaArrastrada = null;
            actualizarEstado();
        })

        //Modal para editar una tarea
        modalContent.addEventListener('click', (e) => {
            if(e.target.classList.contains('guardarTarea')){
                const valorEditarTitulo =  editarTitulo.value.trim();
                const valorEditarDescripcion =  editarDescripcion.value.trim();
                const valorEditarPrioridad = editarPrioridad.value;

                estadoApp.ui.mensajeEstado = "editado";
                editarTarea(estadoApp.ui.tareaParaEditar, valorEditarTitulo, valorEditarDescripcion, valorEditarPrioridad);
                cambioEstadoModal();
            }
            else if(e.target.classList.contains('cancelarTarea')){
                modal.classList.remove('activo');
            }
            
        })

        inicio.addEventListener('click', subirInicio);
        function subirInicio(){
            formulario.scrollIntoView( { behavior: 'smooth'} );
        }
    }
    
    //==== FUNCIONDES DE CRUD ====
    function agregarTarea(event){
        event.preventDefault();

        const valorTituloTarea = tituloTarea.value.trim();
        const valorDescripcion = descripcion.value.trim();
        const valorPrioridad = prioridad.value;
        
        //Validar si el titulo o la descripcion se encuentran vacias
        if(valorTituloTarea === '' || valorDescripcion === ''){
            validarInput(valorTituloTarea, valorDescripcion);
            return;
        }else{
            vacioTituloTarea.classList.remove('error');
            tituloTarea.classList.remove('input-error');
            descripcion.classList.remove('input-error');
        }
        
        //Objeto de tarea
        const tarea =  crearTarea(valorTituloTarea, valorDescripcion, valorPrioridad); 

        estadoApp.tareas.push(tarea);
        event.target.reset();
        
        const item = lista.lastElementChild;
        
        if(item){
        item.classList.add('nueva');

        requestAnimationFrame(() => {
            item.classList.remove('nueva');
        });
        }

        estadoApp.ui.mensajeEstado = 'submit';
        actualizarEstado();
        cambioEstadoModal();
    }

    function editarTarea(id, titulo, descripcion, prioridad){
        estadoApp.tareas = estadoApp.tareas.map(tarea => {
            if(tarea.id === id){
                return {
                    ...tarea,
                    titulo,
                    descripcion,
                    prioridad
                };
            }
            return tarea;
        }
        );

        estadoApp.ui.tareaParaEditar = null;

        modal.classList.remove('activo');
        
        actualizarEstado();
    }

    function eliminarTarea(id){
        const item = document.querySelector(`li[data-id='${id}']`);
        
        if(!item) {
            console.log("Error: No se encontró el elemento HTML");
            return;
        }

        item.classList.add('eliminando');
        
        const finalizarAnimacion = (e) => {
            if(e.propertyName !== 'opacity') return;
            
            item.removeEventListener('transitionend', finalizarAnimacion);
            
            const index = estadoApp.tareas.findIndex(t => t.id === id);
            estadoApp.tareas.splice(index, 1);
            actualizarEstado();
        };

        item.addEventListener('transitionend', finalizarAnimacion);
    }

    function eliminarTodo(){    
        lista.classList.add('eliminando');

        const manejoTransicion =  (e) => {
            if(e.propertyName !== 'opacity') return;

            estadoApp.tareas = [];
            actualizarEstado();
            mostrarBtnEliminar();
            
            estadoApp.ui.mensajeEstado = "eliminandoTodo";
            cambioEstadoModal();

            lista.removeEventListener('transitionend', manejoTransicion);
        };

        lista.addEventListener('transitionend', manejoTransicion);
    }

    function cargarDatosEditados(tarea){
        editarTitulo.value = tarea.titulo;
        editarDescripcion.value = tarea.descripcion;
        editarPrioridad.value = tarea.prioridad;
        
        estadoApp.ui.tareaParaEditar = tarea.id;
    }

    //===== FUNCIONES PARA MOTRAR LOS DATOS EN UI =====
    function renderUi(){
        let resultado = [...estadoApp.tareas].sort((a,b) => {
            if(a.estado === 'pendiente' && b.estado === 'realizada') return -1;
            if(b.estado === 'realizada' && a.estado === 'pendiente') return 1;
            return 0;
        });

        if(estadoApp.ui.filtro !== 'todas'){
            resultado = resultado.filter( tarea => tarea.estado === estadoApp.ui.filtro );
        }
        if(estadoApp.ui.busqueda !== ""){
            const textoBusqueda = estadoApp.ui.busqueda.toLowerCase();
            resultado = resultado.filter(tarea => 
                tarea.titulo.toLowerCase().includes(textoBusqueda) ||
                tarea.descripcion.toLowerCase().includes(textoBusqueda)
        );
        }
        if(estadoApp.ui.valorFiltroPrioridad !== 'ninguna'){
            resultado = resultado.filter(tarea => tarea.prioridad === estadoApp.ui.valorFiltroPrioridad);
        }
        if(estadoApp.ui.valorFiltroFecha !== 'ninguna'){
            if(estadoApp.ui.valorFiltroFecha === 'masReciente'){
                resultado = resultado.sort((a,b) => b.fechaCreacion  - a.fechaCreacion);
            } else if (estadoApp.ui.valorFiltroFecha === 'masAntigua'){
                resultado = resultado.sort((a,b) => a.fechaCreacion - b.fechaCreacion);
            }
        }

        mostrarLista(resultado);
        mostrarBtnEliminar();
    }

    function mostrarLista(tareasFiltradas){
        lista.innerHTML = '';

        const fragment = document.createDocumentFragment();

        if(tareasFiltradas.length === 0){
            lista.innerHTML = '<li class= "lista-vacia">No tienes tareas registradas</li>';
            lista.classList.remove('eliminando');
            actualizarResumen(tareasFiltradas);
            return;
        }
        
        tareasFiltradas.forEach( tarea =>{
            const item = crearItem(tarea,  estadoApp);
            fragment.appendChild(item);
        });

        lista.appendChild(fragment);
        actualizarResumen(tareasFiltradas);
    }

    function mostrarBtnEliminar(){
        btnEliminarTodo.style.display = estadoApp.tareas.length >= 2 ? 'flex' : 'none';
        mostrarFiltroFecha.style.display = estadoApp.tareas.length >= 2 ? 'flex' : 'none';
        mostrarFiltroPrioridad.style.display = estadoApp.tareas.length >= 2 ? 'flex' : 'none';
        inicio.style.display = estadoApp.tareas.length >= 2 ? 'flex' : 'none';
        mostrarParrafo.style.display = estadoApp.tareas.length >= 2 ? 'flex' : 'none';
    }

    function organizarFechas(){
        estadoApp.ui.valorFiltroFecha = filtroFecha.value;
        renderUi();
    }

    function organizarPrioridad(){
        estadoApp.ui.valorFiltroPrioridad = filtroPrioridad.value;
        renderUi();
    }

    function cambioEstadoModal(){
        if(estadoApp.ui.mensajeEstado === 'submit'){
            activacionModal();
            parrafoEstado.innerText = '!La tarea se agregó correctamente!';
            imagenEstado.alt = 'Confirmación de que se agrego la tarea';
        }
        else if(estadoApp.ui.mensajeEstado === "editado"){
            activacionModal();
            parrafoEstado.innerText = '!La tarea se editó correctamente!';
            imagenEstado.alt = 'Confirmación de que se edito la tarea';
        }
        else if(estadoApp.ui.mensajeEstado === "eliminadaTarea"){
            activacionModal();
            parrafoEstado.innerText = '!La tarea se eliminó correctamente!';
            imagenEstado.alt = 'Confirmación de que se elimino la tarea';
        }
        else if(estadoApp.ui.mensajeEstado === "eliminandoTodo"){
            activacionModal();
            parrafoEstado.innerText = '!Todas las tareas fueron eliminadas!';
            imagenEstado.alt = 'Confirmación de que se eliminaron todas las tareas';
        } 
    }

    //Funcion para captar el evento click en los botones de aceptar o eliminar
    function manejarModalEliminar(e){
        if(e.target.classList.contains('aceptarEliminar')){
            eliminarTarea(estadoApp.ui.tareaParaEliminar);
            modalEliminarTarea.classList.remove('activo');
            estadoApp.ui.tareaParaEliminar = null;
            estadoApp.ui.mensajeEstado = "eliminadaTarea";
            cambioEstadoModal();
        }
        else if(e.target.classList.contains('CancelarEliminar')){
            modalEliminarTarea.classList.remove('activo');
        }   
    }

    function aplicarModo(){
        if(estadoApp.ui.modo === 'oscuro'){
            body.classList.add('oscuro');
            modoOscuroClaro.innerHTML = 'Modo Claro &#127774;'
        }else{
            body.classList.remove('oscuro');
            modoOscuroClaro.innerHTML = 'Modo Oscuro &#127769;'
        }
    }

    function cambioModo(){
        document.body.classList.toggle('oscuro');
        if(estadoApp.ui.modo === 'oscuro'){
            estadoApp.ui.modo = 'claro';
        }else{
            estadoApp.ui.modo = 'oscuro';
        }
        aplicarModo();
        localStorage.setItem('modo', estadoApp.ui.modo);
    }

    //Funcion para mostrar el visto bueno que se realizao una tarea
    function activacionModal(){
        modalCambioEstado.classList.add('activo');
        imagenEstado.src = './img/marca-verificacion-doble-circulo-verde_78370-1749.avif';
        setTimeout(() => {modalCambioEstado.classList.remove('activo');}, 1500);
        estadoApp.ui.mensajeEstado = null; 
    }

    //Funcion para cuando se de click fuera del modal, este se cierre
    function clicksEnModal(modal){
        estadoApp.ui.modalActivo = modal;
        modal.onclick = (e) =>{
            if(e.target === modal) {
            modal.classList.remove('activo');
            estadoApp.ui.modalActivo = null;
            }
        };
    }

    //====== FUNCION PARA MOSTRAR DATOS EN RESUMEN ====

    function actualizarResumen(resultado){
        const total = estadoApp.tareas.length;
        const totalActuales = resultado.length;
        const pendientes = resultado.filter(tarea => tarea.estado === 'pendiente').length;
        const realizadas = resultado.filter(tarea => tarea.estado === 'realizada').length;

        resumen.textContent = `
        Total: ${total} |
        Mostradas: ${totalActuales} |
        Pendientes: ${pendientes} | 
        Realizadas: ${realizadas} 
        `;
    }

    // ==== COMPLEMENTOS ====
    function actualizarEstado(){
        guardarLocalStorage();
        renderUi(); 
    }

    //=== PERSISTNECIAS ===

    function guardarLocalStorage(){
        try {
            localStorage.setItem('tareas', JSON.stringify(estadoApp.tareas));
        } catch (error) {
            console.error("No se pudo guardar en el navegador:", error);
        }
    }

    function cargaLocalStorage(){
        const datos = localStorage.getItem('tareas');

        if(!datos) return;

        const parsed = JSON.parse(datos);

        if(!Array.isArray(parsed)){
            localStorage.removeItem('tareas');
            return
        }

        estadoApp.tareas = parsed.filter(tarea => 
            tarea &&
            typeof tarea.id == 'number' &&
            typeof tarea.titulo == 'string' &&
            typeof tarea.descripcion == 'string'
        );
    }
}

function crearTarea(titulo, descripcion, prioridad){
        return {
        id: Date.now(),
        titulo: titulo,
        descripcion: descripcion,
        estado: "pendiente",
        fechaCreacion: Date.now(),
        prioridad: prioridad
        };
}

function validarInput(tituloValidar, descripcionValidar){
    if(!tituloValidar){
        tituloTarea.classList.add('input-error');
        vacioTituloTarea.classList.add('error');
        vacioTituloTarea.textContent = "¡Ey! No puedes dejar el título vacío";
    }else if(!descripcionValidar){
        descripcion.classList.add('input-error');
        vacioTituloTarea.textContent = "¡Ey! No puedes dejar la descripción vacía";
        vacioTituloTarea.classList.add('error');
    }
}

function crearItem(tarea, estado){
    const li = document.createElement('li');
    li.dataset.id = tarea.id;

    const formatoRelativo = formatDistanceToNow(tarea.fechaCreacion, {
        addSuffix: true,
        locale: es
    });

    li.innerHTML = `
    <div>
    <strong> ${tarea.titulo} </strong> |
    <span> ${formatoRelativo} </span> | 
    <span> ${tarea.prioridad.toUpperCase()} </span>
    </div>
    <div>
    <button class='descrip' > Descripción </button>
    <button class='editar-btn' > Editar </button>
    <button class="realizada-btn"> &#10004; </button>
    <button class='eliminar'> &#128465; </button>
    </div>
    `;  
    
    li.draggable = true;

    li.addEventListener('dragstart', (e) => {
        estado.ui.tareaArrastrada = Number(e.target.dataset.id);
    });

    li.classList.add(tarea.prioridad);

    if(tarea.estado ===  "realizada") li.classList.add('realizada');

    return li;
}