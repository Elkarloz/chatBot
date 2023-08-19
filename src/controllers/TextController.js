const fs = require('fs');
const path = require('path');

const routeFile = path.join(__dirname, '../config/db/text_bot.json');

const readFileJson = () => {
    try {
        const content = fs.readFileSync(routeFile, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        return {};
    }
};

const saveFileJson = (data) => {
    try {
        const content = JSON.stringify(data, null, 2);
        fs.writeFileSync(routeFile, content, 'utf8');
    } catch (error) {
        return {};
    }
};

const getTextFunction = (keyFunction) => {
    const dataFunction = readFileJson();
    return dataFunction[keyFunction] || '';
};

const setTextFunction = (keyFunction, texto) => {
    const dataFunction = readFileJson();
    dataFunction[keyFunction] = texto;
    saveFileJson(dataFunction);
};

const textController = {};

textController.resetText = () => {
    let key = 'welcome';
    let text = "Hola {nombre}, ¿Gustas Ordenar?";
    setTextFunction(key, text);
    key = 'unknown';
    text = "Hola, ¿Antes de ordenar podemos saber tu nombre y dirección para agilizar el proceso?";
    setTextFunction(key, text);
    key = 'sale';
    text = "Tu pedido ya va en camino, nuestro repartidor muy pronto se comunicará contigo.";
    setTextFunction(key, text);
    key = 'sale_pick';
    text = "Tu pedido está siendo preparado, para que puedas recogerlo.\nNota:{notas}";
    setTextFunction(key, text);
    key = 'sale_delivery';
    text = "🧑‍🍳Nuevo pedido para ser entregado.\n\nCliente #{id}\nNombre: {nombre}\nNumero: {telefono}\nDirección: {direccion}\nUbicacion: {link}\nNota del pedido: {notas}\nPedido realizado: {fecha}";
    setTextFunction(key, text);
    key = 'sale_delivery_2';
    text = "🧑‍🍳Nuevo pedido para ser entregado.\n\nCliente #{id}\nNombre: {nombre}\nNumero: {telefono}\nDirección: {direccion}\nNota del pedido: {notas}\nPedido realizado: {fecha}";
    setTextFunction(key, text);
    key = 'resume_day';
    text = "El sistema ha validado todos los chats no convertidos, en total del dia ha sido de {notas}.";
    setTextFunction(key, text);

}

textController.setEditText = (data) => {
    try {
        setTextFunction(data.key, data.text.replace(/\$n/g, "\n"));
        return true;
    } catch (error) {
        return false;
    }
}

textController.getTextAll = () => {
    let json = readFileJson();
    for (let key in json) {
        if (json.hasOwnProperty(key)) {
            // Reemplazar "\n" por "$n" en cada valor
            json[key] = json[key].replace(/\n/g, "$n");
        }
    }
    return json;
}

textController.getText = (item, user, add, address) => {
    let element = getTextFunction(item);
    if (user != null) {
        if (address == null) {
            element = element.replace("{direccion}", user.CliAddress != null ? user.CliAddress : 'Desconocido');

        } else {
            element = element.replace("{direccion}", address);
        }
        element = element.replace("{nombre}", user.CliName != null ? user.CliName : 'Desconocido');
        element = element.replace("{link}", user.CliLocation != null ? user.CliLocation : 'Desconocido');
        element = element.replace("{telefono}", user.CliPhone != null ? "+" + user.CliPhone.split('@')[0] : 'Desconocido');
        element = element.replace("{observaciones}", user.CliObservation != null ? user.CliObservation : 'Desconocido');
        element = element.replace("{zona}", user.CliZone != null ? user.CliZone : 'Desconocido');
        element = element.replace("{id}", user.CliId != null ? user.CliId : 'Desconocido');
    } else {
        element = element.replace("{direccion}", "");
        element = element.replace("{id}", "");
        element = element.replace("{nombre}", "");
        element = element.replace("{link}", "");
        element = element.replace("{telefono}", "");
        element = element.replace("{observaciones}", "");
        element = element.replace("{zona}", "");
    }

    if (add != null) {
        element = element.replace("{notas}", (add == "" ? "Sin notas." : add));
    } else {
        element = element.replace("{notas}", "");
    }
    element = element.replace("{fecha}", formatFecha());

    return element;
};

function formatFecha() {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const
        mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const horas = String(fecha.getHours() % 12 || 12).padStart(2, '0');
    const
        minutos = String(fecha.getMinutes()).padStart(2, '0');
    const ampm = fecha.getHours() >= 12 ? 'pm' : 'am';

    return `${año}-${mes}-${dia} ${horas}:${minutos} ${ampm}`;
}

module.exports = textController;

//textController.resetText();