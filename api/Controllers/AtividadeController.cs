using System;
using api.Data.Collections;
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
                dto.Descricao,
                dto.id);

            _atividadesCollection.InsertOne(atividade);
            
            return StatusCode(201, "Atividade adicionada com sucesso");
        }

       

        [HttpGet("{id}")]
        public ActionResult ObterEstudante(string id)
        {
            var estudante = _atividadesCollection.Find(Builders<Atividade>.Filter
            .Where(_ => _.id == id)).FirstOrDefault();            

            return Ok(estudante);
        }

        [HttpPut]
        public ActionResult AtualizarAtividades([FromBody] AtividadeDto dto)
        {
            _atividadesCollection.UpdateOne(Builders<Atividade>.Filter
            .Where(_ => _.id == dto.id),
             Builders<Atividade>.Update.Set("nome", dto.Nome)
                                       .Set("descricao", dto.Descricao)
                                        );
            
             return Ok("Atividade atualizada com sucesso");
        }

       [HttpDelete("{id}")]
        public ActionResult DeletarAtividade(string id)
        {
            _atividadesCollection.DeleteOne(Builders<Atividade>.Filter
            .Where(_ => _.id == id));            
            
             return Ok("Atividade deletada com sucesso");
        }
    }
}
