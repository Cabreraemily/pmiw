//Emily Cabrera
//Com. 1
// https://youtu.be/ngUiSn8Ippc
let imagen;
let columnas = 20;
let filas = 20;
let espacio;

let activarEfecto = false; //Cambia el valor de false a true (activa el efecto)
let efectoEstatico = 0; //Posición inicial
let duracionEfecto = 70;

function preload() {
  imagen = loadImage("imagen.png");
}

function setup() {
 createCanvas(800, 400); 
  espacio = 400 / columnas;  //Espacio que ocupa la obra
  noStroke();
}

function draw() {
  background(0);
  image(imagen,0,0,400,400);
  let t = frameCount - efectoEstatico;

  if (activarEfecto && t > duracionEfecto) {
    activarEfecto = false;
  }

  // Lado derecho, la obra interactiva
  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      let posX = x * espacio + espacio / 2 + 400;  //desde la mitad de la pantalla para la derecha
      let posY = y * espacio + espacio / 2;

      let baseSize = calcularTamBase(x, y, columnas,filas, espacio);
      let olaEffect = 0;

      if (activarEfecto) {
        let d = dist(x, y, columnas / 2, filas / 2);
        let ola = sin(d - t * 0.1) * exp(-0.05 * t);
        olaEffect = ola * (espacio * 0.2);
      }

      let diameter = baseSize + olaEffect;
      dibujarCirculo(posX, posY, diameter);
    }
  }
}

//Función que no retorna 
function dibujarCirculo(x, y, tam) {
  fill(255);
  ellipse(x, y, tam, tam);
}

//Función que si retorna
function calcularTamBase(x, y,  columna,  fila,  esp) {
  let d = dist(x, y, columna / 2, fila / 2);
  return map(d, 0, columna/ 2, esp * 0.9, esp * 0.3);
}

//Haciendo click activa el efecto
function mousePressed() {
  if (!activarEfecto) {
    activarEfecto = true;
    efectoEstatico = frameCount;
  }
}

//Funciones en teclado, el efecto se reinicia con "R"
function keyPressed() {
  if (key == 'r' || key == 'R') {
    activarEfecto = false;
    efectoEstatico = 0;
  } else {     //Se activa el efecto con cualquier tecla menos la "R"
    activarEfecto = true;
    efectoEstatico = frameCount;
  }
}
