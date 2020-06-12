using api.Data.Collections;
using System;
using System.Collections.Generic;

namespace Api.Models
{
    public class EstudanteDto
    {
        public string Id { get; set; }
        public string Nome { get; set; }
        public string NomeResponsavel { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Sexo { get; set; }
        public string Email { get; set; }
        public string Turma { get; set; }
        public IEnumerable<AtividadeDto> Atividades { get; set; }
    }
    public class AtividadeDto
    {
        public string id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
    }
    public class ProfessorDto
    {
        public string Id { get; set; }
        public string Nome { get; set; }
        public string SobreNome { get; set; }        
        public string Email { get; set; }
        public string Senha { get; set; }        
    }
}