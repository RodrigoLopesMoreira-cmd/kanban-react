import { useState } from "react"

function Modal({tarefa, salvarEdicao, fecharModal}){
console.log({tarefa})
  const [titulo, setTitulo] = useState(tarefa.titulo)

  return(
    <div className="modal">

      <input type="text"
      value={titulo}
      onChange={(e) => setTitulo(e.target.value)}
      />

      <button onClick={() => salvarEdicao(tarefa.id, titulo)}>
        Salvar
      </button>

      <button onClick={() => fecharModal()}>Cancelar</button>

    </div>
  )
}

export default Modal