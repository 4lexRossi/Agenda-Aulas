using api.Data.Collections;
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
            string turma)
        {
            this.Nome = nome;
            this.NomeResponsavel = nomeResponsavel;
            this.DataNascimento = dataNascimento;
            this.Sexo = sexo;           
            this.Email = email;            
            this.Turma = turma;
        } 
        
        public string Nome { get; set; }
        public string NomeResponsavel { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Turma { get; set; }
        public string Sexo { get; set; }
        public string Email { get; set; }
    }
     public class Atividade
    {
        public Atividade(
            string nome,
            string descricao)
        {        
            this.Nome = nome;
            this.Descricao = descricao;
        } 
        public string Nome { get; set; }
        public string Descricao { get; set; }
    }
}