import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './Global.css';
import './valor.css';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Api from '../Api';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import mascaraValor from '../Mascaras/valor';

function Valor() {
    //Javascript daqui
    const [mes, setMes] = useState(moment().format('MM'));
    const [ano, setAno] = useState(moment().format('yyyy'));
    const [valor, setValor] = useState('');
    const historico = useHistory();
    const [temErroNoMes, setTemErroNoMes] = useState(false);
    const [erroMes, setErroMes] = useState('');
    const [temErroNoAno, setTemErroNoAno] = useState(false);
    const [erroAno, setErroAno] = useState('');
    const [temErroNoValor, setTemErroNoValor] = useState(false);
    const [erroValor, setErroValor] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [dialogoAberto, setDialogo] = useState(false);
    const [salvo, setSalvo] = useState(false);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    async function salvar() {
        if (validar()) {
            //Isso aqui é um objeto
            var objetoValor = {
                val: parseFloat(valor),
                mes: parseInt(mes),
                ano: parseInt(ano)
            };

            const resposta = await Api.post('/Valor', objetoValor);

            if (resposta.status === 200) {
                setValor(0);
                setSalvo(true);
            }
            else {
                setMensagem(resposta.data);
                setDialogo(true);
            }
        }
    }

    function mudarValor(valor) {
        setValor(valor);
    }

    function irParaMenu() {
        historico.push("/");
    }

    function formataMes(valor) {
        return ("0" + valor).slice(-2);
    }

    function formataAno(valor) {
        return ("" + valor).slice(-4);
    }

    function fecharDialogo() {
        setDialogo(false);
        setMensagem([]);
    }

    function validar() {
        let validado = true;
        let mesinteiro = parseInt(mes);
        let valorinteiro = parseFloat(valor);
        let anointerio = parseInt(ano);

        if (mesinteiro <= 0 || mesinteiro > 12) {
            setTemErroNoMes(true);
            setErroMes("Deve ser informado um mês válido");
            validado = false;
        } else {
            setTemErroNoMes(false);
            setErroMes('');
        }

        if (ano === "" || anointerio <= 2000) {
            setTemErroNoAno(true);
            setErroAno("Campo Ano é obrigatório");
            validado = false;
        } else {
            setTemErroNoAno(false);
            setErroAno("");
        }

        if (valorinteiro <= 0) {
            setTemErroNoValor(true);
            setErroValor("Campo valor é obrigatório");
            validado = false;
        } else {
            setTemErroNoValor(false);
            setErroValor("");
        }
        return validado;
    }

    function aplicarMascara(evento){
        mascaraValor(evento);
        setValor(evento.target.value);
    }

    //Até aqui
    return (
        // HTML Daqui pra baixo
        <div className="recuo">
            <h1>Cadastro de valores</h1>
            <div className="entrelinhas" >
                <TextField
                    error={temErroNoMes}
                    helperText={erroMes}
                    label="Mês"
                    variant="outlined"
                    onChange={e => setMes(formataMes(e.target.value))}
                    value={mes}
                />
            </div>
            <div className="entrelinhas" >
                <TextField
                    error={temErroNoAno}
                    helperText={erroAno}
                    label="Ano"
                    variant="outlined"
                    onChange={e => setAno(formataAno(e.target.value))}
                    value={ano} />
            </div>
            <div className="entrelinhas">
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Valor</InputLabel>
                    <OutlinedInput
                        error={temErroNoValor}
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                        labelWidth={50}
                        onChange={e => mudarValor(e.target.value)}
                        onKeyUp={e => aplicarMascara(e)}
                        value={valor}
                        
                    />
                    <label className={temErroNoValor ? "erro" : "erroEscondido"}>{erroValor}</label>
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

            <Dialog
                open={dialogoAberto}
                onClose={fecharDialogo}>
                <DialogTitle id="alert-dialog-title">{"Não é possível gravar por um ou mais motivos abaixo:"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {mensagem.mensagem}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={fecharDialogo} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={salvo} autoHideDuration={6000} onClose={() => setSalvo(false)}>
                <Alert onClose={() => setSalvo(false)} severity="success">
                    Dados gravados com sucesso!
                </Alert>
            </Snackbar>

        </div>
    );
}
export default Valor;