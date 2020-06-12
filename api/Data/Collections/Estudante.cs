using api.Data.Collections;
using Api.Models;
using System;
using System.Collections.Generic;

namespace Api.Data.Collections
{
    public class Estudante
    {
        public Estudante(
            string nome,
            string nomeResponsavel,
            DateTime dataNascimento,
            string sexo,
            string email,
            string turma,
            string id,
            IEnumerable<AtividadeDto> atividades
            )
        {
            this.Id = id;
            this.Nome = nome;
            this.NomeResponsavel = nomeResponsavel;
            this.DataNascimento = dataNascimento;
            this.Sexo = sexo;           
            this.Email = email;            
            this.Turma = turma;
            this.Atividades = atividades;
        }

        public string Id { get; set; }
        public string Nome { get; set; }
        public string NomeResponsavel { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Turma { get; set; }
        public string Sexo { get; set; }
        public string Email { get; set; }
        public IEnumerable<AtividadeDto> Atividades { get; set; }

    }
    
}