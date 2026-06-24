# Helpdesk MVC

Projeto reiniciado sem Laravel/Vite, com estrutura MVC simples em PHP.

## Estrutura

- app/Controllers
- app/Models
- app/Views
- app/Core
- config
- routes
- public
- database/scripts

## Tabelas mapeadas

- USUARIO
- CHAMADO
- CATEGORIA
- HISTORICO
- STATUS

## Executar localmente

Use servidor PHP apontando para a pasta public:

```bash
php -S localhost:8000 -t public
```

Ajuste as credenciais em `config/database.php`.
