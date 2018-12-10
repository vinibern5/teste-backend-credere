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

# A API


| Endpoint      | Metodo        | Status Code  | Resposta  |
| ------------- |:-------------:| ------------:| ---------:|
| /probe/position| GET          | 200          | JSON contendo a orientação e as coordenadas x e y da sonda |
| /probe/reset   | GET          | 200          | JSON {status: sucess} indicando o sucesso da requisição |
| /probe/commands| POST         | 200 ou 400   | JSON contendo as novas coordenadas x e y da sonda, ou uma mensagem de erro|

## GET /probe/position
Endpoint para obter a posição e orientação atual da sonda, retornando um JSON no formato 
`{x: 0, y: 0, face: "right"}`. "Face" é a orientação da sonda, podendo ser 'top', 'right', 'bottom' ou 'left'.

Exemplos: 
`{x: 0, y: 2, face: "left"}`
`{x: 4, y: 4, face: "bottom"}`
`{x: 4, y: 2, face: "right"}`

## GET /probe/reset
Endpoint para retornar a sonda para a posição e orientação original.
O json retornado é {status: "Success"}. Após utilizar esse endpoint, a coordenada x e y serão 0, e a face da sonda estará para a direita.

## POST /probe/commands
Endpoint para receber comandos pra sonda. A requisição deve ser um json no formato
`{movements: ["m", "ge", "m"]}`, sendo movements um array com os comandos a serem executados.
A sonda aceita 3 comandos: 'm', para se mover uma unidade na direção atual, 'ge' para girar pra esquerda, e 'gd' para girar pra direita. A capitalização dos comandos não é um problema pra sonda.

A resposta terá status code de 200 e será um json indicando as novas coordenadas x e y da sonda, no seguinte formato: `{x: 4, y: 2}`.
Caso algum comando seja inexistente, ou deixe a sonda em uma posição invalida, o status code será 400 e o json retornado vai conter o erro que aconteceu, de acordo com o formato `{error: <mensagem>`}.

### Exemplos

**Requisição**
```
{
  movements: ['GE', 'M', 'M', 'M', 'GD', 'M', 'M']
}
```
**Resposta**
```
{
  x: 2,
  y: 3
}
```

**Requisição**
``` 
{
  movements: ['m', 'm', 'm', 'm', 'ge', 'm', 'm']
}
```
**Resposta**
```
{
  x: 4,
  y: 2
}
```

**Requisição com erro**
```
{
  movements: ['GD', 'M', 'M']
}
```
**Resposta**
```
{
  error: "exceeded probe limits, [0, -1]"
}
```

# Executando os testes unitários
Para executar os testes, basta utilizar o comando `npm test` na raiz do repositório.
