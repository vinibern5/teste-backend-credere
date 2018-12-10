# teste-backend-credere
Teste de backend da [credere](https://meucredere.com.br/).

# Instruções de Instalação

1. Ter o [node](https://nodejs.org/en/) na versão 10 ou superior, é possível verificar com o comando `node -v`
  Se for necessário instalar ou atualizar, basta seguir as instruções na página de [downloads](https://nodejs.org/en/download/) do node. No ubuntu, é possível instalar utilizando os comandos:
  ```
  curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
2. Clonar o repositório `git clone https://github.com/vinibern5/teste-backend-credere.git`
3. Dentro do repositório, instale as dependencias com o comando `npm install`. Pronto :smiley:

# Executando o projeto

Após ter instalado o projeto, basta executar o comando `npm start`. O servidor irá iniciar por padrão na porta 8000.
É possível definir uma porta diferente utilizando a variável de ambiente PORT. Para isso, é necessário usar o comando
`export PORT=porta` antes de iniciar o servidor. Um exemplo seria `export PORT=3000` para executar o servidor na porta 3000.
