import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './Global.css';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Api from '../Api';
import { useHistory } from 'react-router-dom';

function Valor() 
{
    //Javascript daqui
    const [mes, setMes] = useState(1);
    const [ano, setAno] = useState(2020);
    const [valor, setValor] = useState(0);
    const historico = useHistory();

    async function salvar() 
    {
        //Isso aqui é um objeto
        var objetoValor = {
            val: parseFloat(valor),
            mes: parseInt(mes),
            ano: parseInt(ano)
        };

        const resposta = await Api.post('/Valor', objetoValor);
        
        if(resposta.status === 200)
            alert(resposta.data);
        else        
            alert('Dados inválidos');
    }

    function mudarValor(valor){
        setValor(valor);
    }

    function irParaMenu() {
        historico.push("/");
    }

    //Até aqui
    return (
        // HTML Daqui pra baixo
        <div className="recuo">
            <h1>Cadastro de valores</h1>
            <div className="entrelinhas" >
                <TextField 
                    label="Mês" 
                    variant="outlined"
                    onChange={e => setMes(e.target.value)}
                    value={mes}
                     />
            </div>
            <div className="entrelinhas" >
                <TextField 
                    label="Ano" 
                    variant="outlined"
                    onChange={e => setAno(e.target.value)}
                    value={ano} />
            </div>
            <div className="entrelinhas">
                {/* <TextField label="Valor" variant="outlined"/> */}
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Valor</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        // value={values.amount}
                        // onChange={() => handleChange()}
                        startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                        labelWidth={50}
                        // onChange={e => setValor(e.target.value)}
                        onChange={e => mudarValor(e.target.value)}
                        value={valor}
                    />
                </FormControl>
            </div>
            <div className="botao">
                <div className="margem">
                    <Button variant="contained" color="primary" onClick={() => salvar()}>Salvar</Button>
                </div>
                <div className="margem">
                    <Button variant="contained" color="secondary">Cancelar</Button>
                </div>
            </div>
            <div className="recuo">
                <div className="btRetornarTamanho">
                    <div className="margem">
                        <Button variant="contained" fullWidth onClick={irParaMenu}>Retornar ao Menu</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Valor;