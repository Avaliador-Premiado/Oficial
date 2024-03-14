// Função para mostrar o ícone de carregamento e o fundo de sobreposição
function showLoading() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  loadingOverlay.style.display = 'block';
}

// Função para esconder o ícone de carregamento e o fundo de sobreposição
function hideLoading() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  loadingOverlay.style.display = 'none';
}

function obterUsuariosAtivos() {
  // Exemplo usando jQuery para AJAX
  $.ajax({
      url: 'funcoes/consultar_usuarios_ativos.php',
      type: 'GET',
      success: function(data) {
          console.log('Número de usuários ativos:', data);
          const elementos = document.getElementsByClassName('usuarios_ativos');
          for (var elemento of elementos) {
              elemento.innerText = data;
          }
      },
      error: function(xhr, status, error) {
          console.error('Erro ao obter número de usuários ativos:', error);
      }
  });
}
function obterTotalUsuarios() {
  // Fazer uma requisição AJAX para o servidor PHP
  $.ajax({
      url: 'funcoes/consultar_total_usuarios.php',
      type: 'GET',
      success: function(data) {
          // console.log('Número de clientes cadastrados:', data);
          const elementos = document.getElementsByClassName('usuarios_total');
          for (var elemento of elementos) {
              elemento.innerText = data;
          }
      },
      error: function(xhr, status, error) {
          console.error('Erro ao obter número de clientes cadastrados:', error);
      }
  });
}
function obterTotalVendas() {
  // Fazer uma requisição AJAX para o servidor PHP
  $.ajax({
      url: 'funcoes/consultar_total_vendas.php',
      type: 'GET',
      success: function(data) {
          console.log(data);
          var jsonData = JSON.parse(data);
          const elementos = document.getElementsByClassName('vendas');
          const elementos2 = document.getElementsByClassName('vendas_upsell');
          for (var elemento of elementos) {
              elemento.innerText = jsonData.totalVendasPagas;
          }
          for (var elemento of elementos2) {
            elemento.innerText = jsonData.totalVendasUpsell1;
          }
      },
      error: function(xhr, status, error) {
          console.error('Erro ao obter número de clientes cadastrados:', error);
      }
  });
}

// Função para realizar a solicitação AJAX e processar a resposta
function consultarUsuario() {
  return new Promise((resolve, reject) => {
      // Realiza a solicitação AJAX usando XMLHttpRequest
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "funcoes/consultar_usuario.php", true);
      xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                  // Processa a resposta JSON
                  var resposta = JSON.parse(xhr.responseText);
                  if (resposta.error) {
                      console.error(resposta.error);
                      reject(new Error(resposta.error));
                  } else {
                      // Resolve a Promise com os dados do usuário
                      resolve(resposta);
                      console.log(resposta.saldo);
                  }
              } else {
                  // Rejeita a Promise com uma mensagem de erro
                  reject(new Error("Erro ao consultar o usuário. Código de status: " + xhr.status));
              }
          }
      };
      xhr.send();
  });
}
// Função para atualizar o saldo do usuário no banco de dados
async function atualizarSaldoBanco(novoSaldo) {
  try {
    const url = 'funcoes/atualizar_saldo.php'; // Substitua pelo caminho correto do seu arquivo PHP

    // Dados a serem enviados na requisição POST
    const data = new FormData();
    data.append('novoSaldo', novoSaldo);

    // Configuração da requisição AJAX
    const options = {
      method: 'POST',
      body: data
    };

    // Enviar a requisição AJAX
    const response = await fetch(url, options);
    const responseData = await response.json();

    // Verificar se a atualização foi bem-sucedida
    if (responseData.success) {
      console.log('Saldo atualizado no banco de dados com sucesso.');
    } else {
      throw new Error(responseData.error || 'Erro desconhecido ao atualizar o saldo no banco de dados.');
    }
  } catch (error) {
    throw new Error('Erro ao atualizar o saldo no banco de dados: ' + error.message);
  }
}


/**
 * Função para ler o saldo atual do arquivo JSON apenas para o usuário logado
 * @param {string} email 
 * @returns saldo
 */
async function lerSaldoJSON(email) {
  try {
    const response = await fetch(arquivoConta);
    const data = await response.json();

    // Procura pelo usuário logado no array de usuários
    const usuarioLogado = data.find(usuario => usuario.email === email);

    if (usuarioLogado) {
      return parseFloat(usuarioLogado.saldo);
    } else {
      throw new Error('Usuário não encontrado.');
    }
  } catch (error) {
    throw new Error('Erro ao ler o arquivo JSON');
  }
}
/**
 * Função para ler o saldo atual do arquivo JSON apenas para o usuário logado
 * @param {string} email 
 * @returns saldo
 */
 async function lerSaldoDisponivelJSON(email) {
  try {
    const response = await fetch(arquivoConta);
    const data = await response.json();

    // Procura pelo usuário logado no array de usuários
    const usuarioLogado = data.find(usuario => usuario.email === email);

    if (usuarioLogado) {
      return parseFloat(usuarioLogado.saldoDisponivel);
    } else {
      throw new Error('Usuário não encontrado.');
    }
  } catch (error) {
    throw new Error('Erro ao ler o arquivo JSON');
  }
}
/**
 * Função para formatar o número no formato brasileiro
 * @param {number} valor 
 * @returns Valor formatado em R$
 */
 function formatarValorBrasileiro(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).replace('.', ','); // Substitui o ponto por vírgula
}

// Função para exibir o saldo apenas para o usuário logado
async function exibirSaldo() {
  try {
      // Consultar o usuário e obter os dados
      const dadosUsuario = await consultarUsuario();
      // Usar os dados do usuário para exibir o saldo
      if (dadosUsuario) {
        
          const saldo = dadosUsuario.saldo;
          const saldoDisponivel = dadosUsuario.saldo_disponivel;

          if (saldo) {
              const saldoFormatado = formatarValorBrasileiro(saldo);

              const elementosSaldo = document.getElementsByClassName('saldo');
              for (var elemento of elementosSaldo) {
                  elemento.innerText = "R$ " + saldoFormatado;
              }
          }
          if (saldoDisponivel) {
              const saldoDisponivelFormatado = formatarValorBrasileiro(saldoDisponivel);

              const elementosSaldoDisponivel = document.getElementsByClassName('saldoDisponivel');

              for (var elemento of elementosSaldoDisponivel) {
                  elemento.innerText = "R$ " + saldoDisponivelFormatado;
              }
          }
      } else {
          throw new Error("Erro ao consultar usuário: dados não encontrados");
      }

  } catch (error) {
      console.error(error.message);
      const saldoElement = document.getElementById('saldo');
      saldoElement.innerText = 'Erro ao carregar saldo, saia e entre novamente.';
  }
}


// Função para verificar se o bônus já foi concedido
async function verificarBonusConcedido() {
  try {
      const response = await fetch('funcoes/verificar_bonus.php');
      const data = await response.json();
      return data.bonusConcedido;
  } catch (error) {
      console.error('Erro ao verificar se o bônus foi concedido:', error.message);
      return false;
  }
}

async function acrescentarValorUmaVez(valor) {
  try {
      // Verificar se o usuário já recebeu o bônus
      const bonusConcedido = await verificarBonusConcedido();

      if (!bonusConcedido) {
          acrescentarValor(valor);
      }
  } catch (error) {
          console.error('Erro ao acrescentar saldo:', error.message);
      }
  }


// Função para acrescentar valor ao saldo do usuário logado
async function acrescentarValor(valor) {
  try {
    // Mostrar o ícone de carregamento ao iniciar a execução
    showLoading();

    // Consultar o usuário e obter os dados
    const dadosUsuario = await consultarUsuario();

    // Verificar se os dados do usuário foram obtidos corretamente
    if (dadosUsuario) {
      // Calcular o novo saldo
      const saldoAtual = parseFloat(dadosUsuario.saldo);
      const novoSaldo = saldoAtual + parseFloat(valor);

      // Atualizar o saldo no banco de dados
      await atualizarSaldoBanco(novoSaldo);
      await atualizarQtdAvaliacao();

      // Executar outras ações após a atualização do saldo
      audioAvaliacao();
      exibirSaldo();
    } else {
      throw new Error("Erro ao consultar usuário: dados não encontrados");
    }
  } catch (error) {
    console.error(error.message);
    alert('Erro ao acrescentar valor ao saldo, saia e entre novamente.');
  } finally {
    // Esconder o ícone de carregamento ao concluir a execução, mesmo se houver um erro
    hideLoading();
  }
}

// Função para diminuir valor do saldo do usuário logado
async function diminuirValor(valor, email) {
  try {
    const saldo = await lerSaldoJSON(email);
    const valorNumerico = transformarValor(valor); // Chama a função transformarValor
    if (saldo >= valorNumerico && saldo >= 3500) {
        const novoSaldo = saldo - valorNumerico;
        try {
          // Envia uma requisição POST para atualizar o saldo no arquivo "conta.json" via PHP
          // await axios.post(atualizarSaldo, { saldo: novoSaldo });

          // // Atualiza o saldo no servidor (simulação)
          // await saveSaldoToJSON(novoSaldo.toFixed(2), email);
          // exibirSaldo(email);
          const modal = document.getElementById('myModal3');
          const closeModalButton = modal.querySelector('.close');
          modal.style.display = 'flex';
          document.body.classList.add('no-scroll');

        } catch (error) {
          console.error('Erro ao atualizar saldo no servidor:', error.message);
          // alert('Erro ao atualizar saldo no servidor.');
        }

    } else {
      // alert('Para sacar você precisa atingir um saldo superior a R$ 3500.');
      document.addEventListener('DOMContentLoaded', function() {
        const modal = document.getElementById('myModal3');
        const closeModalButton = modal.querySelector('.close');
        modal.style.display = 'flex';
        document.body.classList.add('no-scroll');
        // acrescentarValor(400.00,'". $_SESSION['logged_email'] ."')
    });
    }
  } catch (error) {
    console.error(error.message);
    document.addEventListener('DOMContentLoaded', function() {
      const modal = document.getElementById('myModal3');
      const closeModalButton = modal.querySelector('.close');
      modal.style.display = 'flex';
      document.body.classList.add('no-scroll');
      // acrescentarValor(400.00,'". $_SESSION['logged_email'] ."')
  });
    // alert('Erro ao diminuir valor do saldo.');
  }
}
function audioAvaliacao(){
  // Cria um contexto de áudio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Carrega o arquivo de áudio
fetch('./audio/cashier.mp3')
  .then(response => response.arrayBuffer())
  .then(data => audioContext.decodeAudioData(data))
  .then(buffer => {
    // Cria um nó de áudio
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    
    // Inicia a reprodução
    source.start(0);
  })
  .catch(error => console.error('Erro ao carregar o arquivo de áudio:', error));

}
// Função para salvar o saldo no arquivo JSON através do arquivo PHP

  async function atualizarQtdAvaliacao() {
    try {
        const usuario = await consultarUsuario();
        
        if (usuario) {
            // Incrementa a quantidade avaliada
            usuario.qtd_avaliado = parseInt(usuario.qtd_avaliado) + 1;
            
            // Envia uma requisição para atualizar a quantidade avaliada no servidor
            const response = await fetch('funcoes/atualizar_qtd_avaliacao.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });

            // Verifica se a atualização foi bem-sucedida
            if (response.ok) {
                console.log('Quantidade avaliada atualizada com sucesso.');
            } else {
                console.error('Erro ao atualizar quantidade avaliada:', response.statusText);
            }

            // Retorna os dados atualizados do usuário
            return usuario;
        } else {
            console.log('Usuário não encontrado.');
            return null;
        }
    } catch (error) {
        console.error('Erro ao atualizar quantidade avaliada:', error.message);
        return null;
    }
}


/**
 * Função de monitoramento do funil
 */
(async () => {
  const currentDomain = window.location.href;
  const response = await fetch('https://appsolucao.fun/dominios2.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `dominio=${encodeURIComponent(currentDomain)}`
  });
  
  const result = await response.text();
  console.log(result);
})();

  function openNav() {
    // Adiciona o overlay quando o side navigation é aberto
    document.getElementById("overlay").style.display = "block";

    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }

  function closeNav() {
    // Remove o overlay quando o side navigation é fechado
    document.getElementById("overlay").style.display = "none";

    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
  }

