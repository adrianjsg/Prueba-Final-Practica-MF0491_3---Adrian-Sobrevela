
//Autor: [Adrián Sobrevela]
//Fecha: [13/04/2024]
//Descripción: [Prueba-Final-Practica-MF0491_3---Adrian-Sobrevela]



class Alimento {
    constructor(nombre, calorias, proteinas, carbohidratos, grasas) {
        this.nombre = nombre;
        this.calorias = calorias;
        this.proteinas = proteinas;
        this.carbohidratos = carbohidratos;
        this.grasas = grasas;
    }
}

class Fruta extends Alimento {
    constructor(nombre, calorias, proteinas, carbohidratos, grasas, vitaminas) {
        super(nombre, calorias, proteinas, carbohidratos, grasas);
        this.vitaminas = vitaminas;
    }
}

class Vegetal extends Alimento {
    constructor(nombre, calorias, proteinas, carbohidratos, grasas, fibra) {
        super(nombre, calorias, proteinas, carbohidratos, grasas);
        this.fibra = fibra;
    }
}

class Carne extends Alimento {
    constructor(nombre, calorias, proteinas, carbohidratos, grasas, tipo) {
        super(nombre, calorias, proteinas, carbohidratos, grasas);
        this.tipo = tipo;
    }
}

class Postre extends Alimento {
    constructor(nombre, calorias, proteinas, carbohidratos, grasas, sabor) {
        super(nombre, calorias, proteinas, carbohidratos, grasas);
        this.sabor = sabor;
    }
}


document.addEventListener("DOMContentLoaded", function() {
    const alimentosConsumidos = [];

    // Función para agregar campo de alimento consumido
    function agregarCampoAlimento() {
        const nuevoCampo = document.createElement('div');
        nuevoCampo.innerHTML = `
            <label for="alimento">Alimento:</label>
            <input type="text" name="alimento" placeholder="Ingrese el nombre del alimento">
            <label for="calorias">Calorías:</label>
            <input type="number" name="calorias" placeholder="Ingrese las calorías">
            <label for="proteinas">Proteínas:</label>
            <input type="number" name="proteinas" placeholder="Ingrese las proteínas">
            <label for="carbohidratos">Carbohidratos:</label>
            <input type="number" name="carbohidratos" placeholder="Ingrese los carbohidratos">
            <label for="grasas">Grasas:</label>
            <input type="number" name="grasas" placeholder="Ingrese las grasas">
        `;
        document.getElementById('alimentos').appendChild(nuevoCampo);
    }

    // Función para calcular el contenido nutricional total
    function calcularContenidoNutricional(alimentos) {
        let totalProteinas = 0;
        let totalCarbohidratos = 0;
        let totalGrasas = 0;
        let totalCalorias = 0;

        alimentos.forEach(alimento => {
            totalProteinas += alimento.proteinas;
            totalCarbohidratos += alimento.carbohidratos;
            totalGrasas += alimento.grasas;
            totalCalorias += alimento.calorias;
        });

        return { totalProteinas, totalCarbohidratos, totalGrasas, totalCalorias };
    }

    // Función para verificar si está dentro de los objetivos calóricos del usuario
    function verificarObjetivosCaloricos(totalCalorias, objetivoCaloricoDiario) {
        if (totalCalorias > objetivoCaloricoDiario) {
            return "Te has pasado del objetivo calórico diario.";
        } else if (totalCalorias < objetivoCaloricoDiario) {
            return "Estás por debajo del objetivo calórico diario.";
        } else {
            return "Estás dentro del objetivo calórico diario.";
        }
    }

    // Función para calcular las calorías recomendadas según género y nivel de actividad
    function calcularCaloriasRecomendadas(genero, nivelActividad) {
        let caloriasMinimas = 0;
        let caloriasMaximas = 0;

        if (genero === 'hombre') {
            caloriasMinimas = nivelActividad === 'activo' ? 2400 : 1800;
            caloriasMaximas = nivelActividad === 'activo' ? 3000 : 2400;
        } else if (genero === 'mujer') {
            caloriasMinimas = nivelActividad === 'activo' ? 1800 : 1400;
            caloriasMaximas = nivelActividad === 'activo' ? 2400 : 2000;
        }

        return { caloriasMinimas, caloriasMaximas };
    }

    // Función para calcular la diferencia entre las calorías consumidas y el objetivo diario
    function compararCaloriasConsumidas(objetivoCaloricoDiario, totalCalorias) {
        const diferenciaCalorias = totalCalorias - objetivoCaloricoDiario;

        if (diferenciaCalorias > 0) {
            return `Has excedido tu objetivo por ${diferenciaCalorias} calorías.`;
        } else if (diferenciaCalorias < 0) {
            return `Te faltan ${Math.abs(diferenciaCalorias)} calorías para alcanzar tu objetivo.`;
        } else {
            return "Has alcanzado tu objetivo calórico.";
        }
    }

    // Evento para agregar campo de alimento al hacer clic en un botón
    document.getElementById('agregar-alimento').addEventListener('click', agregarCampoAlimento);

    // Evento para calcular el contenido nutricional al hacer clic en un botón
    document.getElementById('calcular-contenido').addEventListener('click', function() {
        const alimentosInputs = document.getElementsByName('alimento');
        const caloriasInputs = document.getElementsByName('calorias');
        const proteinasInputs = document.getElementsByName('proteinas');
        const carbohidratosInputs = document.getElementsByName('carbohidratos');
        const grasasInputs = document.getElementsByName('grasas');

        for (let i = 0; i < alimentosInputs.length; i++) {
            const nombre = alimentosInputs[i].value;
            const calorias = parseFloat(caloriasInputs[i].value);
            const proteinas = parseFloat(proteinasInputs[i].value);
            const carbohidratos = parseFloat(carbohidratosInputs[i].value);
            const grasas = parseFloat(grasasInputs[i].value);

            const alimento = new Alimento(nombre, calorias, proteinas, carbohidratos, grasas);
            alimentosConsumidos.push(alimento);
        }

        const { totalProteinas, totalCarbohidratos, totalGrasas, totalCalorias } = calcularContenidoNutricional(alimentosConsumidos);
        
        const objetivoCaloricoInput = document.getElementById('objetivo-calorico').value;
        const generoInput = document.getElementById('genero').value;
        const nivelActividadInput = document.getElementById('nivel-actividad').value;
        const objetivoCaloricoDiario = parseFloat(objetivoCaloricoInput);

        const { caloriasMinimas, caloriasMaximas } = calcularCaloriasRecomendadas(generoInput, nivelActividadInput);

        const resultadosHTML = `
            <h2>Resultados:</h2>
            <p>Total de calorías: ${totalCalorias}</p>
            <p>Total de proteínas: ${totalProteinas} g</p>
            <p>Total de carbohidratos: ${totalCarbohidratos} g</p>
            <p>Total de grasas: ${totalGrasas} g</p>
            <p>${verificarObjetivosCaloricos(totalCalorias, objetivoCaloricoDiario)}</p>
            <p>Calorías recomendadas diarias: ${caloriasMinimas} - ${caloriasMaximas}</p>
            <p>${compararCaloriasConsumidas(objetivoCaloricoDiario, totalCalorias)}</p>
        `;

        document.getElementById('resultados').innerHTML = resultadosHTML;
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Función para aumentar el tamaño de la fuente
    document.getElementById('aumentar-tamano-fuente').addEventListener('click', function() {
        cambiarTamanoFuente(2); // Aumentamos el tamaño en 2 píxeles
    });

    // Función para disminuir el tamaño de la fuente
    document.getElementById('disminuir-tamano-fuente').addEventListener('click', function() {
        cambiarTamanoFuente(-2); // Disminuimos el tamaño en 2 píxeles
    });

    // Función para cambiar el tamaño de la fuente
    function cambiarTamanoFuente(cambio) {
        // Obtenemos el tamaño actual de la fuente
        var tamanoFuenteActual = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size'));
        // Calculamos el nuevo tamaño de la fuente
        var nuevoTamanoFuente = tamanoFuenteActual + cambio;
        // Aplicamos el nuevo tamaño de fuente al body
        document.body.style.fontSize = nuevoTamanoFuente + 'px';
    }
});











