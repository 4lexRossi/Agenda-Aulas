<h1 align="center">Construindo uma API.NET integrada ao MongoDB Atlas para diário de Classe</h1>

Esse repo é um projeto incrível da DioX Squad
[Digital Innovation One](https://digitalinnovation.one/sign-up?ref=QFX2ZVP4RU)

## clone o repositório 

`git clone https://github.com/4lexRossi/dotNet-mongo-squad1.git`

## Requisitos minimos
dotnet versão 3.1.300
Uma IDE de sua preferência

## Instalar dependências
```
    dotnet add package MongoDB.Driver
```

Criar uma conta no [MongoDB](https://www.mongodb.com/)
Após a criação terá que alterar o campo 
`"ConnectionString": "mongodb+srv://seu_usuario:sua_senha@dotnet-mongo-seu_usuario-v5slk.gcp.mongodb.net/test?retryWrites=true&w=majority"`
no arquivo `appsettings.json`

## Para iniciar o servidor, use o comando:

```
   dotnet run
```
## Para iniciar o servidor, use o comando:
```
   npm start
```

## ## Testando a Api rodando em um servidor local:

ele vai abrir na porta -> [localhost:5000](http://localhost:5000/)

use o endereço -> [localhost:5000/estudante](http://localhost:5000/estudante) para utilizar (o)a aluno(a) e testar os métodos `POST`, `GET` e `PUT` para `DELETE` adicione `/email_do_cadastro` ao final do endereço.
<p></p>

use o endereço -> [localhost:5000/estudante](http://localhost:5000/atividade) para utilizar a atividade e testar os métodos `POST`, `GET` e `PUT` para `DELETE` adicione `/nome_do_cadastro` ao final do endereço.


<h3 align="center">LinkedIn dos Participantes desse projeto</h3>
<p>[Alex Rossi](https://www.linkedin.com/in/4lex/)</p>
<p>[Tati Bleck](https://www.linkedin.com/in/tatianebleck/)</p>
<p>[Victor Silva](https://www.linkedin.com/in/victor-da-silva-a75951138/)</p>

## Links Uteis

- .net core - https://dotnet.microsoft.com/download

- visual code - https://code.visualstudio.com/download

- postman - https://www.postman.com/downloads/

- mongo atlas - https://www.mongodb.com/cloud/atlas/register


-----------------------------------------------

## Referências

https://docs.mongodb.com/

https://docs.mongodb.com/manual/

https://docs.mongodb.com/ecosystem/drivers/csharp/

https://docs.atlas.mongodb.com/
