using api.Data.Collections;
using System;
using System.Collections.Generic;

namespace Api.Models
{
    public class EstudanteDto
    {
        public string Nome { get; set; }
        public string NomeResponsavel { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Sexo { get; set; }
        public string Email { get; set; }
        public string Turma { get; set; }        
    }
    public class AtividadeDto
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }
    }
}