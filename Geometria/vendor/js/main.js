

const app = new Vue({
    el: "#app",
    methods: {
        shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        },
        contestar(respuesta) {

            if (this.preguntaActual.tipo != 3) {
                if (respuesta == this.preguntaActual.is) {
                    this.puntuacion += this.puntosXDificultad;
                    this.historialRespuestas.push(true);
                } else {
                    this.historialRespuestas.push(false);
                }
            } else {

                if (respuesta == this.preguntaActual.partes[this.indexP3].is) {
                    this.puntuacion += this.puntosXDificultad;
                    this.historialRespuestas.push(true);
                } else {
                    this.historialRespuestas.push(false);
                }

                this.indexP3++;
                if (this.indexP3 != this.preguntaActual.partes.length) {
                    this.historialP3.push({
                        cuerpo: this.preguntaActual.partes[this.indexP3 - 1].cuerpo,
                        respuesta: this.preguntaActual.partes[this.indexP3 - 1].opciones[this.preguntaActual.partes[this.indexP3 - 1].is]
                    });
                    this.tiempo = this.tiempoXDificultad;
                    return;
                } else {
                    this.historialP3 = [];
                    this.indexP3 = 0;
                }
            }

            this.index++;
            if (this.index != this.preguntas.length) {
                this.tiempo = this.tiempoXDificultad;
                this.preguntaActual = Object.assign({}, this.preguntas[this.index]);
            } else this.pagina = 3;

        },
        otraVez() {
            this.index = 0;
            this.puntuacion = 0;
            this.pagina = 1;
        },
        cronometro() {
            setInterval(function () {
                if (app.pagina == 2) {
                    app.tiempo--;
                }
                if (app.tiempo == 0 && app.pagina != 3) {
                    app.contestar(null);
                    app.tiempo = app.tiempoXDificultad;
                }
            }, 1000);
        },
        facil() {
            this.historialRespuestas = [];
            this.preguntas = this.shuffle(this.preguntas);
            this.nuevaPuntuacionMax = false;
            this.tiempoXDificultad = 30;
            this.puntosXDificultad = 1;
            this.tiempo = this.tiempoXDificultad;
            this.preguntaActual = Object.assign({}, this.preguntas[this.index]);
            this.pagina = 2;
        },
        normal() {
            this.historialRespuestas = [];
            this.preguntas = this.shuffle(this.preguntas);
            this.nuevaPuntuacionMax = false;
            this.tiempoXDificultad = 10;
            this.puntosXDificultad = 2;
            this.tiempo = this.tiempoXDificultad;
            this.preguntaActual = Object.assign({}, this.preguntas[this.index]);
            this.pagina = 2;
        },
        dificil() {
            this.historialRespuestas = [];
            this.preguntas = this.shuffle(this.preguntas);
            this.nuevaPuntuacionMax = false;
            this.tiempoXDificultad = 5;
            this.puntosXDificultad = 3;
            this.tiempo = this.tiempoXDificultad;
            this.preguntaActual = Object.assign({}, this.preguntas[this.index]);
            this.pagina = 2;
        }
    },
    data: {
        tiempo: 5,
        indexP3: 0,
        historialP3: [],
        nuevaPuntuacionMax: false,
        tiempoXDificultad: 0,
        puntosXDificultad: 0,
        dificultad: 0, //
        historialRespuestas: [],
        pagina: 1,
        puntuacionMaxima: 0,
        puntuacion: 0,
        preguntaActual: {
            tipo: -1
        },
        mensaje: '',
        index: 0,
        preguntas: [
            {
                 tipo: 1,
                 cuerpo: "(-2)-(+7)-(-12)+(+5)= 7",
                 is: false
             },
             {
                 tipo: 1,
                 cuerpo: "-10-(+2)+(-5)+(+4)-(-20) = 7",
                 is: true
             },
             {
                 tipo: 1,
                 cuerpo: "+15-(-15)-(+15)+(-15)= 1",
                 is: false
             },
             {
                 tipo: 1,
                 cuerpo: "(-1)^20= 1",
                 is: true
             },
             {
                 tipo: 1,
                 cuerpo: "(-1)^33= 1",
                 is: false
             },
             {
                 tipo: 1,
                 cuerpo: "En la ecuacion 1-2(1+6x-2(x+2))= -1 ,es  x=1 ?",
                 is: true
             },
             {
                 tipo: 1,
                 cuerpo: "En la ecuacion 3(x+1)-2x=x-(2+3(3-x)) ,es  x=-14/3 ?",
                 is: false
             },
             {
                 tipo: 1,
                 cuerpo: "En la ecuacion 3x+1=3-(2-2x) ,es  x=0 ?",
                 is: true
             },
             {
                 tipo: 1,
                 cuerpo: "En la ecuacion 2(x-3(x-4(x-(x/8+1))))=1 , es x=-25/17 ?",
                 is: false
             },
             {
                 tipo: 1,
                 cuerpo: "¿Por un punto pasan ...infinitas rectas?",
                 is: true
             }
             ,
             {
                 tipo: 1,
                 cuerpo: "¿Un segmento es..la parte de una recta comprendida entre dos puntos?",
                 is: true
             },
             {
                 tipo: 1,
                 cuerpo: "¿Una semirecta es ...un punto en el medio de una recta?",
                 is: false
             },
             {
                 tipo: 1,
                 cuerpo: "¿Un grado es la amplitud del angulo que resulta de dividir el angulo... completo en 90 partes iguales?",
                 is: false
             },
             {
                 tipo: 2,
                 cuerpo: '¿Hay 5 estuches en la mesa. Cada uno contiene como mínimo 10 lápices y como máximo 14. ¿Cuál de estos podría ser el total de lápices?',
                 opciones: [
                     '65',
                     '75',
                     '35'
                 ],
                 is: 0
             },{
                 tipo: 2,
                 cuerpo: 'Si X es menor que Y por una diferencia de 6 e Y es el doble de Z, ¿cuál es el valor de X cuando Z es igual a 2?',
                 opciones: [
                     '5',
                     '-2',
                     '10'
                 ],
                 is: 1
             },
             {
                 tipo: 2,
                 cuerpo: 'Si David tiene el doble de monedas de 5 céntimos que Tomás y Tomás tiene 15 monedas de 5 céntimos más que Juan, ¿cuántos euros tiene David si Juan tiene 6 monedas de cinco céntimos?',
                 opciones: [
                     '41',
                     '2.10',
                     '21',
                     '14'
                 ],
                 is: 1
             },
             {
                 tipo: 2,
                 cuerpo: '¿Lisa recibió un cheque regalo de 100 euros por su cumpleaños. Se compró unas deportivas que costaban 30 euros, un vestido de 23 euros y dos libros de 17 euros. ¿Cuánto dinero le quedó en el cheque regalo?',
                 opciones: [
                     '12',
                     '11',
                     '13',
                     'No se'
                 ],
                 is: 2
             },
             {
                 tipo: 2,
                 cuerpo: 'Cada estudiante puede elegir entre 4 tipos de sudadera y tres tipos de pantalones en su uniforme, ¿cuántas combinaciones posibles existen?',
                 opciones: [
                     '10',
                     '24',
                     '12',
                     'No se'
                 ],
                 is: 2
             },
             {
                 tipo: 2,
                 cuerpo: '3 (x-4) = 18. ¿Cuál es el valor de X?',
                 opciones: [
                     '6',
                     '14/3',
                     '22/3',
                     '10'
                 ],
                 is: 3
             },{
                 tipo: 2,
                 cuerpo: "Cecilia, Roberto y Braulio han comprado sellos. El total de sellos de Cecilia es de un solo dígito. Solo uno de los chicos tiene un número de sellos divisible por tres. Solo uno ha adquirido un número de sellos par. ¿Cuál de estas respuestas puede indicar la cantidad correcta de sellos de cada uno?",
                 opciones: [
                     '9,10,13',
                     '7,9,17',
                     '5,15,18',
                     'No se'
                 ],
                 is: 0
             },  
             {
                 tipo: 2,
                 cuerpo: 'Fran ha comprado varias cometas y cada una costaba 16 euros. Ricardo compró otras distintas y gastó 20 euros en cada una. Si el ratio en la cantidad de cometas entre las de Fran y las de Ricardo es de 3 a 2, ¿cuál es el coste medio de una cometa de las compradas por los dos?',
                 opciones: [
                             '16,7',
                             '18',
                             '16,8',
                             '17',
                             '17,6'
                         ],
                         is: 4
                     },
             

        ]/*
        
        preguntas: [{
                tipo: 3,
                partes: [{
                        cuerpo: 'Sistemas expertos son llamados así porque ',
                        opciones: [
                            'investiga',
                            'emulan',
                            'copian',
                            'desarrollan'
                        ],
                        is: 1
                    },
                    {
                        cuerpo: ' el ',
                        opciones: [
                            'pensamiento de un experto',
                            'comportamiento de un experto',
                            'razonamiento de un experto'
                        ],
                        is: 2
                    }

                ]
            },
            {
                tipo: 1,
                cuerpo: "Un SE tiene que tener la aptitud de comprender las preguntas del usuario",
                is: true
            },
            {
                tipo: 1,
                cuerpo: "Un SE usa la heurística",
                is: true
            },
            {
                tipo: 1,
                cuerpo: "Un SE accede a una base de datos",
                is: false
            },
            {
                tipo: 1,
                cuerpo: "Un Sistema Tradicional accede a una base de datos",
                is: false
            },
            {
                tipo: 2,
                cuerpo: "Calculas resultados",
                opciones: [
                    'Sistemas Tradicionales',
                    'Sistemas Expertos'
                ],
                is: 0   
            },
            {
                tipo: 2,
                cuerpo: "Dan resultados sin explicaciones",
                opciones: [
                    'Sistemas Expertos',
                    'Sistemas Tradicionales'
                ],
                is: 1
            },
            {
                tipo: 1,
                cuerpo: "Un SE no es costoso de desarrollar o mantener",
                is: false
            },
            {
                tipo: 1,
                cuerpo: "¿Los SEs son confiables?",
                is: true
            },
            {
                tipo: 1,
                cuerpo: "¿Un SE reduce el tiempo para en la toma de decisiones?",
                is: true
            },
            {
                tipo: 3,
                partes: [{
                        cuerpo: 'Con ayuda de los SE, las personas con poca experiencia pueden ',
                        opciones: [
                            'resolver problemas',
                            'comparar situaciones',
                            'ir por la comida'
                        ],
                        is: 0
                    },
                    {
                        cuerpo: ' que requieren de una conocimiento formal ',
                        opciones: [
                            'técnico',
                            'epecializado',
                            'profesional'
                        ],
                        is: 1
                    }

                ]
            },
            {
                tipo: 2,
                cuerpo: "La planificación está compuesto por ",
                opciones: [
                    'Un emulador y un sistema de control',
                    'Un simulador y un sitema de control',
                    'Un emulador y un simulador',
                    'Un sistema de control'
                ],
                is: 1
            },
            {
                tipo: 1,
                cuerpo: "Las redes Bayesianas son métodos de aprendizaje inspirados en la evoluación natural",
                is: false
            },
            {
                tipo: 2,
                cuerpo: " Técnica para tratar el razonamiento con incertidumbre ",
                opciones: [
                    'Redes Bayesianas',
                    'Redes Neuronales',
                    'Algorítmos genéticos',
                    'Aprendizaje'
                ],
                is: 0
            },
            {
                tipo: 2,
                cuerpo: " Obtención de conocimientos en bases de datos ",
                opciones: [
                    'Agentes inteligentes',
                    'Data Mining',
                    'Algorítmos genéticos'
                ],
                is: 1
            },
            {
                tipo: 2,
                cuerpo: " Recuperación de información en Internet ",
                opciones: [
                    'Agentes inteligentes',
                    'Data Mining',
                    'Algorítmos genéticos'
                ],
                is: 0
            }

            
        ]*/

    },
    created: function () {
        this.preguntaActual = Object.assign({}, this.preguntas[0]);
        if (localStorage.puntuacionMaxima) {
            this.puntuacionMaxima = localStorage.puntuacionMaxima;
            //localStorage.puntuacionMaxima = 0;
        } else {
            localStorage.puntuacionMaxima = 0;
            this.puntuacionMaxima = 0;
        };
        this.cronometro();
    },
    computed: {
        revisarPuntuacion() {
            if (this.puntuacion > this.puntuacionMaxima) {
                this.puntuacionMaxima = this.puntuacion;
                localStorage.puntuacionMaxima = this.puntuacion;
                this.mensaje = 'Nueva Puntuación Máxima';
                if (!this.nuevaPuntuacionMax) {
                    this.nuevaPuntuacionMax = true;
                }
                setTimeout(function () {
                    app.mensaje = '';
                }, 1000)
            }
            return '';
        }
    }
})
