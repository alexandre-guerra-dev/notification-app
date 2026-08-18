# Real-Time Notifications

Aplicação desenvolvida com **ASP.NET Core** e **React** com o objetivo de estudar comunicação em tempo real utilizando **Server-Sent Events (SSE)**.

O projeto possui um sistema simples de autenticação, permitindo que usuários se registrem, façam login e visualizem outros usuários cadastrados. A partir da tela inicial, é possível enviar notificações para outros usuários, que são recebidas em tempo real através de uma conexão SSE.

## Objetivo

Este projeto foi desenvolvido principalmente para estudar e praticar:

* Comunicação em tempo real com Server-Sent Events;
* Integração entre ASP.NET Core e React;
* Criação e consumo de APIs REST;
* Autenticação de usuários;
* Atualização da interface em tempo real;
* Organização de uma aplicação full-stack.

## 🛠️ Tecnologias

### Backend

* C#
* ASP.NET Core
* Entity Framework Core
* SQLite
* ASP.NET Core Identity
* Server-Sent Events
* Event Bus

### Frontend

* TypeScript
* React
* Fetch API
* Streams API

## Funcionalidades

* Autenticação
* Listagem de usuários
* Envio de notificações
* Recebimento de notificações em tempo real
* Listagem de notificações recebidas
* Exclusão de notificações

## Como funciona

Após realizar o login, o usuário acessa a tela principal da aplicação.

O frontend estabelece uma conexão com o backend utilizando **Server-Sent Events**. Essa conexão permanece aberta para que o servidor possa enviar novos eventos ao cliente sempre que necessário.

Quando um usuário envia uma notificação para outro usuário:

```text
Usuário A
   │
   │ Envia notificação
   ▼
ASP.NET Core
   │
   │ Cria notificação
   │ Publica evento
   ▼
Event Bus
   │
   │ Distribui evento
   ▼
Conexões SSE
   │
   │ Recebem o evento
   │ Verificam o destinatário
   ▼
Usuário B
   │
   │ Recebe a notificação
   ▼
React
```

Dessa forma, não é necessário que o frontend fique realizando requisições periódicas para verificar se existem novas notificações.

## Como executar

### Pré-requisitos

* .NET 8
* Node.js
* npm

### Backend

Entre no diretório do backend e execute:

```bash
dotnet restore
dotnet run
```

### Frontend

Entre no diretório do frontend e execute:

```bash
npm install
npm run dev
```

Em seguida acesse:
http://localhost:5173

## Server-Sent Events

O principal objetivo técnico deste projeto é explorar o funcionamento do **Server-Sent Events**.

A aplicação utiliza uma conexão persistente entre o cliente e o servidor. O cliente se conecta ao endpoint SSE e permanece aguardando novos eventos.

Quando uma notificação é enviada para determinado usuário, o backend envia o evento através da conexão correspondente.

Uma representação simplificada seria:

```text
React
  │
  │ GET /notifications/my/sync
  ▼
ASP.NET Core
  │
  │ conexão persistente
  │
  │ <──── evento enviado pelo servidor
  ▼
React
```

Isso permite que as notificações sejam recebidas sem a necessidade de polling.

## Por que Server-Sent Events?

SSE foi escolhido porque o fluxo de comunicação deste projeto é predominantemente unidirecional: o cliente envia uma solicitação ao servidor, enquanto o servidor precisa enviar atualizações ao cliente sempre que uma nova notificação estiver disponível.

Diferentemente de uma abordagem baseada em polling, a conexão SSE permite que o servidor envie os eventos assim que eles ocorrem, evitando requisições periódicas desnecessárias.

WebSockets também seriam uma alternativa para comunicação em tempo real, porém apresentam um modelo bidirecional mais amplo do que o necessário para o cenário atual.

## O que aprendi

Durante o desenvolvimento deste projeto, explorei principalmente:

* Como manter conexões HTTP abertas utilizando SSE;
* Como enviar eventos do servidor para o cliente;
* Como consumir streams de dados com fetch;
* Como associar uma conexão SSE a um usuário autenticado;
* Como integrar comunicação em tempo real com uma API ASP.NET Core;
* Como atualizar o estado da aplicação React a partir de eventos recebidos do servidor.
