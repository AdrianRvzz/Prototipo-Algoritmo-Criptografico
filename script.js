 // Función para cifrar el mensaje con AES
 document.getElementById("cifrarBtn").addEventListener("click", function () {
    var claveCifrado = document.getElementById("claveCifrado").value;
    var mensajeOriginal = document.getElementById("mensajeOriginal").value;

    var textoCifrado = CryptoJS.AES.encrypt(mensajeOriginal, claveCifrado).toString();
    document.getElementById("textoCifrado").innerText = textoCifrado;
  });

  // Función para descifrar el mensaje con AES
  document.getElementById("descifrarBtn").addEventListener("click", function () {
    var claveDescifrado = document.getElementById("claveDescifrado").value;
    var textoCifrado = document.getElementById("textoCifrado").textContent;

    var bytesDecifrados = CryptoJS.AES.decrypt(textoCifrado, claveDescifrado);
    var textoDescifrado = bytesDecifrados.toString(CryptoJS.enc.Utf8);

    if (textoDescifrado) {
      document.getElementById("textoDescifrado").innerText = textoDescifrado;
      document.getElementById("claveIncorrecta").innerText = ""; 
    } else {
        document.getElementById("textoDescifrado").innerText = "";
      document.getElementById("claveIncorrecta").innerText = "Clave incorrecta";
    }
  });

  // Función para encontrar el máximo común divisor
  function gcd(a, b) {
    let t;
    while (true) {
        t = a % b;
        if (t === 0) {
            return b;
        }
        a = b;
        b = t;
    }
}

// Función para cifrar con RSA

let arrayCharCifrado;
let arrayCharDescifrado;


// Función para encontrar el máximo común divisor
function gcd(a, b) {
    let t;
    while (b !== 0) {
        t = a % b;
        a = b;
        b = t;
    }
    return a;
}

function calcularD(e, phi, maxIteraciones = 1000) {
    let d = 1;
    let iteraciones = 0;
    
    while (iteraciones < maxIteraciones) {
        d++;
        if ((d * e) % phi === 1 && gcd(e, phi) === 1) {
            return d;
        }
        iteraciones++;
    }
    
    throw new Error("No se encontró un valor válido de 'd' después de " + maxIteraciones + " iteraciones.");
}


// Evento de cálculo al hacer clic en el botón "Calcular"
document.getElementById("calcularNyPhi").addEventListener("click", function() {
    const p = parseInt(document.getElementById("primoP").value);
    const q = parseInt(document.getElementById("primoQ").value);
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    const enterosPosibles = [];

    for (let i = 2; i < phi; i++) {
        if (gcd(i, phi) === 1) {
            enterosPosibles.push(i);
        }
    }

    const selectEnteros = document.getElementById("enterosPosibles");
    selectEnteros.innerHTML = ""; // Limpiar opciones anteriores
    for (const entero of enterosPosibles) {
        const option = document.createElement("option");
        option.value = entero;
        option.textContent = entero;
        selectEnteros.appendChild(option);
    }

    document.getElementById("valorN").textContent = n;
    document.getElementById("valorPhi").textContent = phi;
});

// Evento de cifrado al hacer clic en el botón "Calcular d"
document.getElementById("calcularD").addEventListener("click", function() {
    const e = parseInt(document.getElementById("enterosPosibles").value);
    const phi = parseInt(document.getElementById("valorPhi").textContent);
    const valorD = calcularD(e, phi);
    document.getElementById("valorD").textContent = valorD;
    
    const mensajeOriginal = document.getElementById("mensajeOriginalRSA").value;
    const n = parseInt(document.getElementById("valorN").textContent);

    if (!e || !n) {
        alert("Asegúrate de calcular primero N, Phi y elegir un entero posible.");
        return;
    }

    const mensajeToChar= mensajeOriginal.split('').map(char => char.charCodeAt(0));
    console.log(mensajeToChar)
    const mensajeArrayCharCifrado = mensajeToChar.map(charCode => (Math.pow(charCode, e) % n));
    arrayCharCifrado = mensajeArrayCharCifrado
   
    
    document.getElementById("textoCifradoRSA").textContent =  mensajeArrayCharCifrado;
});


// Evento de descifrado al hacer clic en el botón "Descifrar con RSA"
document.getElementById("descifrarBtnRSA").addEventListener("click", function() {
    const mensajeCifrado = arrayCharCifrado
    const d = parseInt(document.getElementById("valorD").textContent)
    const n = parseInt(document.getElementById("valorN").textContent)

    if (!mensajeCifrado || !d || !n) {
        alert("Asegúrate de ingresar el mensaje cifrado, calcular d y N correctamente.");
        return;
    }
    
    console.log("mensajeCifrado:", mensajeCifrado);
console.log("d:", d);
console.log("n:", n);
    const mensajeCifradoArray = arrayCharCifrado;
    console.log("mensajeCifradoArray:", mensajeCifradoArray);
    
    const mensajeDescifradoArray = mensajeCifradoArray.map(charCode => (Math.pow(charCode, d) % n) +5);
    console.log("mensajeDescifradoArray:", mensajeDescifradoArray);
    
    const mensajeDescifrado = String.fromCharCode(...mensajeDescifradoArray );

console.log("mensajeDescifrado:", mensajeDescifrado);

    document.getElementById("textoDescifradoRSA").textContent =  mensajeDescifrado;
});