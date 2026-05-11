# Engenharia de Software Backend
Repositório do Projeto Backend desenvolvido na disciplina de Engenharia de Software do curso de Ciência da Computação (UTFPR-CM)

## Requisitos
- Node.js 18+ (ou 20+)
- Docker e Docker Compose

## Passo a passo inicial
1) Instale as dependencias
```
npm install
```

2) Configure as variaveis de ambiente
- Copie o arquivo base:
```
cp .env_default .env
```
- Edite o arquivo .env com os valores abaixo (exemplo):
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=pet_user
DB_PASSWORD=pet_pass
DB_DATABASE=pet-backend
DB_ROOT_PASSWORD=root_pass
```

3) Suba o banco de dados (Docker)
```
docker-compose up -d
```

4) Rode as migrations (se existirem)
```
npm run migrate:latest
```

5) Inicie o projeto
- Modo desenvolvimento (watch):
```
npm run dev
```
- Modo normal:
```
npm start
```

## Scripts uteis
- Subir banco: `docker-compose up -d`
- Derrubar banco: `docker-compose down`
- Migrations: `npm run migrate:latest`
- Criar migration: `npm run migrate:make`
- Rollback: `npm run migrate:rollback`
