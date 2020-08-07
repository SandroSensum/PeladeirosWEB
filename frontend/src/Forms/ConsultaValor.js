import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Api from '../Api';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import mascaraValor from '../Mascaras/valor';
/*import { useHistory } from 'react-router-dom';*/

function ConsultaValor() {

    const [valores, setValores] = useState([]);
    const history = useHistory();
    const [ano, setAno] = useState(0);
    const historico = useHistory();

    async function consultarValores() {
        let registros = null;

        if (ano > 0)
            registros = await Api.get(`/valor/${ano}`);
        else
            registros = await Api.get('/valor');

        console.log(registros);
        setValores(registros.data);
    }

    function irParaIncluir() {
        history.push("/valorIncluir");
    }

    function irParaMenu() {
        historico.push("/");
    }

    return (
        <div>
            <div className="espaçomenu">
                <div>
                    <TextField
                        label="Ano"
                        variant="outlined"
                        fullWidth
                        onChange={e => setAno(e.target.value)}
                        value={ano}
                    />

                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ano</TableCell>
                                    <TableCell>Mês</TableCell>
                                    <TableCell align="right">Valor</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {valores.map((valor) => (
                                    <TableRow key={valor.id}>
                                        <TableCell >{valor.ano}</TableCell>
                                        <TableCell >{valor.mes}</TableCell>
                                        <TableCell align="right">{mascaraValor(valor.val)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="espaçomenu">
                    <div className="botao">
                        <div className="margem">
                            <Button variant="contained" color="secondary" onClick={consultarValores}>Consultar</Button>
                        </div>
                        <div className="margem">
                            <Button variant="contained" color="primary" onClick={irParaIncluir}>Incluir</Button>
                        </div>
                        <div className="margem">
                            <Button variant="contained" fullWidth onClick={irParaMenu}>Retornar ao Menu</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConsultaValor;