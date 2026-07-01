// REPOSITÓRIO E DADOS COMPLEXOS DO ECOSSISTEMA
const BANCO_PROJETOS = [
    {
        id: "sys-01",
        title: "Distributed Pipeline Telemetry",
        desc: "Ingestão assíncrona orientada a eventos estruturada em Node.js e Apache Kafka para processamento analítico massivo.",
        category: "Backend",
        badge: "Active",
        tech: "Node.js / Kafka"
    },
    {
        id: "sys-02",
        title: "Quantum UI Design System",
        desc: "Arquitetura desacoplada de componentes reutilizáveis agnósticos estruturada sob padrões estritos de acessibilidade WCAG.",
        category: "Frontend",
        badge: "Optimized",
        tech: "Web Components"
    },
    {
        id: "sys-03",
        title: "Hyperion Ledger Platform",
        desc: "Gateway financeiro unificado inteligente integrado para validação instantânea de transações e conciliação bancária.",
        category: "Fullstack",
        badge: "Production",
        tech: "Go / Next.js"
    },
    {
        id: "sys-04",
        title: "BioSync Wearable Engine",
        desc: "Aplicativo embarcado nativo de alta performance para aquisição contínua de sinais vitais e telemetria de saúde médica.",
        category: "Mobile",
        badge: "Beta",
        tech: "Flutter / CoreBluetooth"
    },
    {
        id: "sys-05",
        title: "Apex Indexer Core",
        desc: "Mecanismo autônomo baseado em grafos para indexação em tempo real e otimização de buscas em bancos relacionais.",
        category: "Backend",
        badge: "Active",
        tech: "Rust / PostgreSQL"
    },
    {
        id: "sys-06",
        title: "Aura Media Renderer",
        desc: "Camada operacional de renderização gráfica acelerada por hardware voltada para exibição de dados industriais densos.",
        category: "Frontend",
        badge: "Stable",
        tech: "React / WebGL"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.btn-filter');
    const searchInput = document.getElementById('project-search');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const appBody = document.getElementById('app-body');
    const metricsSummary = document.getElementById('metrics-summary');

    // Estado da Aplicação
    let currentCategory = 'all';
    let searchQuery = '';

    // 1. GERAÇÃO DINÂMICA DE MÉTRICAS (Estatísticas do Topo)
    function updateMetrics() {
        const total = BANCO_PROJETOS.length;
        const backendCount = BANCO_PROJETOS.filter(p => p.category === 'Backend').length;
        const frontendCount = BANCO_PROJETOS.filter(p => p.category === 'Frontend').length;

        metricsSummary.innerHTML = `
            <div class="metric-card">
                <span>Total de Sistemas</span>
                <h2>${total}</h2>
            </div>
            <div class="metric-card">
                <span>Core Backend</span>
                <h2>${backendCount}</h2>
            </div>
            <div class="metric-card">
                <span>Interfaces UI</span>
                <h2>${frontendCount}</h2>
            </div>
        `;
    }

    // 2. FILTRAGEM MULTI-NÍVEL DE COMPONENTES
    function renderDashboardGrid() {
        projectsGrid.innerHTML = '';

        // Processa filtros simultâneos (Categoria + Busca Textual)
        const runtimeFiltered = BANCO_PROJETOS.filter(projeto => {
            const matchesCategory = currentCategory === 'all' || projeto.category === currentCategory;
            const matchesSearch = projeto.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  projeto.desc.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (runtimeFiltered.length === 0) {
            projectsGrid.innerHTML = `
                <div style="width: 100%; text-align: center; padding: 40px; color: var(--text-muted);">
                    Nenhum sistema corresponde aos critérios de pesquisa estabelecidos.
                </div>
            `;
            return;
        }

        // Injeção dos Articles Conforme Solicitado
        runtimeFiltered.forEach(projeto => {
            const articleHTML = `
                <article data-id="${projeto.id}">
                    <div>
                        <div class="card-header">
                            <span class="card-badge">${projeto.badge}</span>
                            <span style="font-size: 1.1rem;">⚡</span>
                        </div>
                        <h3 class="project-title">${projeto.title}</h3>
                        <p class="project-desc">${projeto.desc}</p>
                    </div>
                    <div class="card-footer">
                        <span class="tech-tag">${projeto.tech}</span>
                        <button class="action-link" onclick="triggerSystemAccess('${projeto.id}')">
                            Inspecionar Code &rarr;
                        </button>
                    </div>
                </article>
            `;
            projectsGrid.insertAdjacentHTML('beforeend', articleHTML);
        });
    }

    // 3. CAPTURA DE INPUT (BUSCA REALTIME)
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderDashboardGrid();
    });

    // 4. SELEÇÃO DE CATEGORIAS FLEXBOX
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            currentCategory = e.target.getAttribute('data-filter');
            renderDashboardGrid();
        });
    });

    // 5. GERENCIADOR DE TEMA EXCLUSIVO DO REQUISITO
    themeToggleBtn.addEventListener('click', () => {
        appBody.classList.toggle('tema-escuro');
        
        const iconContainer = themeToggleBtn.querySelector('.theme-icon');
        if (appBody.classList.contains('tema-escuro')) {
            iconContainer.textContent = '🌙';
        } else {
            iconContainer.textContent = '☀️';
        }
    });

    // Inicialização do ecossistema
    updateMetrics();
    renderDashboardGrid();
});

// Ação Simulada Avançada externa ao escopo local
function triggerSystemAccess(systemId) {
    console.log(`[SEGURANÇA] Requisição de acesso autorizada para o nó de microsserviço: ${systemId}`);
    alert(`Acessando terminal seguro do sistema de ID: ${systemId}\nVerifique o console de depuração.`);
}
