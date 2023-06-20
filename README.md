
# estrelabet-crawler

> **estrelabet-crawler** é uma ferramenta CLI para buscar ods de um dado time na [estrelabet.com](https://estrelabet.com)

![alt text](https://github.com/Briuor/estrelabet-crawler/blob/main/assets/demo.gif?raw=true)

## Requisitos
NodeJS v16+

## Instalação
```sh
# clone o projeto
git clone https://github.com/Briuor/estrelabet-crawler.git

# entre no diretório do projeto
cd estrelabet-crawler/

# instale as dependências
npm i -g .
```

## Como usar
### Buscar ods das partidas do Cruzeiro
```sh
estrelabet-crawler
```

### [Extra] Buscar ods das partidas de outro time (-t <nome_do_time>)

```sh
estrelabet-crawler -t flamengo
```

### [Extra] Mostrar navegador ao buscar ods das partidas (--show)
```sh
estrelabet-crawler --show
```

## Observação
Caso **tenha problemas para executar** ou **não queira instalar de forma global** na sua máquina usando ```npm i -g .```, instale e execute da seguinte forma:
```sh
# clone o projeto
git clone https://github.com/Briuor/estrelabet-crawler.git

# entre no diretório do projeto
cd estrelabet-crawler/

# instale as dependências
npm install

# buscar ods do cruzeiro
npm start

# buscar ods de outro time
npm start -- -t flamengo

# buscar ods de outro time mostrando o browser
npm start -- -t flamengo --show
```