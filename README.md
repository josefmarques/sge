read -rsp 'cole a nova chave: ' CONTEXT7_API_KEY &&                                                               
     printf 'export CONTEXT7_API_KEY=%q\n' "$CONTEXT7_API_KEY" > ~/.config/opencode/                                                    
     context7.env                                                                                                                       
     chmod 600 ~/.config/opencode/context7.env                                                                                          
     unset CONTEXT7_API_KEY





# Sistema de Gestão de Estoque (SGE)

Bem-vindo ao Sistema de Gestão de Estoque (SGE), um projeto desenvolvido em Django e TailwindCSS para facilitar o gerenciamento de estoque. Este README fornece informações essenciais sobre como configurar e executar o projeto em seu ambiente local.

## Requisitos

Certifique-se de que você tenha os seguintes requisitos instalados em seu sistema:

- Python (versão recomendada: 3.7 ou superior)
- Django (instalado automaticamente ao seguir as instruções abaixo)
- Outras dependências listadas no arquivo `requirements.txt`


## Instalação das Dependências

Com o ambiente virtual ativado, instale as dependências do projeto usando o comando:
```bash
pip install -r requirements.txt
```


## Rodar o projeto

Após instalar as dependências, aplique as migrations no banco de dados com o comando:
```bash
python manage.py migrate
```

Agora o projeto jã pode ser inicializado com o comando:
```bash
python manage.py runserver
```

Após isso, o sistema estará pronto para ser acessado em:
[http://localhost:8000](http://localhost:8000)

## Front-end (TailwindCSS)

O CSS é compilado localmente a partir de `app/static/css/tailwind-input.css` e servido em `app/static/css/sge.css`. Para reconstruir após alterar templates ou classes:

```bash
npm install
npm run build:css
```

Em produção, rode `python manage.py collectstatic` (o WhiteNoise serve os arquivos estáticos).
