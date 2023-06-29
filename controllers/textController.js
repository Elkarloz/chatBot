const textController = {};

textController.getDelivery = (dataDelivery, dataClient) => {
  return (
    "Hola " +
    dataDelivery.DelName +
    ", Tenemos un pedido para la dirección " +
    dataClient.CliAddress +
    ", el pedido deberá ser recogido en nuestra sucursal, por favor no tardar."
  );
};

textController.getMessageFinish = () => {
  return "Tu pedido ha sido atendido, en unos minutos estará disfrutando de tu entrega, hemos enviado nuestro repartidor a tu dirección, agradecemos tu compra en Zumitos.";
};

textController.getMessageHostFinish = () => {
  return "Tu pedido ha sido atendido, en unos minutos estará disfrutando de tu entrega, hemos enviado nuestro repartidor a tu dirección, agradecemos tu compra en Zumitos.";
};

textController.getMessageClientZero = () => {
  return ", es un gusto ayudarte, selecciona la opción que necesitas:\n1.Pedir mi desayuno.\n2.Conocer el menú.\n3.Terminar.";
};

textController.getMessageWait = () => {
  return "Espera un momento a que uno de nuestros empleados tome tu pedido 👩🏻‍🍳.";
};

textController.getMessageMenu = () => {
  return "Observa nuestro menu en este URL 🧑🏻‍🍳";
};

textController.getMessageErrorZeroPartOne = () => {
  return "Opción ingresada incorrecta. Por favor ingresa un valor entre 1 - 2, digita el número en letras (uno, dos, tres) o bien, ingresa la frase que deseas ejecutar.\n\n";
};

textController.getMessageErrorZeroPartTwo = () => {
  return ", es un gusto ayudarte, selecciona la opción que necesitas:\n1.Pedir mi desayuno.\n2.Conocer el menú.\n3.Terminar.";
};

textController.getMessageStart = () => {
  return "Hola 👋🏻\n\n Soy el asistente virtual Zumitos. Qué gusto saludarte.";
};

textController.getMessagePolitics = () => {
  return "Antes de continuar, es importante que nos autorices el tratamiento de tus datos personales.\n1. Acepto\n2. No acepto";
};

textController.getMessageQuestionName = () => {
  return "¿Podrías indicarme tu nombre completo?";
};

textController.getMessageDeniedPermissions = () => {
  return "No podemos continuar el chat, necesitamos tu autorización para poder registrarlo en nuestra base de datos.";
};

textController.getMessageErrorTwo = () => {
  return "Opción ingresada incorrecta. Por favor ingresa un valor entre 1 - 2, digita el número en letras (uno, dos, tres) o bien, ingresa la frase que deseas ejecutar.\nAntes de continuar, es importante que nos autorices el tratamiento de tus datos personales.\n1. Acepto\n2. No acepto";
};

textController.getMessageStartTwo = () => {
  return ", es un gusto ayudarte, selecciona la opción que necesitas:\n1.Pedir mi desayuno.\n2.Conocer el menú.\n3.Terminar.";
};
module.exports = textController;
