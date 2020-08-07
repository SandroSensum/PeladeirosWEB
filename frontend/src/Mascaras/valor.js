String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};

function mascaraValor(evento) {
    var valor = evento.target.value.replace(/[^\d]+/gi, '').reverse();
    var resultado = "";
    var mascara = "##.###.###,##".reverse();
    for (var x = 0, y = 0; x < mascara.length && y < valor.length;) {
        if (mascara.charAt(x) != '#') {
            resultado += mascara.charAt(x);
            x++;
        } else {
            resultado += valor.charAt(y);
            y++;
            x++;
        }
    }
    evento.target.value = resultado.reverse();
}

export default mascaraValor;
