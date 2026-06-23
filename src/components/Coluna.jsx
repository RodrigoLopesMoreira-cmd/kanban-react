import Tarefa from "./Tarefa"

function Coluna ({titulo, tarefas, mudarStatus, deletarTarefa, editarTarefa,mudarPrioridade}) {

  return(
    <div className="coluna">
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
       />
      ))}
    </div>
  )
}
export default Coluna