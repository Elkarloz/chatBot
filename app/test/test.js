const fecha = new Date();
const año = fecha.getFullYear();
const mes = fecha.getMonth() + 1; // Meses en JavaScript se cuentan desde 0 (enero) hasta 11 (diciembre)
const dia = fecha.getDate();
const dayUser = user.CliDate;
const [añoFecha1, mesFecha1, diaFecha1] = today.split('-').map(Number);
const [añoFecha2, mesFecha2, diaFecha2] = dayUser.split('-').map(Number);
console.log([añoFecha1, mesFecha1, diaFecha1]);