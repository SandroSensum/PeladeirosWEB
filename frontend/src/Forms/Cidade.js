import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import './Global.css';
import Button from '@material-ui/core/Button';
import Api from '../Api';

function Cidade (){
    const [nome, setNome] = useState ('');
    const [uf,setUf] = useState ('SC');

    async function salvar()
    {
        var objetoCidade = 
        {
            CidadeNome: nome,
            uf: uf
        };

    const resposta = await Api.post('/Cidade', objetoCidade);
    if(resposta.status === 200)
        alert(resposta.data);
    else
        alert('Dados gravaodos com sucesso');
    }  

    return(
        <div className = "recuo">
            <h1> Cadastro de Cidades</h1>
            <div className = "entrelinhas">
                <TextField
                    label = "Cidade"
                    variant = "outlined"
                    onChange = {e => setNome(e.target.value)}
                    value = {nome}
                />
            </div>
            <div className = "entrelinhas">
                <TextField
                    label = "UF"
                    variant = "outlined"
                    onChange = {e => setUf(e.target.value)}
                    value = {uf}
                />                
            </div>
            <div className="botao">
                <div className="margem">
                    <Button variant="contained" color="primary" onClick={() => salvar()}>Salvar</Button>
                </div>
                <div className="margem">
                    <Button variant="contained" color="secondary">Cancelar</Button>
                </div>
            </div>
        </div>
    );
}
    export default Cidade;