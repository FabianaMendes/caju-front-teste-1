
# Caju Front End Teste

Este é um desafio técnico proposto pela Caju para demonstrar habilidades como frontend. A proposta era dar continuidade ao desenvolvimento da plataforma de admissão, que consiste em duas telas, a tela de `Dashboard` e uma tela de `Cadastro`.

O `Dashboard` mostra todas as admissões criadas, com as opções de aprovar, reprovar e excluir.

![Screenshot 2024-06-11 at 11 48 24 AM](https://github.com/caju-beneficios/caju-front-teste-1/assets/31169925/fedeff5c-a0d3-4df1-aebd-1f2d25c56a48)

Dashboard com a listagem das admissões.

![Screenshot 2024-06-11 at 1 52 35 PM](https://github.com/caju-beneficios/caju-front-teste-1/assets/31169925/3b002341-454b-4b24-82cb-6390656b56cc)

A tela de `Cadastro` exibe um formulário simples que será utilizado para criar as admissões.

![Screenshot 2024-06-11 at 11 48 47 AM](https://github.com/caju-beneficios/caju-front-teste-1/assets/31169925/bbbb211c-165f-40e5-b2af-61adafd61398)

## Apresentanção do problema


O desafio era aprimorar o código existente e implementar as funcionalidades que estavam incompletas, usando a experiência prévia para identificar e propor soluções para os problemas encontrados.
Permitido refatorar, criar novas pastas, componentes, hooks, utils e o que mais for necessário para garantir que o projeto esteja organizado e segue as boas práticas de desenvolvimento.


## Especificações

### Tela Dashboard
  
- Implementar `GET` ao carregar a pagina e ao fazer pequisa por `CPF`
- Filtrar os cards por coluna, usando o status.
- Implementar `PUT` ao clicar em Reprovar e alterar o status para `REPROVED`
- Implementar `PUT` ao clicar em Aprovar e alterar o status para `APPROVED`
- Implementar `PUT` ao clicar em Revisar novamente e alterar o status para `REVIEW`
- Implementar `DELETE` ao clicar no lixeira no card.
- O botão de `Reprovar` e `Aprovar` só deve aparecer em admissões com o status `REVIEW` 
- O botão `Revisar novamente` só deve aparecer em admissões com o status `REPROVED` ou `APPROVED`
- Implementar um loading na tela ao realizar requisições.
- Todas as ações devem ter modal de confirmação e uma notificação de sucesso ou erro
- Na pesquisa por CPF realizar a requisição automaticamente ao preencher um CPF válido
- Adicionar máscara de CPF no campo de pesquisa.
- Atualizar os dados (refetch) ao clicar no ícone de atualizar


### Tela Cadastro

- Implementar validação no campo de `email` para que aceite apenas emails válidos
- Implementar validação no campo `nome completo` para que aceite pelo menos um espaço, no mínimo duas letras, e que a primeira letra não seja um número.
- Implementar validação no campo CPF para aceitar apenas CPFs válidos e adicionar uma máscara de CPF ao campo.
- Implementar `POST` ao preencher todos os campos corretamentes.
- Redirecionar ao `/dashboard` ao criar uma nova admissão.


## API
Inicialmente era consumido uma API mockada localmente, executada utilizando o json-server. Para mais informações consulte a [documentação](https://github.com/typicode/json-server/).

Exemplo de Requisição:

```
POST http://localhost:3000/registrations
Content-Type: application/json
{
  "admissionDate": "23/10/2023",
  "email": "maria@caju.com.br",
  "employeeName": "Maria Silva",
  "status": "REVIEW",
  "cpf": "12345678901"
}
```

Para realizar a pesquisa por CPF, foi utilizada essa funcionalidade do json-web-server:
<br/>
https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file#filter


## Extras (opcional)

- Testes Unitários e de Integração `(Obrigátorio para Senior e Tech Lead)`
- End-to-End (E2E) 
- Configuração de CI/CD com deploy automatizado

## Dicas e sugestões

- Faça bom uso da componentização
- Garanta que a aplicação é performática
- Faça bom uso do HTML e WAI-ARIA
- Garanta uma experiência fluida e acessível
- Utilize conceitos (SOLID, DRY, KISS, Clean code) e design patterns
- Crie testes coesos e que garantam o bom funcionamento da aplicação

### Performance avaliada com base nos seguintes pontos:

- A aplicação funciona conforme o esperado seguindo todas as especificações
- O código é claro e de fácil entendimento
- Conhecimento em HTML, CSS, JavaScript / TypeScript e React
- Experiência do usuário
- Arquitetura (conceitos, patterns, algoritmos, forma como os problemas foram solucionados)
- Boas práticas de desenvolvimento
- Proeficiência com automação de testes. Não exigimos 100% de cobertura
- Senso crítico e analítico

## Iniciando o desenvolvimento

Realize o clone do repositório e instale as dependências

```shell
git clone https://github.com/caju-beneficios/caju-front-teste-1.git
cd caju-front-test-1
```

```shell
yarn install
```

Inicie o servidor do Json Web Server para consumir a API

```shell
yarn init:db
```

Execute a aplicação

```shell
yarn dev
```

Se tudo ocorreu bem os seguintes serviços estarão disponiveis em:
<br/>

Aplicação http://localhost:3001/
<br/>
Json Web Server http://localhost:3000/

## Testes

# Cypress
Para rodar os testes com cypress basta rodar o comando abaixo:

```shell
yarn cy:run
```

Se quiser testar as modificações locais:
```shell
yarn test:e2e
```

# Jest
Para executar a suíte de testes use o comando abaixo:

```shell
yarn test:dev
```

## CI/CD
O JSON Web Server foi hospedado no [Render](https://render.com/)

*Obs: Infelizmente o Render mostrou ter uma péssima performance no primeiro acesso. Com certeza vale a troca, mas devido ao tempo limitado para entrega do teste vou deixar como está, entendendo que o objetivo seria avaliar as capacidades técnicas de configuração da pipe. Embora esse ponto tenha prejudicado muito a performance no primeiro acesso, essa é uma limitação da ferramenta gratuita escolhida e pode ser resolvida facilmente com uma troca de hospedagem.

O front foi hospedado no [Vercel]()

`Endereço do app:`
[https://caju-front-teste-1-fabianamendes.vercel.app/](https://caju-front-teste-1-fabianamendes.vercel.app/)

O CI/CD foi configurado com [Circle CI](https://circleci.com/)