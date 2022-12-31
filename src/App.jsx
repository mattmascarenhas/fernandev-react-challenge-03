/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({
    nome: "",
    email: "",
    estadoCivil: "",
    genero: "",
  });

  const [validate, setValidate] = useState({
    nome: false,
    email: false,
    estadoCivil: false,
    genero: false,
  });

  useEffect(() => {
    handleChange();
  }, [data]);
  //função para fazer as validações
  function handleChange() {
    //verificação para saber se o nome contem dois nomes ou mais
    if (/^[a-zA-Z]+ [a-zA-Z]+$/.test(data.nome)) {
      setValidate((prevState) => ({
        ...prevState,
        nome: true,
      }));
    } else if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(data.nome)) {
      setValidate((prevState) => ({
        ...prevState,
        nome: false,
      }));
    }

    //verificação para saber se é email
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        data.email
      )
    ) {
      setValidate((prevState) => ({
        ...prevState,
        email: true,
      }));
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        data.email
      )
    ) {
      setValidate((prevState) => ({
        ...prevState,
        email: false,
      }));
    }
    //verificação para saber se o estado civil está preenchido

    if (data.estadoCivil != "") {
      setValidate((prevState) => ({
        ...prevState,
        estadoCivil: true,
      }));
    } else if (data.estadoCivil == "") {
      setValidate((prevState) => ({
        ...prevState,
        estadoCivil: false,
      }));
    }
    //verificação para saber se o genero está preenchido
    if (data.genero != "") {
      setValidate((prevState) => ({
        ...prevState,
        genero: true,
      }));
    } else if (data.genero == "") {
      setValidate((prevState) => ({
        ...prevState,
        genero: false,
      }));
    }
  }
  //função para definir o tamanho da barra de status
  function widthSize() {
    var widthBar = 0;

    if (validate.nome == true) {
      widthBar += 25;
    }
    if (validate.email == true) {
      widthBar += 25;
    }
    if (validate.estadoCivil == true) {
      widthBar += 25;
    }
    if (validate.genero == true) {
      widthBar += 25;
    }

    return widthBar;
  }
  function sendForm() {
    alert("Formulário enviado com sucesso!");
    location.reload(false);
  }
  return (
    <div className="App">
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        <div className="bar-container">
          <div className="bar" style={{ width: `${widthSize()}%` }}></div>
        </div>
        <div className="form-group">
          <label htmlFor="nome">Nome Completo</label>
          <input
            value={data.nome}
            onChange={(e) => {
              setData((prevState) => ({
                ...prevState,
                nome: e.target.value,
              }));
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            value={data.email}
            onChange={(e) => {
              setData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }));
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="estadoCivil">Estado Civil</label>
          <select
            value={data.estadoCivil}
            onChange={(e) => {
              setData((prevState) => ({
                ...prevState,
                estadoCivil: e.target.value,
              }));
            }}
          >
            <option value="">- selecione...</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="genero">Gênero</label>
          <div className="radios-container">
            <span>
              <input
                type="radio"
                name="genero"
                value={"Masculino"}
                onChange={(e) => {
                  setData((prevState) => ({
                    ...prevState,
                    genero: e.target.value,
                  }));
                }}
              />
              Masculino
            </span>
            <span>
              <input
                type="radio"
                name="genero"
                value={"Feminino"}
                onChange={(e) => {
                  setData((prevState) => ({
                    ...prevState,
                    genero: e.target.value,
                  }));
                }}
              />
              Feminino
            </span>
          </div>
        </div>
        <button disabled={widthSize() !== 100} onClick={sendForm}>
          Enviar Formulário
        </button>
      </main>
    </div>
  );
}

export default App;
