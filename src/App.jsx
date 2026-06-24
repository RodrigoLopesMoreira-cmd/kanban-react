import { useState, useEffect } from "react"
import Coluna from "./components/Coluna"
import Formulario from "./components/Formulario"
import "./App.css"

function App() {
  const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas') || '[]')
  const [novaTarefa, setNovaTarefa] = useState('')
  const [tarefas, setTarefas] = useState(tarefasSalvas)
  const [busca, setBusca] = useState('')
  const [prioridade, setPrioridade] = useState('baixa')
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

    const novoTitulo = prompt('Digite o novo Titulo: ')
    if (novoTitulo === null) return


    const editar = tarefas.map((tarefa) => {

      if (tarefa.id === id) {

        return {
          ...tarefa,
          titulo: novoTitulo

        }
      }
      return tarefa
    })
    setTarefas(editar)
  }

  function deletarTarefa(id) {

    const resposta = confirm("Você deseja realmente excluir essa tarefa?")

    if (!resposta) return

    const excluir = tarefas.filter((tarefa) =>
      tarefa.id !== id
    )
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

  return (
    <div>
      <h1>Kanban React</h1>

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
      <div className="kanban">
        <Coluna
          titulo='Pendentes'
          tarefas={pendentes}
          mudarStatus={mudarStatus}
          deletarTarefa={deletarTarefa}
          editarTarefa={editarTarefa}
          mudarPrioridade={mudarPrioridade}
        />

        <Coluna
          titulo='Andamento'
          tarefas={andamento}
          mudarStatus={mudarStatus}
          deletarTarefa={deletarTarefa}
          editarTarefa={editarTarefa}
          mudarPrioridade={mudarPrioridade}
        />


        <Coluna
          titulo='Concluido'
          tarefas={concluido}
          mudarStatus={mudarStatus}
          deletarTarefa={deletarTarefa}
          editarTarefa={editarTarefa}
          mudarPrioridade={mudarPrioridade}
        />

      </div>
    </div>

  )
}
export default App

