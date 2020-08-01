import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Peladeiro from './Forms/Peladeiro';
import Valor from './Forms/Valor';
import Mensalidade from './Forms/Mensalidade';
import Cidade from './Forms/Cidade';
import Menu from './Forms/Menu';
import ConsultaValor from './Forms/ConsultaValor';

function Rotas() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Menu} />
                <Route path="/peladeiro" component={Peladeiro} />
                <Route path="/valor" component={ConsultaValor} />
                <Route path="/valorIncluir" exact component={Valor} />
                <Route path="/mensalidade" component={Mensalidade} />
                <Route path="/cidade" component={Cidade} />
            </Switch>
        </BrowserRouter>
    );
}

export default Rotas;