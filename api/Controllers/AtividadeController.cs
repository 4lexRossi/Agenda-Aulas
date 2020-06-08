using System;
using api.Data.Collections;
using Api.Data.Collections;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AtividadeController : ControllerBase
    {
        Data.MongoDB _mongoDB;
        IMongoCollection<Atividade> _atividadesCollection;

        public AtividadeController(Data.MongoDB mongoDB)
        {
            _mongoDB = mongoDB;
            _atividadesCollection = _mongoDB.DB.GetCollection<Atividade>(typeof(Atividade).Name.ToLower());
        }

        [HttpGet]
        public ActionResult ObterAtividades()
        {
            var atividades = _atividadesCollection.Find(Builders<Atividade>.Filter.Empty).ToList();

            return Ok(atividades);
        }


        [HttpPost]
        public ActionResult SalvarAtividade([FromBody] AtividadeDto dto)
        {
            var atividade = new Atividade(
                dto.Nome,
                dto.Descricao
                );

            _atividadesCollection.InsertOne(atividade);
            
            return StatusCode(201, "Atividade adicionada com sucesso");
        }

       

        [HttpGet("{nome}")]
        public ActionResult ObterEstudante(string nome)
        {
            var estudante = _atividadesCollection.Find(Builders<Atividade>.Filter
            .Where(_ => _.Nome == nome)).FirstOrDefault();            

            return Ok(estudante);
        }

        [HttpPut]
        public ActionResult AtualizarAtividades([FromBody] AtividadeDto dto)
        {
            _atividadesCollection.UpdateOne(Builders<Atividade>.Filter
            .Where(_ => _.Nome == dto.Nome),
             Builders<Atividade>.Update.Set("nome", dto.Nome)
                                       .Set("descricao", dto.Descricao)
                                        );
            
             return Ok("Atividade atualizada com sucesso");
        }

       [HttpDelete("{nome}")]
        public ActionResult DeletarAtividade(string nome)
        {
            _atividadesCollection.DeleteOne(Builders<Atividade>.Filter
            .Where(_ => _.Nome == nome));            
            
             return Ok("Atividade deletada com sucesso");
        }
    }
}
