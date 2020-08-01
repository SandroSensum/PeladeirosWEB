import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './Global.css';
import Button from '@material-ui/core/Button';
import Api from '../Api';
import { useHistory } from 'react-router-dom';

function Cidade() {
    const [nome, setNome] = useState('');
    const [uf, setUf] = useState('SC');
    const historico = useHistory();

    async function salvar() {
        var objetoCidade =
        {
            CidadeNome: nome,
            uf: uf
        };

        const resposta = await Api.post('/Cidade', objetoCidade);
        if (resposta.status === 200)
            alert(resposta.data);
        else
            alert('Dados gravaodos com sucesso');
    }

    function irParaMenu() {
        historico.push("/");
    }

    return (
        <div className="recuo">
            <h1> Cadastro de Cidades</h1>
            <div className="manterEmLinha">
                <div className="enderecoTamanho">
                    <div className="entrelinhas">
                        <TextField
                            label="Cidade"
                            variant="outlined"
                            onChange={e => setNome(e.target.value)}
                            value={nome}
                        />
                    </div>
                </div>
                <div className="ufTamanho">
                    <div className="entrelinhas">
                        <TextField
                            label="UF"
                            variant="outlined"
                            onChange={e => setUf(e.target.value)}
                            value={uf}
                        />
                    </div>
                </div>
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
export default Cidade;