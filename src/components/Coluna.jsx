import Tarefa from "./Tarefa"

function Coluna ({titulo, tarefas, mudarStatus, deletarTarefa, editarTarefa,mudarPrioridade, iniciarArraste,
 moverPorArraste, statusColuna, colunaAtiva, setColunaAtiva, statusPorColuna,tarefaArrastando, calcularDirecao, direcaoRotacao}) {

  return(
    <div className={`coluna ${
      colunaAtiva === statusPorColuna
      ? 'ativa'
      : ''
    }`}
    onDragOver={(e) =>{ e.preventDefault()

      setColunaAtiva(statusColuna)
      calcularDirecao(statusColuna)
    }}
    onDrop={() =>{ 
      moverPorArraste(statusColuna)
      setColunaAtiva(null)
    }}


    >
      <h2>{`${titulo} (${tarefas.length})`}</h2>
      {tarefas.map((item) =>(
       
       <Tarefa
        key={item.id}
        titulo={item.titulo}
        status={item.status}
        id ={item.id}
        prioridade={item.prioridade}
        mudarStatus={mudarStatus}
        deletarTarefa={deletarTarefa}
        editarTarefa={editarTarefa}
        mudarPrioridade={mudarPrioridade}
        iniciarArraste={iniciarArraste}
        colunaAtiva={colunaAtiva}
        setColunaAtiva={setColunaAtiva}
        statusPorColuna={statusPorColuna}
         tarefaArrastando={tarefaArrastando}
         direcaoRotacao={direcaoRotacao}
       />
      ))}
    </div>
  )
}
export default Coluna