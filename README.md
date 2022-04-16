<h1 align="center"> FC-Hackathon2022-Squad16-Back-end </h1>


<h2 align="center"> Descrição </h2>

Este é o back-end da Technical Share, uma aplicação desenvolvida para o Hackathon do Programa de Formação da FCamara - Season 3. 
Ela usa **typescript** com **express**, **typeorm**, **class-validator**, **jsonwebtoken** e **socket.io**. É possível criar usuários, logar, procurar mentores, conversar com eles,
avaliá-los e apresentar as tecnologias que o usuário está estudando. 

<br/>
    <h3 align='center'>Acesse o projeto no heroku para testar: <a href='https://squad-sixteen-frontend.herokuapp.com/'><strong>Technical Share</strong></a></h3>
<br/>

``` bash
#Abaixo estão os dados fictícios de e-mail e senha para a navegação das telas:

email: fcamara@yahoo.com
senha: fcamara2022

#Link do back-end no Heroku:

https://squad-sixteen-backend.herokuapp.com
```

<h2 align="center"> Dúvidas e bugs </h2>

Para tirar dúvidas ou reportar bugs, por favor, utilizar o [canal do Squad16 no Discord](https://discordapp.com/channels/895049987241672704/895049990056058936). 


<h2 align="center"> Equipe </h2>

### UX
[Fabrício Ribeiro - Github](https://github.com/fabricioishere)

Erika Soares

[Beatriz Cristina - Github](https://github.com/BeatrizUXCode) 


### DEVs
[Juliana Satoko Hagiwara Miura - Github](https://github.com/SatokoHagiwara)  

[Felipe Pupo - Github](https://github.com/felipepupo)

[Carlos Henrique Varejão - Github](https://github.com/Carllitsy)

[Ivy Magesti - Github](https://github.com/ivymagesti) 


<h2 align="center"> Como instalar </h2>

Você precisa ter o nodejs na última versão LTS e o NPM (node package manager). 

> Clone o projeto
```bash
git clone https://github.com/Squad16-FCamara/FC-Hackathon2022-Squad16-Back-end.git
```

> Entre na pasta do projeto
```bash
cd FC-Hackathon2022-Squad16-Back-end
```

> Instale as dependências
```bash
npm install 
```

Configure um arquivo .env com base na especificação do .env.example

> Com a .env configurada, rode o projeto
```bash
npm run dev
```

O projeto possui uma documentação no Insomnia. Para vê-la, basta importar no Insomnia (create => import from file), o arquivo Insomnia.json existente na raiz do projeto.

No Insomnia é possível testar todas as rotas da aplicação. Existe um ambiente de produção onde é possível testar a API que está funcionando no Heroku, ou também é possível alterar
para o ambiente de desenvolvimento, consumindo a API local. 

Existem algumas variáveis de ambiente como o token de usuário e o token de mentor, você pode alterá-los para os seus tokens e alternar entre as variáveis na aba de 
autenticação de cada rota. 

<h2 align="center">Rotas</h2>

### Usuários

[create] POST /user => rota para criar usuário.

[login] POST /auth => rota para logar.

[getUserById] GET /user/**idDoUsuario** => pega as informações do usuário com o ID informado.

[search] GET /search => rota para buscar usuários, você pode usar queryparams para procurar pelo nome do usuário (name) ou procurar por uma linguagem e o nível do usuário nela, variando entre 0 e 4 (javascript 4).

[getAll] GET /users => rota para buscar todos os usuários do banco de dados.

### Feedback

[create] POST /feedback => rota para avaliar um mentor.

### ConnectedUsers

[create] POST /connect => rota para adicionar um mentor ao seu chat. 

[get] GET /connect => rota para buscar todos os mentores com quem você pode conversar. Se você for um mentor, todos os usuários com os quais você pode conversar. 
