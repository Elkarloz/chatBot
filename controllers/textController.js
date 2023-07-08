const fs = require('fs');
const path = require('path');

const rutaArchivo = path.join(__dirname, 'text_bot.json');

const leerArchivoJSON = () => {
  try {
    const contenido = fs.readFileSync(rutaArchivo, 'utf8');
    return JSON.parse(contenido);
  } catch (error) {
    //console.error('Error al leer el archivo JSON:', error);
    return {};
  }
};

const guardarArchivoJSON = (datos) => {
  try {
    const contenido = JSON.stringify(datos, null, 2);
    fs.writeFileSync(rutaArchivo, contenido, 'utf8');
    //console.log('Archivo JSON guardado correctamente.');
  } catch (error) {
    //console.error('Error al guardar el archivo JSON:', error);
  }
};

const obtenerTextoFuncion = (claveFuncion) => {
  const datosFunciones = leerArchivoJSON();
  return datosFunciones[claveFuncion] || '';
};

const establecerTextoFuncion = (claveFuncion, texto) => {
  const datosFunciones = leerArchivoJSON();
  datosFunciones[claveFuncion] = texto;
  guardarArchivoJSON(datosFunciones);
};


const textController = {};

textController.resetText = () => {
  let key = 'getDelivery';
  let text = "Hola {Rnombre}, Tenemos un pedido para la dirección {direccion}, el pedido deberá ser recogido en nuestra sucursal, por favor no tardar.";
  establecerTextoFuncion(key, text);
  key = 'getMessageFinish';
  text = "Tu pedido ha sido atendido, en unos minutos estará disfrutando de tu entrega, hemos enviado nuestro repartidor a tu dirección, agradecemos tu compra en Zumitos.";
  establecerTextoFuncion(key, text);
  key = 'getMessageHostFinish';
  text = "Tu pedido ha sido atendido, en unos minutos estará disfrutando de tu entrega, hemos enviado nuestro repartidor a tu dirección, agradecemos tu compra en Zumitos.";
  establecerTextoFuncion(key, text);
  key = 'getMessageClientZero';
  text = "{nombre}, es un gusto ayudarte, selecciona la opción que necesitas:\n1.Pedir mi desayuno.\n2.Conocer el menú.\n3.Terminar.";
  establecerTextoFuncion(key, text);
  key = 'getMessageWait';
  text = "Espera un momento a que uno de nuestros empleados tome tu pedido 👩🏻‍🍳.";
  establecerTextoFuncion(key, text);
  key = 'getMessageMenu';
  text = "Observa nuestro menu en este URL 🧑🏻‍🍳";
  establecerTextoFuncion(key, text);
  key = 'getMessageErrorZeroPartOne';
  text = "Opción ingresada incorrecta. Por favor ingresa un valor entre 1 - 2, digita el número en letras (uno, dos, tres) o bien, ingresa la frase que deseas ejecutar.\n\n";
  establecerTextoFuncion(key, text);
  key = 'getMessageErrorZeroPartTwo';
  text = "{nombre}, es un gusto ayudarte, selecciona la opción que necesitas:\n1.Pedir mi desayuno.\n2.Conocer el menú.\n3.Terminar.";
  establecerTextoFuncion(key, text);
  key = 'getMessageStart';
  text = "Hola 👋🏻\n\n Soy el asistente virtual Zumitos. Qué gusto saludarte.";
  establecerTextoFuncion(key, text);
  key = 'getMessagePolitics';
  text = "Antes de continuar, es importante que nos autorices el tratamiento de tus datos personales.\n1. Acepto\n2. No acepto";
  establecerTextoFuncion(key, text);
  key = 'getMessageQuestionName';
  text = "¿Podrías indicarme tu nombre completo?";
  establecerTextoFuncion(key, text);
  key = 'getMessageDeniedPermissions';
  text = "No podemos continuar el chat, necesitamos tu autorización para poder registrarlo en nuestra base de datos.";
  establecerTextoFuncion(key, text);
  key = 'getMessageErrorTwo';
  text = "Opción ingresada incorrecta. Por favor ingresa un valor entre 1 - 2, digita el número en letras (uno, dos, tres) o bien, ingresa la frase que deseas ejecutar.\nAntes de continuar, es importante que nos autorices el tratamiento de tus datos personales.\n1. Acepto\n2. No acepto";
  establecerTextoFuncion(key, text);
  key = 'getMessageStartTwo';
  text = "{nombre}, es un gusto ayudarte, selecciona la opción que necesitas:\n1.Pedir mi desayuno.\n2.Conocer el menú.\n3.Terminar.";
  establecerTextoFuncion(key, text);
}

textController.getDelivery = (dataDelivery, dataClient) => {
  let text = obtenerTextoFuncion("getDelivery");
  text = text.replace("{nombre}", dataClient.CliName);
  text = text.replace("{direccion}", dataClient.CliAddress);
  text = text.replace("{Rnombre}", dataDelivery.DelName);
  return text;
};

textController.setEditText = (data) => {
  try {
    establecerTextoFuncion(data.key, data.text.replace(/\$n/g, "\n"));
    return true;
  } catch (error) {
    return false;
  }
}

textController.getText = () => {
  let json = leerArchivoJSON();
  for (let key in json) {
    if (json.hasOwnProperty(key)) {
      // Reemplazar "\n" por "$n" en cada valor
      json[key] = json[key].replace(/\n/g, "$n");
    }
  }
  return json;
}

textController.getMessageFinish = () => {
  return obtenerTextoFuncion('getMessageFinish');
};

textController.getMessageHostFinish = () => {
  return obtenerTextoFuncion('getMessageHostFinish');
};

textController.getMessageClientZero = (CliName) => {
  let text = obtenerTextoFuncion('getMessageClientZero');
  return text.replace("{nombre}", CliName);
};

textController.getMessageWait = () => {
  return obtenerTextoFuncion('getMessageWait');
};

textController.getMessageMenu = () => {
  return obtenerTextoFuncion('getMessageMenu');
};

textController.getMessageErrorZeroPartOne = () => {
  return obtenerTextoFuncion('getMessageErrorZeroPartOne');
};

textController.getMessageErrorZeroPartTwo = (CliName) => {
  let text = obtenerTextoFuncion('getMessageErrorZeroPartTwo');
  return text.replace("{nombre}", CliName);
};

textController.getMessageStart = () => {
  return obtenerTextoFuncion('getMessageStart');
};

textController.getMessagePolitics = () => {
  return obtenerTextoFuncion('getMessagePolitics');
};

textController.getMessageQuestionName = () => {
  return obtenerTextoFuncion('getMessageQuestionName');
};

textController.getMessageDeniedPermissions = () => {
  return obtenerTextoFuncion('getMessageDeniedPermissions');
};

textController.getMessageErrorTwo = () => {
  return obtenerTextoFuncion('getMessageErrorTwo');
};

textController.getMessageStartTwo = (CliName) => {
  let text = obtenerTextoFuncion('getMessageStartTwo');
  return text.replace("{nombre}", CliName);
};
module.exports = textController;

//textController.resetText();