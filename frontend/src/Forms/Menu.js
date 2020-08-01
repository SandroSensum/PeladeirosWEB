import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './Global.css';

function Menu() {

    const historico = useHistory();

    function irParaPeladeiro() {
        historico.push("/peladeiro");
    }

    function irParaValor() {
        historico.push("/valor");
    }

    function irParaMensalidade() {
        historico.push("/Mensalidade");
    }

    function irParaCidade() {
        historico.push("/Cidade");
    }

    return (
        <>
            <h1> Menu </h1>
            <div className="espaçomenu">
                <div className="entrelinhas">
                    <div className="btMenufTamanho">
                        <div className="botao">
                            <Button variant="contained" fullWidth color="primary" onClick={irParaPeladeiro}>Peladeiro</Button>
                        </div>
                    </div>
                </div>
                <div className="entrelinhas">
                    <div className="btMenufTamanho">
                        <div className="botao">
                            <Button variant="contained" fullWidth color="primary" onClick={irParaValor}>Valor</Button>
                        </div >
                    </div>
                </div>
                <div className="entrelinhas">
                    <div className="btMenufTamanho">
                        <div className="botao">
                            <Button variant="contained" fullWidth color="primary" onClick={irParaMensalidade}>Mensalidade</Button>
                        </div >
                    </div>
                </div>
                <div className="entrelinhas">
                    <div className="btMenufTamanho">
                        <div className="botao">
                            <Button variant="contained" fullWidth color="primary" onClick={irParaCidade}>Cidades</Button>
                        </div >
                    </div>
                </div>
            </div>
        </>
    )
}
export default Menu;