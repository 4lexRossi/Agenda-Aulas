using System;


namespace Api.Data.Collections
{
    public class Estudante
    {
        public Estudante(string nome, string nomeResponsavel, DateTime dataNascimento, string sexo, string email)
        {
            this.Nome = nome;
            this.NomeResponsavel = nomeResponsavel;
            this.DataNascimento = dataNascimento;
            this.Sexo = sexo;           
            this.Email = email;
        } 
        
        public string Nome { get; set; }
        public string NomeResponsavel { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Sexo { get; set; }
        public string Email { get; set; }
    }
}