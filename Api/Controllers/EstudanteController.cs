using System;
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
            var estudante = new Estudante(dto.DataNascimento, dto.Sexo, dto.Latitude, dto.Longitude);

            _estudantesCollection.InsertOne(estudante);
            
            return StatusCode(201, "Estudante adicionado com sucesso");
        }

        [HttpGet]
        public ActionResult ObterEstudantes()
        {
            var estudantes = _estudantesCollection.Find(Builders<Estudante>.Filter.Empty).ToList();
            
            return Ok(estudantes);
        }

        [HttpPut]
        public ActionResult AtualizarEstudante([FromBody] EstudanteDto dto)
        {
            _estudantesCollection.UpdateOne(Builders<Estudante>.Filter
            .Where(_ => _.DataNascimento == dto.DataNascimento),
            Builders<Estudante>.Update.Set("sexo", dto.Sexo));
            
             return Ok("Atualizado com sucesso");
        }

        [HttpDelete("{dataNasc}")]
        public ActionResult Delete(DateTime dataNasc)
        {
            _estudantesCollection.DeleteOne(Builders<Estudante>.Filter
            .Where(_ => _.DataNascimento == dataNasc));
            
            
             return Ok("Deletado com sucesso");
        }
    }
}
