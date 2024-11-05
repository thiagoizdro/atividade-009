"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function DisciplinasPage() {
  const [disciplinas, setDisciplinas] = useState([]);

  // Carrega as disciplinas quando a tela é acessada
  useEffect(() => {
    // Busca as disciplinas do localStorage, se não existir, inicia uma lista vazia
    const disciplinasLocalStorage = JSON.parse(localStorage.getItem("disciplinas")) || [];
    setDisciplinas(disciplinasLocalStorage);
    console.log(disciplinasLocalStorage);
  }, []);

  // Função para exclusão de uma disciplina
  function excluir(disciplina) {
    if (window.confirm(`Deseja realmente excluir a disciplina ${disciplina.nome}?`)) {
      const novaLista = disciplinas.filter((item) => item.id !== disciplina.id);
      localStorage.setItem("disciplinas", JSON.stringify(novaLista));
      setDisciplinas(novaLista);
      alert("Disciplina excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Disciplinas"}>
      <div className="text-end mb-2">
        <Button href="/disciplinas/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com as Disciplinas */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Curso</th>
            <th>Professor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.map((disciplina) => (
            <tr key={disciplina.id}>
              <td>{disciplina.nome}</td>
              <td>{disciplina.descricao}</td>
              <td>{disciplina.status}</td>
              <td>{disciplina.curso}</td>
              <td>{disciplina.professor}</td>
              <td className="text-center">
                {/* Botões das ações */}
                <Button className="me-2" href={`/disciplinas/form?id=${disciplina.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(disciplina)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
