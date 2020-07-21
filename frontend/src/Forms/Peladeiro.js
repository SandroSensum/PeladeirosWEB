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

    async function obterCidades() {
        let resposta = await Api.get('/Cidade');
        setCidades(resposta.data);
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

        var numeros, digitos, soma, i, resultado, digitos_iguais;
        digitos_iguais = 1;
        if (cpf_para_validar.length < 11) {
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
            if (resultado !== digitos.charAt(0)) {
                defineMensagemCpf(true, "CPF Inválido")
                return false;
            }
            numeros = cpf_para_validar.substring(0, 10);
            soma = 0;
            for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado !== digitos.charAt(1)) {
                defineMensagemCpf(true, "CPF Inválido")
                return false;
            }
            defineMensagemCpf(false, "");
            return true;
        }
        else {
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
                DatCadastro: "2020-07-16",
                DatInativado: null,
                Endereço: endereco,
                Numero: numero,
                Email: email,
                CidadeId: cidadeSelecionada.id,
                // Cidade: cidadeSelecionada,
                DatNascimento: "1978-01-28"
            };

            console.log(objetoPeladeiro);
            const resposta = await Api.post('/Peladeiro', objetoPeladeiro);

            console.log(resposta);

            if (resposta.status === 201)
                alert(resposta.data);
            else
                alert('Dados inválidos');
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
        console.log(cidade);
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

    return (
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
                                label="Data Nascimento"
                                variant="outlined"
                                fullWidth
                                onChange={e => setDtNascimento(e.target.value)}
                                value={dtNascimento}
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
                    <div className="nomeTamanho">
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
                    <div className="nomeTamanho">
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
                    </div>
                </div>
            </div>
        </div >
    );

}

export default Peladeiro;