<h1 align="center"><strong>API VUTTR</strong></h1>
---

## 💬 Sobre

A aplicação VUTTR (Very Useful Tools to Remember) é um repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags.

## 📋 Tecnologias Utilizadas

- **NodeJS**
- **Express**
- **Jest**
- **Yarn**
- **MongoDB**
- **Swagger**

## 🛤 Rotas da Aplicação

- **` POST /tools `**: Rota para cadastrar uma nova ferramenta. O corpo da requisição deve conter os dados da ferramenta (título, link, descrição e tags) que será cadastrada, sem o identificador, pois será gerado automaticamente.


- **` GET /tools `**: Rota para listar todas as ferramentas cadastradas. É possível paginar essa listagem através dos parâmetros ``` page ``` e ``` limit ```. Exemplo de paginação: ``` /tools?page=2&limit=10 ```

- **` GET /tools?tag={tags} `**: Rota para listar as ferramentas filtrando-as pelas tags que desejar. Para inserir mais de uma tag no filtro, basta utilizar a vírgula como separador. Exemplo: ``` /tools?tag=tag1,tag2 ```

- **` DELETE /tools/{id} `**: Rota para deletar uma ferramenta.

## ⚙️ Testes

- **` should be able to create a new tool `**: Para que o teste passe, a API deve criar a ferramenta e retornar um json com os dados da ferramenta criada (inclusve o identificador gerado).

- **` should not be able to create a new tool without required fields `**: Para que o teste passe, a API não deve permitir a criação de uma nova ferramente sem os campos obrigatórios (título e/ou link).

- **` should be able to update an existent tool `**: Para que o teste passe, a API deve atualizar uma ferramenta existente e retornar os dados atualizados.

- **` should not be able to update a tool that not exists `**: Para que o teste passe, a API não deve atualizar uma ferramenta que não existe.

- **` should be able to list the tools `**: Para que o teste passe, a API deve retornar uma lista de todas as ferramentas cadastradas.

- **` should be able to filter a tool by tags `**: Para que o teste passe, a API deve retornar uma lista de todas as ferramentas que contém a(s) tag(s) passada(s) na rota.

- **` should be able to delete a tool `**: Para que esse teste passe, a API deve deletar uma ferramenta.

- **` should not be able to delete a tool that not exists `**: Para que esse teste passe, a API não deve deletar uma ferramenta que não existe.