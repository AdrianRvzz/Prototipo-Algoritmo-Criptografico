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