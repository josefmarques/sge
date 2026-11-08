# Contexto do projeto SGE — redesign Tailwind

> Arquivo de retomada. Salvo em 08/11/2026.
> Branch atual: `opencode/redesign`
> Último commit: `12a1e42 Redesign login`
> Estado: **redesign completo do login + de todo o sistema implementado e testado**, com as alterações do redesign geral ainda **não commitadas** (working tree).

---

## 1. Resumo do que foi feito

O sistema SGE (Django) foi migrado de **Bootstrap 5** para **TailwindCSS** com tema escuro, mantendo a identidade visual criada na tela de login (gradientes esmeralda → ciano → violeta, glassmorphism, tipografia Inter).

Entregas:

1. **Tela de login** redesenhada (já commitada em `12a1e42`).
2. **Shell da aplicação** novo: sidebar fixa no desktop, drawer no mobile, topbar sticky, skip link, menu de usuário, footer e mensagens.
3. **Dashboard** novo com KPIs, gráficos Chart.js (vendorizado) e bloco de IA colapsável.
4. **CRUD completo redesenhado** de `products`, `brands`, `categories`, `suppliers` (list/create/detail/update/delete).
5. **CRUD redesenhado** de `inflows` e `outflows` (list/create/detail).
6. **Componentes reutilizáveis** de UI (page header, cards de métrica, tabela, paginação, formulário, empty state, exclusão, sprite de ícones).
7. **Correções de backend** encontradas nos testes (500s, validações, filtros inválidos).
8. **Build local do Tailwind** (sem CDN em runtime) e **Chart.js local** (sem CDN).

---

## 2. Como rodar / retomar

```bash
cd /home/zemarques/sge
source venv/bin/activate
python manage.py runserver
```

- URL: http://localhost:8000/login/
- Credenciais: **usuário `zemarques`**; senha: **a fornecida na sessão** (não gravada neste arquivo por segurança).
- O servidor já estava rodando na porta 8000 ao salvar este arquivo.
- Banco SQLite (`db.sqlite3`) está **vazio de dados de negócio** (apenas usuários). Os dados temporários “QA ” usados nos testes foram removidos.

### Rebuild do CSS (obrigatório após alterar templates/classes)

```bash
npm run build:css
# ou
npx --yes tailwindcss@3.4.17 -i ./app/static/css/tailwind-input.css -o ./app/static/css/sge.css --minify
```

O CSS compilado (`app/static/css/sge.css`) é versionado e servido via `{% static %}`.

### Verificações rápidas

```bash
python manage.py check
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/login/
```

---

## 3. Stack e configuração

- Django 5.0.1, Python 3.14 no venv local (Docker usa Python 3.11).
- TailwindCSS 3.4.17 compilado localmente.
- Chart.js 4.4.1 vendorizado em `app/static/vendor/chart.umd.min.js`.
- WhiteNoise para estáticos com `DEBUG=False`.
- Bootstrap foi **removido** de todos os templates (CSS, JS e Bootstrap Icons).

### Arquivos de configuração relevantes (já no commit do login)

- `app/settings.py`:
  - `STATIC_URL = '/static/'`
  - `STATICFILES_DIRS = [BASE_DIR / 'app' / 'static']`
  - `STATIC_ROOT = BASE_DIR / 'staticfiles'`
  - `WHITENOISE_USE_FINDERS = True`
  - `STORAGES` com `whitenoise.storage.CompressedStaticFilesStorage`
  - middleware `whitenoise.middleware.WhiteNoiseMiddleware`
- `app/urls.py`: `LoginView(redirect_authenticated_user=True)`.
- `requirements.txt`: inclui `whitenoise==6.7.0`.
- `Dockerfile`: `collectstatic` antes do `runserver`.
- `.gitignore`: `node_modules/`, `staticfiles/`.

---

## 4. Design system

Tokens em `tailwind.config.js`:

| Token | Hex | Uso |
|---|---|---|
| `ink-950` | `#05070D` | fundo global |
| `ink-900` | `#080D17` | superfícies/cards |
| `ink-800` | `#0B1220` | inputs |
| `ink-700` | `#111B2E` | hover/bordas |
| `brand-300/400/500` | `#6EE7B7` / `#34D399` / `#10B981` | destaque/CTA |
| `aqua-300/400/500` | `#67E8F9` / `#22D3EE` / `#06B6D4` | secundário/saídas |
| `iris-300/400/500` | `#A5B4FC` / `#818CF8` / `#6366F1` | IA/entradas/saídas |

Classes de componente principais (em `app/static/css/tailwind-input.css`):

- Fundos: `.auth-bg`, `.app-bg`, `.auth-grid`, `.app-grid`
- Superfícies: `.surface`, `.card`, `.panel`, `.card-gradient`
- Botões: `.btn`, `.btn-primary`, `.btn-inflow`, `.btn-outflow`, `.btn-secondary`, `.btn-ghost`, `.btn-danger`, `.btn-danger-soft`, `.btn-sm`, `.btn-icon`
- Formulários: `.label`, `.input`, `.form-control`, `.form-select`, `.help`, `.field-error`, `.form-grid`, `.field`
- Badges: `.badge`, `.badge-brand`, `.badge-aqua`, `.badge-iris`, `.badge-rose`, `.badge-amber`, `.badge-slate`
- Tiles: `.icon-tile`, `.icon-tile-{brand,aqua,iris,rose,amber,slate}`
- KPIs: `.kpi`, `.kpi-{aqua,iris,amber,rose}`, `.kpi-label`, `.kpi-value`
- Navegação: `.nav-group-label`, `.nav-link-app` (ativo via `[aria-current="page"]`)
- Tabela: `.table-wrap`, `.table-scroll`, `.table`, `.cell-strong`, `.col-actions`
- Paginação: `.page-btn`, `.page-btn-active`
- Alertas/empty: `.alert-*`, `.empty-state`
- Gráficos/IA: `.chart-box`, `.chart-box-doughnut`, `.ai-prose`

---

## 5. Arquivos criados neste redesign (não commitados)

### Componentes novos

- `app/templates/components/_icon_sprite.html` — sprite SVG inline (todos os ícones).
- `app/templates/components/_messages.html` — mensagens Django estilizadas.
- `app/templates/components/_page_header.html` — cabeçalho de página (eyebrow/título/subtítulo/voltar).
- `app/templates/components/_metric_card.html` — card de KPI reutilizável.
- `app/templates/components/_empty_state.html` — estado vazio reutilizável.
- `app/templates/components/_form_fields.html` — renderização dos campos de formulário com label/erro/help.
- `app/templates/components/_delete_card.html` — card de confirmação destrutiva.

### Build/assets

- `app/static/css/sge.css` — CSS compilado (bundle único, ~63 KB).
- `app/static/vendor/chart.umd.min.js` — Chart.js local.

### Este arquivo

- `recupera-contexto.md`

---

## 6. Arquivos modificados neste redesign (não commitados)

### Shell e dashboard

- `app/templates/base.html` — reescrito (sidebar + topbar + main + footer + JS).
- `app/templates/components/_sidebar.html` — menu lateral moderno com drawer e item ativo.
- `app/templates/components/_footer.html` — rodapé novo.
- `app/templates/components/_ai_result.html` — bloco IA `<details>` com empty state.
- `app/templates/components/_product_metrics.html` — 4 KPIs de estoque.
- `app/templates/components/_sales_metrics.html` — 4 KPIs de vendas.
- `app/templates/components/_pagination.html` — paginação Tailwind + preservação de filtros via JS.
- `app/templates/home.html` — dashboard redesenhado com Chart.js local.

### Entidades (todos os templates)

- `products/templates/product_{list,create,detail,update,delete}.html`
- `brands/templates/brand_{list,create,detail,update,delete}.html`
- `categories/templates/category_{list,create,detail,update,delete}.html`
- `suppliers/templates/supplier_{list,create,detail,update,delete}.html`
- `inflows/templates/inflow_{list,create,detail}.html`
- `outflows/templates/outflow_{list,create,detail}.html`

### Backend (correções)

- `products/views.py`
  - valida `category`/`brand` como inteiros (evita 500 com `?category=abc`);
  - adiciona `filters_active` ao contexto.
- `products/forms.py`
  - `min`/`step` nos preços e validação de valores negativos.
- `inflows/forms.py`
  - `min` na quantidade e validação `> 0`.
- `outflows/forms.py`
  - guarda contra `product=None` (evita 500);
  - validação `> 0`;
  - mantém validação de quantidade acima do estoque.

### Build/config

- `tailwind.config.js` — paleta estendida, sombras, animações.
- `app/static/css/tailwind-input.css` — design system completo.
- `package.json` — scripts `build:css` / `watch:css` para `sge.css`.
- `app/templates/registration/login.html` — passou a usar `sge.css`.
- `README.md` — descrição atualizada para TailwindCSS + seção de build do front-end.

### Removidos

- `app/static/css/login.css` (substituído por `sge.css`).
- `app/templates/components/_header.html` (substituído pelo topbar no `base.html`).

---

## 7. Comportamento por tela

### Login
- Layout split-screen, card com glassmorphism, toggle de senha, erros em bloco, `next` preservado, responsivo e com modo compacto em telas baixas.

### Shell
- Sidebar com grupos “Visão geral”, “Catálogo” e “Movimentações”.
- Item ativo via `request.resolver_match.url_name` + `aria-current="page"`.
- Drawer mobile: abre pelo hambúrguer, overlay, foco no botão “Fechar menu”, Tab preso na sidebar, Esc fecha e devolve foco.
- Menu do usuário (`<details>`) fecha ao clicar fora e com Esc.
- Logout por POST com CSRF (sidebar e menu do usuário).

### Dashboard
- 8 KPIs; gráficos de linha/barras/rosca com tema escuro.
- Empty state de categorias/marcas quando não há dados.
- Bloco “SGE Agent” sempre presente, com empty state se não houver `AIResult`.

### Listagens
- Header + botão primário, filtros, contagem, badges, ações com `aria-label`.
- Colunas ocultas por breakpoint; coluna de ações sticky; scroll horizontal só dentro da tabela.
- Empty state fora do fluxo da tabela em mobile.
- Paginação preserva filtros via JS (`data-page-link`).

### Formulários
- `novalidate` + validação server-side; erros inline em pt-BR com `role="alert"`, `aria-invalid`, `aria-describedby` e foco no primeiro inválido.
- Botão desabilita e muda para “Salvando…” / “Excluindo…”.

### Detalhes/Exclusão
- Detalhes com grid de informações, links de relacionamento e ações condicionadas por permissão.
- Exclusão com card destrutivo; no mobile “Cancelar” vem antes de “Excluir definitivamente”.

---

## 8. Testes realizados

### Agente `django-frontend`
- Produziu a proposta do design system, shell, componentes e layout de todas as telas.

### Agente `django-e2e-tester`
- **Rodada 1 (login)**: validou o redesign da tela de login.
- **Rodada 2 (sistema completo)**: 66 combinações tela × viewport; encontrou P0/P1/P2.
- **Rodada 3 (revalidação)**: confirmou as correções; restaram apenas P3.

### Resultado final
- P0: **0**
- P1: **0** (os 500s e filtros inválidos foram corrigidos)
- Sem scroll horizontal em 320/390/768/1024/1440/1920.
- Console limpo nas telas principais.
- Login/logout, permissões, formulários, drawer e gráficos validados.
- Dados “QA ” removidos após os testes.

---

## 9. Pendências / próximos passos (P3)

Itens de polimento que ficaram para depois:

1. **Templates 404/500** estilizados com a identidade SGE (hoje usa página padrão do Django em `DEBUG=True`).
2. **Fonte Inter** ainda vem do Google Fonts; considerar self-host para offline/privacidade.
3. **Placeholder dos selects** ainda é `---------` (Django). Opção: `empty_label` nos `ModelChoiceField`.
4. **Sobreposição de ~17px** da coluna sticky de ações em viewport de 320px.
5. **Classes legadas** `form-control` e `btn btn-primary` permanecem no HTML (são redefinidas pelo CSS; renomear é cosmético).
6. **Alvos de toque** de ícones de ação em 36×36 (recomendado 44×44).
7. **Drawer**: considerar `inert`/`aria-modal` no restante da página enquanto aberto.
8. **KPIs no mobile**: 8 cards empilhados ocupam bastante altura; avaliar 2 colunas a partir de 360px.
9. **Validação de negativos** já foi adicionada nos formulários; considerar `MinValueValidator` nos models (exige migration).
10. **Paginação** não foi exercitada com muitos registros (listas têm poucos itens).

---

## 10. Comandos úteis

```bash
# ambiente
cd /home/zemarques/sge
source venv/bin/activate

# servidor
python manage.py runserver

# checks
python manage.py check

# CSS
npm run build:css
npm run watch:css

# estáticos em produção
python manage.py collectstatic --noinput

# git
git status
git diff --stat
git log --oneline -5
```

---

## 11. Observações importantes

- As alterações do redesign geral estão **não commitadas**. O commit `12a1e42` contém apenas a fase do login e configurações.
- O `README.md` tinha alterações prévias do usuário (comandos colados no topo); foram preservadas. A descrição da stack e uma seção de build Tailwind foram adicionadas.
- O banco está sem dados de negócio. Para visualizar as telas com dados, cadastre produtos/categorias/marcas/fornecedores ou rode um seed temporário.
- O servidor pode ter sido encerrado ao retomar; basta subir novamente com `python manage.py runserver`.
- Se o CSS parecer desatualizado após mudanças, rode `npm run build:css` e recarregue com cache limpo.
- O navegador do Playwright pode iniciar autenticado; para testar o login, limpe os cookies ou use uma janela anônima.

---

## 12. Retomada rápida

1. `git status` para ver o que está pendente de commit.
2. `source venv/bin/activate && python manage.py runserver`.
3. Abrir `http://localhost:8000/login/` e entrar com `zemarques` e a senha fornecida na sessão.
4. Escolher uma pendência da seção 9 (sugestão: templates 404/500 ou self-host da fonte).
5. Após alterar templates, rodar `npm run build:css`.
6. Validar com o agente `django-e2e-tester` antes de commitar.
