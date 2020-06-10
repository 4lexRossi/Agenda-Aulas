using System;
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
                dto.Senha
                );

            _professoresCollection.InsertOne(professor);
            
            return StatusCode(201, "Cadastro adicionado com sucesso");
        }

       

        [HttpGet("{email}")]
        public ActionResult ObterProfessor(string email)
        {
            var professor = _professoresCollection.Find(Builders<Professor>.Filter
            .Where(_ => _.Email == email)).FirstOrDefault();            

            return Ok(professor);
        }

        [HttpPut]
        public ActionResult AtualizarProfessor([FromBody] ProfessorDto dto)
        {
            _professoresCollection.UpdateOne(Builders<Professor>.Filter
            .Where(_ => _.Email == dto.Email),
             Builders<Professor>.Update.Set("nome", dto.Nome)
                                       .Set("SobreNome", dto.SobreNome)
                                       .Set("email", dto.Email)                                       
                                       .Set("senha", dto.Senha));
            
             return Ok("Cadastro atualizado com sucesso");
        }

        [HttpDelete("{email}")]
        public ActionResult DeletarProfessor(string email)
        {
            _professoresCollection.DeleteOne(Builders<Professor>.Filter
            .Where(_ => _.Email == email));            
            
             return Ok("Cadastro deletado com sucesso");
        }
    }
}
