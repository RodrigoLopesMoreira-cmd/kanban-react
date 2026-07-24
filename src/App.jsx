import { useState, useEffect } from "react"
import Coluna from "./components/Coluna"
import Formulario from "./components/Formulario"
import "./App.css"
import Modal from "./components/Modal"
function App() {
  const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas') || '[]')
  const [novaTarefa, setNovaTarefa] = useState('')
  const [tarefas, setTarefas] = useState(tarefasSalvas)
  const [busca, setBusca] = useState('')
  const [prioridade, setPrioridade] = useState('baixa')
  const [tarefaArrastada, setTarefaArrastada] = useState(null)
  const [colunaAtiva, setColunaAtiva] = useState(null)
  const [tarefaArrastando, setTarefaArrastando] = useState(null)
  const [direcaoRotacao, setDirecaoRotacao] = useState(0)
  const [modalAberto, setModalAberto] = useState(false)
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null)
  useEffect(() => {
    localStorage.setItem(
      'tarefas',
      JSON.stringify(tarefas)
    )

  }, [tarefas])

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (busca === '') {
      return true
    }
    return tarefa.titulo.toLocaleLowerCase().includes(busca.toLocaleLowerCase())
  }
  )

  const tarefasOrdenadas = ordernarPorPrioridade(tarefasFiltradas)

  const pendentes = tarefasOrdenadas.filter(
    (tarefa) => tarefa.status === 'pendente'
  )

  const andamento = tarefasOrdenadas.filter(
    (tarefa) => tarefa.status === 'andamento'
  )

  const concluido = tarefasOrdenadas.filter(
    (tarefa) => tarefa.status === 'concluido'
  )

  const progresso = tarefas.length === 0
    ? 0
    : ((concluido.length / tarefas.length) * 100).toFixed(0)



  function adicionarTarefa() {

    if (novaTarefa === '') return

    const nova = {
      id: Date.now(),
      titulo: novaTarefa,
      status: 'pendente',
      prioridade: prioridade
    }

    setTarefas([...tarefas, nova])
    setNovaTarefa('')
  }

  function mudarStatus(id) {

    const novasTarefas = tarefas.map((tarefa) => {

      if (tarefa.id === id) {
        if (tarefa.status === 'pendente') {
          return { ...tarefa, status: 'andamento' }
        }

        if (tarefa.status === 'andamento') {
          return { ...tarefa, status: 'concluido' }
        }

        if (tarefa.status === 'concluido') {
          return { ...tarefa, status: 'pendente' }
        }
      }
      return tarefa
    })
    setTarefas(novasTarefas)
  }

  function mudarPrioridade(id) {

    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        if (tarefa.prioridade === 'baixa') {
          return { ...tarefa, prioridade: 'media' }
        }

        if (tarefa.prioridade === 'media') {
          return { ...tarefa, prioridade: 'alta' }
        }

        if (tarefa.prioridade === 'alta') {
          return { ...tarefa, prioridade: 'baixa' }
        }
      }

      return tarefa
    })
    setTarefas(novasTarefas)
  }

  function editarTarefa(id) {
    const tarefa = tarefas.find(
      (item) => item.id === id)

    if (!tarefa) return

    setTarefaSelecionada(tarefa)
    setModalAberto(true)
  }

  function fecharModal() {
    setModalAberto(false)
    setTarefaSelecionada(null)
  }

  function salvarEdicao(id, titulo) {
    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id)
        return {
          ...tarefa,
          titulo: titulo
        }
      return tarefa
    })

    setTarefas(novasTarefas)
    setModalAberto(false)
  }


  function deletarTarefa(id) {
    const resposta = confirm(
      "Você deseja realmente excluir essa tarefa?"
    )

    if (!resposta) return

    const excluir = tarefas.filter(
      (tarefa) => tarefa.id !== id)
    setTarefas(excluir)

  }

  function escolherPrioridade(e) {
    const prioridadeE = e.target.id
    if (prioridadeE === 'btnA') {
      setPrioridade('alta')
    }

    if (prioridadeE === 'btnM') {
      setPrioridade('media')
    }

    if (prioridadeE === 'btnB') {
      setPrioridade('baixa')
    }

  }

  function ordernarPorPrioridade(lista) {
    const peso = {
      alta: 3,
      media: 2,
      baixa: 1
    }
    return [...lista].sort((a, b) => {
      return peso[b.prioridade] - peso[a.prioridade]
    })
  }

  function iniciarArraste(id) {
    setTarefaArrastada(id)
    setTarefaArrastando(id)
  }

  function moverPorArraste(novoStatus) {

    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === tarefaArrastada) {
        return {
          ...tarefa,
          status: novoStatus
        }
      }
      return tarefa
    })
    setTarefas(novasTarefas)
    setTarefaArrastada(null)
    setTarefaArrastando(null)

  }

  const ordemColunas = {
    pendente: 1,
    andamento: 2,
    concluido: 3
  }

  function calcularDirecao(statusDestino) {

    const tarefa = tarefas.find(
      (item) => item.id === tarefaArrastada
    )

    if (!tarefa) return

    const origem = ordemColunas[tarefa.status]
    const destino = ordemColunas[statusDestino]

    if (origem < destino) {
      setDirecaoRotacao(8)
    }
    else if (origem > destino) {
      setDirecaoRotacao(-8)
    }
    else {
      setDirecaoRotacao(0)
    }
  }


  return (
    <div>
      <h1>Kanban React</h1>
      <div className="progresso-container">
        <p>progresso:{progresso}%</p>
        <p>Total de Tarefas: {tarefas.length}</p>
        <div className="barra">
          <div className="barra-preenchida"
            style={{
              width: `${progresso}%`
            }}
          ></div>
        </div>
      </div>

      <Formulario
        novaTarefa={novaTarefa}
        setNovaTarefa={setNovaTarefa}
        adicionarTarefa={adicionarTarefa}
        setBusca={setBusca}
        busca={busca}
        prioridade={prioridade}
        setPrioridade={setPrioridade}
        escolherPrioridade={escolherPrioridade}

      />

      {modalAberto && (
        <Modal
          tarefa={tarefaSelecionada}
          salvarEdicao={salvarEdicao}
          fecharModal={fecharModal}
        />)}

      <div className="kanban">
        <Coluna
          titulo='Pendentes'
          tarefas={pendentes}
          mudarStatus={mudarStatus}
          deletarTarefa={deletarTarefa}
          editarTarefa={editarTarefa}
          mudarPrioridade={mudarPrioridade}
          iniciarArraste={iniciarArraste}
          moverPorArraste={moverPorArraste}
          statusColuna={'pendente'}
          colunaAtiva={colunaAtiva}
          setColunaAtiva={setColunaAtiva}
          statusPorColuna='pendente'
          tarefaArrastando={tarefaArrastando}
          calcularDirecao={calcularDirecao}
          direcaoRotacao={direcaoRotacao}
        />

        <Coluna
          titulo='Andamento'
          tarefas={andamento}
          mudarStatus={mudarStatus}
          deletarTarefa={deletarTarefa}
          editarTarefa={editarTarefa}
          mudarPrioridade={mudarPrioridade}
          iniciarArraste={iniciarArraste}
          moverPorArraste={moverPorArraste}
          statusColuna={'andamento'}
          colunaAtiva={colunaAtiva}
          setColunaAtiva={setColunaAtiva}
          statusPorColuna='andamento'
          tarefaArrastando={tarefaArrastando}
          calcularDirecao={calcularDirecao}
          direcaoRotacao={direcaoRotacao}
        />

        <Coluna
          titulo='Concluido'
          tarefas={concluido}
          mudarStatus={mudarStatus}
          deletarTarefa={deletarTarefa}
          editarTarefa={editarTarefa}
          mudarPrioridade={mudarPrioridade}
          iniciarArraste={iniciarArraste}
          moverPorArraste={moverPorArraste}
          statusColuna={'concluido'}
          colunaAtiva={colunaAtiva}
          setColunaAtiva={setColunaAtiva}
          statusPorColuna='concluido'
          tarefaArrastando={tarefaArrastando}
          calcularDirecao={calcularDirecao}
          direcaoRotacao={direcaoRotacao}
        />
      </div>
    </div>

  )
}
export default App

