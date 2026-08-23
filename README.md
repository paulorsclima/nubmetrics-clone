# Nubmetrics Clone

Aplicação web de métricas e gestão de informações comerciais, desenvolvida como projeto de estudo e portfólio para praticar a construção de uma plataforma centralizada de acompanhamento de vendas, produtos, anúncios, perguntas e relatórios.

## Demonstração

Acesse a aplicação online:

[Nubmetrics Clone](https://nubmetrics-clone.vercel.app)

## Sobre o projeto

O projeto simula uma plataforma de análise e gestão para operações de e-commerce e marketplaces.

A proposta é reunir, em uma única interface, diferentes áreas de acompanhamento da operação comercial, facilitando a consulta de dados e a visualização de informações importantes para a tomada de decisões.

O desenvolvimento envolveu a criação de múltiplas telas, navegação entre módulos, organização de componentes visuais, aplicação de estilos e integração entre a interface e uma estrutura de servidor.

## Funcionalidades

A aplicação possui módulos para:

- Dashboard com visão geral dos principais indicadores.
- Acompanhamento de vendas.
- Consulta e organização de produtos.
- Gestão e visualização de anúncios.
- Acompanhamento de perguntas e interações.
- Geração e consulta de relatórios.
- Navegação entre diferentes áreas da plataforma.
- Estrutura de autenticação e callback.
- Comunicação entre a interface e rotas da API.

## Páginas disponíveis

- `index.html` — página inicial da aplicação.
- `dashboard.html` — visão geral dos indicadores.
- `vendas.html` — acompanhamento de vendas.
- `produtos.html` — gerenciamento e consulta de produtos.
- `anuncios.html` — gerenciamento de anúncios.
- `perguntas.html` — acompanhamento de perguntas.
- `relatorios.html` — visualização de relatórios.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- APIs REST
- Vercel
- Git e GitHub

## Estrutura do projeto

```text
nubmetrics-clone/
├── api/
├── public/
│   ├── css/
│   ├── js/
│   ├── anuncios.html
│   ├── dashboard.html
│   ├── index.html
│   ├── perguntas.html
│   ├── produtos.html
│   ├── relatorios.html
│   └── vendas.html
├── server/
│   ├── routes/
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
└── vercel.json
```

## Como executar localmente

### Pré-requisitos

- Node.js instalado.
- npm instalado.
- Git instalado.

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/paulorsclima/nubmetrics-clone.git
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd nubmetrics-clone
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Crie um arquivo `.env` com base no arquivo de exemplo:

   ```bash
   cp .env.example .env
   ```

5. Inicie a aplicação:

   ```bash
   npm start
   ```

6. Acesse o endereço local informado pelo servidor.

> Os comandos podem variar de acordo com os scripts definidos no `package.json` e com a configuração do ambiente.

## Variáveis de ambiente

O projeto possui um arquivo `.env.example` para documentar as variáveis necessárias à configuração local.

Por segurança:

- Não publique chaves de API.
- Não compartilhe tokens de autenticação.
- Não versione o arquivo `.env`.
- Utilize variáveis de ambiente na implantação.

## Objetivos de aprendizagem

Este projeto foi desenvolvido para praticar:

- Estruturação de aplicações web.
- Criação de dashboards comerciais.
- Organização de interfaces por módulos.
- Desenvolvimento com JavaScript.
- Construção de rotas e estrutura de servidor.
- Integração entre front-end e back-end.
- Autenticação e callbacks.
- Publicação de aplicações na Vercel.
- Uso de Git e GitHub no controle de versões.

## Possíveis evoluções

- Integração com dados reais de marketplaces.
- Conexão com a API do Mercado Livre.
- Persistência das informações em banco de dados.
- Inclusão de gráficos interativos.
- Filtros por período, produto e canal de venda.
- Exportação de relatórios em CSV ou PDF.
- Controle de usuários e permissões.
- Testes automatizados.
- Melhorias de acessibilidade e responsividade.
- Integração com ferramentas de Business Intelligence.

## Status do projeto

Projeto desenvolvido para fins de estudo, demonstração técnica e composição de portfólio.

## Autor

Desenvolvido por **Paulo Ricardo S. C. Lima**.

- GitHub: [@paulorsclima](https://github.com/paulorsclima)
- LinkedIn: [Paulo Ricardo Cardoso Lima](http://www.linkedin.com/in/paulo-ricardo-cardoso-a134131a)

---

Este projeto demonstra a aplicação de tecnologia, dados e visão de negócio na construção de soluções voltadas ao e-commerce e à análise de métricas comerciais.
