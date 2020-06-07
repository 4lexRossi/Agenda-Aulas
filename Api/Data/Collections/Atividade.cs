﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Data.Collections
{
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