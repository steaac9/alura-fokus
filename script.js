//Variables
const html = document.querySelector('html')
const botonCorto = document.querySelector('.app__card-button--corto')
const botonEnfoque = document.querySelector('.app__card-button--enfoque')
const botonLargo = document.querySelector('.app__card-button--largo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botones = document.querySelectorAll('.app__card-button')
const inputEnfoqueMusica = document.querySelector('#alternar-musica')
const botonIniciarPausar = document.querySelector('#start-pause')
const textoIniciarPausar = document.querySelector('#start-pause span')
const iconoIniciarPausar = document.querySelector(".app__card-primary-butto-icon")
const tiempoEnPantalla = document.querySelector('#timer')

const musica = new Audio('./sonidos/luna-rise-part-one.mp3')
const sonidoCero = new Audio('./sonidos/beep.mp3')
const sonidoInicio = new Audio('./sonidos/play.wav')
const sonidoPausa = new Audio ('./sonidos/pause.mp3')

let tiempoTrascurridoEnSegundo = 1500
let idIntervalo = 1

//Música
musica.loop = true

inputEnfoqueMusica.addEventListener('change', ()=> {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

//Botones
botonCorto.addEventListener('click', () => {
    tiempoTrascurridoEnSegundo = 300
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
})

botonEnfoque.addEventListener('click', () =>{
    tiempoTrascurridoEnSegundo = 1500
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
})

botonLargo.addEventListener('click', () =>{
    tiempoTrascurridoEnSegundo = 900
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')
})

//Imágenes
function cambiarContexto(contexto){

    mostrarTiempo()

    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagenes/${contexto}.png`)

    //Titulo
    switch(contexto){
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;
        case "descanso-corto":
            titulo.innerHTML = `¿Qué tal tomar un respiro?<br><strong class="app__title-strong"> ¡Haz una pausa corta!</strong>`
            break;
        case "descanso-largo":
            titulo.innerHTML = `Hora de volver a la superficie.<br> <strong class="app__title-strong">Haz una pausa larga.</strong>`
            break;
    }
}

//Temporizador
const cuentaRegresiva = () => {
    if(tiempoTrascurridoEnSegundo <= 0){
        sonidoCero .play()
        alert ('¡El tiempo acabó!')
        reiniciar()        
        return
    }
    textoIniciarPausar.textContent = "Pausar"
    tiempoTrascurridoEnSegundo -= 1
    mostrarTiempo()
}

botonIniciarPausar.addEventListener('click', iniciarPausar)

function iniciarPausar(){
    if(idIntervalo){
        sonidoPausa.play();
        reiniciar()
        return
    }
    sonidoInicio.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000)
    iconoIniciarPausar.setAttribute('src', `/imagenes/pause.png`);
}

function reiniciar(){
    clearInterval(idIntervalo)
    textoIniciarPausar.textContent = "Comenzar"
    iconoIniciarPausar.setAttribute('src', `/imagenes/play_arrow.png`);
    idIntervalo = null    
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoTrascurridoEnSegundo * 1000)
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', {minute:'2-digit', second:'2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo()