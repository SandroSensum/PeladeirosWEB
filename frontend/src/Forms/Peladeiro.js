import React, { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Api from '../Api';
import './Global.css';
import './Peladeiro.css';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { cpfMask } from '../Mascaras/cpf';
import { telefoneMask } from '../Mascaras/telefone';
import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment';


function Peladeiro() {

    const [cidades, setCidades] = useState([]);
    const [uf, setUf] = useState('');
    const [nome, setNome] = useState('')
    const [cidadeSelecionada, setCidadeSelecionada] = useState(null);
    const [cpf, setCPF] = useState('')
    const [fone, setFone] = useState('')
    const [celular, setCelular] = useState('')
    const [dtcadastro, setDtCadastro] = useState(new Date().toLocaleDateString())
    const [dtinativado, setDtInativado] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [email, setEmail] = useState('')
    const [inativo, setInativo] = useState(false);
    const [textoInativo, setTextoInativo] = useState('Inativar');
    const [dtNascimento, setDtNascimento] = useState('')

    const [temErroNoCpf, setTemErroNoCpf] = useState(false);
    const [erroCpf, setErroCpf] = useState('');

    const [temErroNoNome, setTemErroNoNome] = useState(false);
    const [erroNome, setErroNome] = useState('');
    const [mensagem, setMensagem] = useState([]);
    const [dialogoAberto, setDialogo] = useState(false);
    const [salvo, setSalvo] = useState(false);

    const historico = useHistory();
    const [idade, setidade] = useState('');

    async function obterCidades() {
        let resposta = await Api.get('/Cidade');
        setCidades(resposta.data);
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    function validar() {
        let validado = true;

        if (cpf === "") {
            setTemErroNoCpf(true);
            setErroCpf("Deve ser informado um CPF válido");
            validado = false;
        } else {
            validado = valida_cpf();
        }

        if (nome === "") {
            setTemErroNoNome(true);
            setErroNome("Campo nome é obrigatório");
            validado = false;
        }

        return validado;
    }

    function defineMensagemCpf(temErro, mensagem) {
        console.log(temErro, mensagem);
        setTemErroNoCpf(temErro);
        setErroCpf(mensagem);
    }

    function valida_cpf() {
        let cpf_para_validar = cpf;
        cpf_para_validar = cpf_para_validar.replace(/\D/g, '');
        console.log(cpf_para_validar);

        var numeros, digitos, soma, i, resultado, digitos_iguais;
        digitos_iguais = 1;
        if (cpf_para_validar.length < 11) {
            console.log(1);
            defineMensagemCpf(true, "CPF Inválido")
            return false;
        }
        for (i = 0; i < cpf_para_validar.length - 1; i++) {
            if (cpf_para_validar.charAt(i) !== cpf_para_validar.charAt(i + 1)) {
                digitos_iguais = 0;
                break;
            }
        }
        if (!digitos_iguais) {
            numeros = cpf_para_validar.substring(0, 9);
            digitos = cpf_para_validar.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0)) {
                console.log(2);
                defineMensagemCpf(true, "CPF Inválido")
                return false;
            }
            numeros = cpf_para_validar.substring(0, 10);
            soma = 0;
            for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1)) {
                console.log(3);
                defineMensagemCpf(true, "CPF Inválido")
                return false;
            }
            defineMensagemCpf(false, "");
            return true;
        }
        else {
            console.log(4);
            setTemErroNoCpf(true);
            setErroCpf("CPF Inválido");
            return false;
        }
    }

    async function salvar() {

        if (validar()) {
            var objetoPeladeiro =
            {
                Nome: nome,
                CPF: cpf,
                Fone: fone,
                Celular: celular,
                DatCadastro: null,
                DatInativado: null,
                Endereço: endereco,
                Numero: numero,
                Email: email,
                CidadeId: cidadeSelecionada.id,
                DatNascimento: dtNascimento.toISOString()
            };

            const resposta = await Api.post('/Peladeiro', objetoPeladeiro);

            if (resposta.status === 201) {

                setSalvo(true);
                limpartela();
            }

            else {

                if (resposta.status == 400) {

                    let mensagemTemp = "";

                    setMensagem(resposta.data);
                    setDialogo(true);
                }
            }
        }
    }

    function preencherCombo() {

        if (cidades.length === 0)
            obterCidades();

        return cidades.map((cidade, index) => {
            return (
                <option key={index} value={index}>{cidade.cidadeNome}</option>
            );
        });
    }

    function pegarCidade(event) {
        //Setar a UF
        let indiceArray = event.target.value;
        let cidade = cidades[indiceArray];

        setUf(cidade.uf);
        setCidadeSelecionada(cidade);
    }

    function configurarInativo() {
        if (inativo) {
            setTextoInativo("Inativo");
            setDtInativado(new Date().toLocaleDateString());
        }

        else {
            setTextoInativo("Inativar");
            setDtInativado("");
        }
    }

    useEffect(() => {
        configurarInativo();
    });

    function irParaMenu() {
        historico.push("/");
    }

    function fecharDialogo() {
        setDialogo(false);
        setMensagem([]);
    }

    function limpartela() {

        setUf('');
        setNome('')
        setCidadeSelecionada(null)
        setCPF('')
        setFone('')
        setCelular('')
        setDtCadastro(new Date().toLocaleDateString())
        setDtInativado('')
        setEndereco('')
        setNumero('')
        setEmail('')
        setInativo(false)
        setTextoInativo('Inativar');
        setDtNascimento(null)
        setCidades([]);
        preencherCombo();

    }

    function calcularidade(data) {
        let texto = data.target.value;

        if (texto.length > 10)
            return;

        if (data.keyCode != 8 && data.keyCode != 8) {

            if (texto.length == 2 || texto.length == 5)
                texto += "/";

            setDtNascimento(texto);
            var hoje = moment();

            if (texto.length == 10)
                setidade(hoje.diff(moment(texto, "DD-MM-YYYY"), 'years'));
        }
        else
            setidade('');
    }

    return (
        <div className="margem">
            <div className="precuo">
                <div className="entrelinhas">
                    <div className="manterEmLinha">
                        <TextField
                            error={temErroNoCpf}
                            helperText={erroCpf}
                            label="CPF"
                            variant="outlined"
                            onChange={e => setCPF(cpfMask(e.target.value))}
                            value={cpf}
                            onBlur={() => valida_cpf()}
                        />
                        <div className="espaço">
                            <div className="dataTamanho">
                                <TextField
                                    error={temErroNoCpf}
                                    helperText={erroCpf}
                                    label="Data de nascimento"
                                    variant="outlined"
                                    margin="normal"
                                    onChange={e => setDtNascimento(e.target.value)}
                                    onKeyUp={e => calcularidade(e)}
                                    value={dtNascimento}
                                />
                            </div>
                        </div>
                        <div className="manterEmLinha">
                            <div className="ufTamanho">
                                <TextField
                                    disabled
                                    fullWidth
                                    label="Idade"
                                    variant="outlined"
                                    value={idade}
                                />
                            </div>
                        </div>

                        <div className="checkbox">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={inativo}
                                        onChange={e => setInativo(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label={textoInativo}
                            />

                        </div>
                    </div>

                </div>

                <div className="entrelinhas">
                    <div className="manterEmLinha">
                        <div className="nomeTamanho">
                            <TextField
                                error={temErroNoNome}
                                helperText={erroNome}
                                label="Nome"
                                variant="outlined"
                                fullWidth
                                onChange={e => setNome(e.target.value)}
                                value={nome}
                            />
                        </div>
                    </div>
                </div>
                <div className="entrelinhas">
                    <div className="manterEmLinha">
                        <div className="enderecoTamanho">
                            <TextField
                                label="Endereco"
                                variant="outlined"
                                fullWidth
                                onChange={e => setEndereco(e.target.value)}
                                value={endereco}
                            />
                        </div>
                        <div className="ufTamanho">
                            <TextField
                                label="Numero"
                                variant="outlined"
                                onChange={e => setNumero(e.target.value)}
                                value={numero}
                            />
                        </div>
                    </div>
                </div>
                <div className="entrelinhas">
                    <div className="manterEmLinha">
                        <div className="enderecoTamanho">
                            <FormControl variant="outlined" fullWidth>

                                <InputLabel>Cidade</InputLabel>
                                <Select
                                    native
                                    id="comboCidade"
                                    label="Cidade"
                                    onChange={pegarCidade}>
                                    <option aria-label="None" value="" />
                                    {preencherCombo()}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="ufTamanho">
                            <TextField
                                disabled
                                fullWidth
                                label="UF"
                                // defaultValue=" "
                                variant="outlined"
                                value={uf}
                            />
                        </div>
                    </div >
                </div>
                <div className="entrelinhas">
                    <div className="nomeTamanho">
                        <TextField
                            label="E-mail"
                            variant="outlined"
                            fullWidth
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                </div>
                <div className="entrelinhas">
                    <div className="manterEmLinha">
                        <TextField
                            label="Telefone"
                            variant="outlined"
                            onChange={e => setFone(telefoneMask(e.target.value))}
                            value={fone}
                        />
                        <div className="espaço">
                            <TextField
                                label="Celular"
                                variant="outlined"
                                onChange={e => setCelular(telefoneMask(e.target.value))}
                                value={celular}
                            />
                        </div>
                    </div>
                </div>
                <div className="entrelinhas">
                    <div className="manterEmLinha">
                        <TextField
                            label="Data Cadastro"
                            variant="outlined"
                            disabled
                            onChange={e => setDtCadastro(e.target.value)}
                            value={dtcadastro}
                        />
                        <div className="espaço">
                            <TextField
                                label="Data Inativado"
                                variant="outlined"
                                disabled
                                onChange={e => setDtInativado(e.target.value)}
                                value={dtinativado}
                            />
                        </div>
                    </div>
                </div>
                <div className="recuo">
                    <div className="botao">
                        <div className="margem">
                            <Button variant="contained" color="primary" onClick={() => salvar()}>Salvar</Button>
                        </div>
                        <div className="margem">
                            <Button variant="contained" color="secondary">Cancelar</Button>
                        </div >
                    </div>
                </div>
                <div className="recuo">
                    <div className="btRetornarTamanho">
                        <div className="margem">
                            <Button variant="contained" fullWidth onClick={irParaMenu}>Retornar ao Menu</Button>
                        </div>
                    </div>
                </div>
            </div >

            <Dialog
                open={dialogoAberto}
                onClose={fecharDialogo}>
                <DialogTitle id="alert-dialog-title">{"Não é possível gravar por um ou mais motivos abaixo:"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {mensagem.map((m, indice) => {
                            return <React.Fragment key={indice}>{m.mensagem}<br></br></React.Fragment>
                        })}
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

export default Peladeiro;