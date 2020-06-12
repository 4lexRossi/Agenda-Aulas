using System;
using api.Data;
using Api.Data.Collections;
using Api.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Api.Controllers
{
    [EnableCors("AllowAllOrigins")]
    [ApiController]
    [Route("[controller]")]
    public class ProfessorController : ControllerBase
    {
        Data.MongoDB _mongoDB;
        IMongoCollection<Professor> _professoresCollection;

        public ProfessorController(Data.MongoDB mongoDB)
        {
            _mongoDB = mongoDB;
            _professoresCollection = _mongoDB.DB.GetCollection<Professor>(typeof(Professor).Name.ToLower());
        }

        [HttpGet]
        public ActionResult ObterProfessores()
        {
            var professores = _professoresCollection.Find(Builders<Professor>.Filter.Empty).ToList();

            return Ok(professores);
        }


        [HttpPost]
        public ActionResult SalvarProfessor([FromBody] ProfessorDto dto)
        {
            var professor = new Professor(
                dto.Nome,
                dto.SobreNome,                
                dto.Email,               
                dto.Senha,
                dto.Id
                );

            _professoresCollection.InsertOne(professor);
            
            return StatusCode(201, "Cadastro adicionado com sucesso");
        }



        [HttpGet("{id}")]
        public ActionResult ObterProfessor(string id)
        {
            var professor = _professoresCollection.Find(Builders<Professor>.Filter
            .Where(_ => _.Id == id)).FirstOrDefault();

            return Ok(professor);
        }

        [HttpPut]
        public ActionResult AtualizarProfessor([FromBody] ProfessorDto dto)
        {
            _professoresCollection.UpdateOne(Builders<Professor>.Filter
            .Where(_ => _.Id == dto.Id),
             Builders<Professor>.Update.Set("nome", dto.Nome)
                                       .Set("SobreNome", dto.SobreNome)
                                       .Set("email", dto.Email)                                       
                                       .Set("senha", dto.Senha));
            
             return Ok("Cadastro atualizado com sucesso");
        }

        [HttpDelete("{id}")]
        public ActionResult DeletarProfessor(string id)
        {
            _professoresCollection.DeleteOne(Builders<Professor>.Filter
            .Where(_ => _.Id == id));            
            
             return Ok("Cadastro deletado com sucesso");
        }
        
      
    }
}
