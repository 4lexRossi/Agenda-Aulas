﻿using System;
using Api.Data.Collections;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EstudanteController : ControllerBase
    {
        Data.MongoDB _mongoDB;
        IMongoCollection<Estudante> _estudantesCollection;

        public EstudanteController(Data.MongoDB mongoDB)
        {
            _mongoDB = mongoDB;
            _estudantesCollection = _mongoDB.DB.GetCollection<Estudante>(typeof(Estudante).Name.ToLower());
        }

        [HttpPost]
        public ActionResult SalvarEstudante([FromBody] EstudanteDto dto)
        {
            var estudante = new Estudante(dto.Nome, dto.NomeResponsavel, dto.DataNascimento, dto.Sexo, dto.Email);

            _estudantesCollection.InsertOne(estudante);
            
            return StatusCode(201, "Estudante adicionado com sucesso");
        }

       

        [HttpGet("{email}")]
        public ActionResult ObterEstudante(string email)
        {
            var estudante = _estudantesCollection.Find(Builders<Estudante>.Filter
            .Where(_ => _.Email == email));            

            return Ok(estudante);
        }

        [HttpPut]
        public ActionResult AtualizarNome([FromBody] EstudanteDto dto)
        {
            _estudantesCollection.UpdateOne(Builders<Estudante>.Filter
            .Where(_ => _.Email == dto.Email),
            Builders<Estudante>.Update.Set("nome", dto.Nome));
            
             return Ok("Nome atualizado com sucesso");
        }

        [HttpDelete("{email}")]
        public ActionResult Delete(string email)
        {
            _estudantesCollection.DeleteOne(Builders<Estudante>.Filter
            .Where(_ => _.Email == email));            
            
             return Ok("Deletado com sucesso");
        }
    }
}
