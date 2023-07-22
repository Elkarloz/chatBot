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
    text = "Tu pedido ha sido atendido, en unos minutos estará disfrutando de tu entrega, hemos enviado nuestro repartidor a tu dirección, agradecemos tu compra en Zumitos.";
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

textController.getText = (item, user) => {
    let element = getTextFunction(item);
    element = element.replace("{direccion}", user.CliAddress != null ? user.CliAddress : 'Desconocido');
    element = element.replace("{nombre}", user.CliName != null ? user.CliName : 'Desconocido');
    element = element.replace("{link}", user.CliLocation != null ? user.CliLocation : 'Desconocido');
    element = element.replace("{telefono}", user.CliPhone != null ? user.CliPhone : 'Desconocido');
    element = element.replace("{observaciones}", user.CliObservation != null ? user.CliObservation : 'Desconocido');
    return element;
};

module.exports = textController;

//textController.resetText();