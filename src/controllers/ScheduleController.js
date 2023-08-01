const fs = require('fs');
const path = require('path');

const routeFile = path.join(__dirname, '../config/db/schedule_bot.json');

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

const scheduleController = {};

scheduleController.resetText = () => {
    let key = 'Lunes';
    let text = "06:00 - 18:00";
    setTextFunction(key, text);
    key = 'Martes';
    text = "06:00 - 18:00";
    setTextFunction(key, text);
    key = 'Miercoles';
    text = "06:00 - 18:00";
    setTextFunction(key, text);
    key = 'Jueves';
    text = "06:00 - 18:00";
    setTextFunction(key, text);
    key = 'Viernes';
    text = "06:00 - 18:00";
    setTextFunction(key, text);
    key = 'Sabado';
    text = "00:00 - 00:00";
    setTextFunction(key, text);
    key = 'Domingo';
    text = "00:00 - 00:00";
    setTextFunction(key, text);
}

scheduleController.setEditText = (data) => {
    try {
        setTextFunction(data.key, data.text.replace(/\$n/g, "\n"));
        return true;
    } catch (error) {
        return false;
    }
}

scheduleController.getTextAll = () => {
    let json = readFileJson();
    for (let key in json) {
        if (json.hasOwnProperty(key)) {
            // Reemplazar "\n" por "$n" en cada valor
            json[key] = json[key].replace(/\n/g, "$n");
        }
    }
    return json;
}

scheduleController.getText = (item) => {
    let element = getTextFunction(item);
    return element;
};

module.exports = scheduleController;

//scheduleController.resetText();