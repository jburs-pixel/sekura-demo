// Shared data + i18n for Sekura prototypes
// All three directions consume this.

const SEKURA_REGIONS = [
  { id: 'north',    pt: 'Norte',         es: 'Norte',         en: 'North',         cars: 263, pct: 13.8, ha: 272_345 },
  { id: 'northeast',pt: 'Nordeste',      es: 'Nordeste',      en: 'Northeast',     cars: 566, pct: 29.8, ha: 599_609 },
  { id: 'midwest',  pt: 'Centro-Oeste',  es: 'Centro-Oeste',  en: 'Midwest',       cars: 493, pct: 25.9, ha: 511_412 },
  { id: 'southeast',pt: 'Sudeste',       es: 'Sudeste',       en: 'Southeast',     cars: 296, pct: 15.6, ha: 308_022 },
  { id: 'south',    pt: 'Sul',           es: 'Sur',           en: 'South',         cars: 282, pct: 14.8, ha: 283_570 },
];

const SEKURA_PROPERTIES = [
  { car: 'BR-2310-A4F1-2C26', owner: 'Pedro H. Ribeiro',     cpf: '738.975.279-96', muni: 'Lábrea',          uf: 'AM', region: 'north',     ha: 1470, status: 'breach',  alerts: 3, lastScan: '2026-04-29', risk: 87, biome: 'Amazônia',     crop: 'Soja',  loanBrl: 4_120_000 },
  { car: 'BR-1148-9B7E-D331', owner: 'João P. Lima Soares',  cpf: '714.957.117-75', muni: 'Sorriso',         uf: 'MT', region: 'midwest',   ha: 1946, status: 'ok',      alerts: 0, lastScan: '2026-05-01', risk: 12, biome: 'Cerrado',       crop: 'Milho', loanBrl: 6_250_000 },
  { car: 'BR-7702-3C44-A058', owner: 'Atilio E. Bonatti',    cpf: '441.168.319-96', muni: 'Luís Eduardo Magalhães', uf: 'BA', region: 'northeast', ha: 2019, status: 'watch', alerts: 1, lastScan: '2026-04-30', risk: 41, biome: 'Cerrado', crop: 'Algodão', loanBrl: 7_810_000 },
  { car: 'BR-5519-D801-7E2A', owner: 'Neri J. Chiarelli',    cpf: '983.262.916-68', muni: 'Cascavel',        uf: 'PR', region: 'south',     ha: 1330, status: 'ok',      alerts: 0, lastScan: '2026-05-02', risk: 8,  biome: 'Mata Atlântica', crop: 'Soja',  loanBrl: 3_540_000 },
  { car: 'BR-9904-EE12-AB9F', owner: 'Carlos E. Mendonça',   cpf: '118.311.547-56', muni: 'Uberaba',         uf: 'MG', region: 'southeast', ha: 540,  status: 'breach',  alerts: 2, lastScan: '2026-04-28', risk: 73, biome: 'Cerrado',       crop: 'Café',  loanBrl: 2_140_000 },
  { car: 'BR-6627-44A9-C201', owner: 'Marina S. Vasconcelos', cpf: '209.554.837-21', muni: 'Petrolina',       uf: 'PE', region: 'northeast', ha: 880,  status: 'ok',      alerts: 0, lastScan: '2026-05-02', risk: 15, biome: 'Caatinga',      crop: 'Uva',   loanBrl: 5_900_000 },
  { car: 'BR-3318-F7B0-911C', owner: 'Roberto A. Tanaka',    cpf: '654.221.908-43', muni: 'Rio Verde',       uf: 'GO', region: 'midwest',   ha: 3210, status: 'watch',   alerts: 1, lastScan: '2026-05-01', risk: 38, biome: 'Cerrado',       crop: 'Soja',  loanBrl: 12_400_000 },
  { car: 'BR-8841-021D-5F8E', owner: 'Helena M. Coutinho',   cpf: '871.063.554-09', muni: 'Lucas do Rio Verde',uf: 'MT', region: 'midwest',   ha: 4180, status: 'ok',      alerts: 0, lastScan: '2026-05-03', risk: 19, biome: 'Cerrado',       crop: 'Milho', loanBrl: 18_220_000 },
  { car: 'BR-2255-B6FA-7440', owner: 'Sebastião L. Pereira', cpf: '335.408.711-62', muni: 'Marabá',          uf: 'PA', region: 'north',     ha: 2750, status: 'breach',  alerts: 4, lastScan: '2026-04-26', risk: 91, biome: 'Amazônia',     crop: 'Pecuária', loanBrl: 9_870_000 },
  { car: 'BR-4490-7C3E-DD1B', owner: 'Ana L. Figueiredo',    cpf: '487.225.310-04', muni: 'Ribeirão Preto',  uf: 'SP', region: 'southeast', ha: 1180, status: 'ok',      alerts: 0, lastScan: '2026-05-02', risk: 11, biome: 'Cerrado',       crop: 'Cana',  loanBrl: 7_310_000 },
];

const SEKURA_ALERTS = [
  { id: 'A-2284', car: 'BR-2255-B6FA-7440', kind: 'deforestation', area: 18.4, detected: '2026-04-26', confidence: 96, severity: 'high',   sat: 'Sentinel-2' },
  { id: 'A-2281', car: 'BR-2310-A4F1-2C26', kind: 'deforestation', area: 7.2,  detected: '2026-04-29', confidence: 88, severity: 'high',   sat: 'Sentinel-2' },
  { id: 'A-2278', car: 'BR-9904-EE12-AB9F', kind: 'embargo',       area: null, detected: '2026-04-28', confidence: 100, severity: 'high',  sat: 'IBAMA'      },
  { id: 'A-2274', car: 'BR-7702-3C44-A058', kind: 'fire',          area: 2.1,  detected: '2026-04-30', confidence: 71, severity: 'medium', sat: 'MODIS'      },
  { id: 'A-2270', car: 'BR-3318-F7B0-911C', kind: 'overlap',       area: 0.4,  detected: '2026-04-29', confidence: 82, severity: 'low',    sat: 'CAR-cross'  },
  { id: 'A-2266', car: 'BR-2310-A4F1-2C26', kind: 'fire',          area: 1.6,  detected: '2026-04-27', confidence: 63, severity: 'medium', sat: 'MODIS'      },
  { id: 'A-2261', car: 'BR-2255-B6FA-7440', kind: 'deforestation', area: 4.7,  detected: '2026-04-22', confidence: 79, severity: 'medium', sat: 'PRODES'     },
];

// 30-day timeline of detected hectares per week (for spark/area chart)
const SEKURA_TIMELINE = [
  { wk: '01', def: 12, fire: 4, embargo: 0 },
  { wk: '02', def: 9,  fire: 7, embargo: 0 },
  { wk: '03', def: 22, fire: 11, embargo: 1 },
  { wk: '04', def: 31, fire: 6,  embargo: 1 },
  { wk: '05', def: 18, fire: 3,  embargo: 0 },
  { wk: '06', def: 26, fire: 9,  embargo: 2 },
  { wk: '07', def: 41, fire: 14, embargo: 1 },
  { wk: '08', def: 33, fire: 8,  embargo: 0 },
  { wk: '09', def: 28, fire: 5,  embargo: 1 },
  { wk: '10', def: 47, fire: 12, embargo: 0 },
  { wk: '11', def: 39, fire: 6,  embargo: 1 },
  { wk: '12', def: 52, fire: 18, embargo: 2 },
];

const SEKURA_I18N = {
  pt: {
    appName: 'Sekura', tagline: 'Monitoramento de garantias rurais',
    welcome: 'Bem-vindo, ', admin: 'analista',
    nav: { overview: 'Visão geral', map: 'Mapa', alerts: 'Alertas', detail: 'Propriedade' },
    metrics: { portfolio: 'Carteira total', cars: 'Total de CARs', alerts: 'Alertas ativos', exposure: 'Exposição total', breach: 'Em descumprimento', risk: 'Risco médio' },
    actions: { newQuery: 'Nova consulta', filters: 'Filtros', export: 'Exportar', search: 'Buscar' },
    table: { car: 'CAR', owner: 'Proprietário', cpf: 'CPF', muni: 'Município', area: 'Área', status: 'Situação', risk: 'Risco', alerts: 'Alertas', last: 'Última leitura' },
    status: { ok: 'Conforme', watch: 'Observação', breach: 'Em descumprimento' },
    regions: 'Regiões', region: 'Região',
    geoTitle: 'Distribuição geográfica',
    distTitle: 'Distribuição por região',
    detTitle: 'Detecções nas últimas 12 semanas',
    sources: 'Fontes',
    by: 'por',
    lastScan: 'Última varredura',
    biome: 'Bioma', crop: 'Cultura', loan: 'Saldo devedor',
    alertKinds: { deforestation: 'Desmatamento', fire: 'Foco de calor', embargo: 'Embargo IBAMA', overlap: 'Sobreposição CAR' },
    severity: { high: 'Alta', medium: 'Média', low: 'Baixa' },
    confidence: 'Confiança', detected: 'Detectado', area: 'Área', satellite: 'Fonte',
    triage: 'Triagem', open: 'Abrir', dismiss: 'Arquivar',
    portfolioPanel: 'Carteira', alertsPanel: 'Alertas', mapPanel: 'Cobertura',
    explore: 'Explorar', overlay: 'Camadas', legend: 'Legenda',
    forest: 'Floresta', pasture: 'Pasto', crop2: 'Lavoura', defl: 'Desmatado',
    queue: 'Fila de triagem', resolved: 'Resolvidos', sla: 'SLA',
    of: 'de',
  },
  es: {
    appName: 'Sekura', tagline: 'Monitoreo de garantías rurales',
    welcome: 'Bienvenido, ', admin: 'analista',
    nav: { overview: 'Resumen', map: 'Mapa', alerts: 'Alertas', detail: 'Propiedad' },
    metrics: { portfolio: 'Cartera total', cars: 'Total de CARs', alerts: 'Alertas activas', exposure: 'Exposición total', breach: 'En incumplimiento', risk: 'Riesgo medio' },
    actions: { newQuery: 'Nueva consulta', filters: 'Filtros', export: 'Exportar', search: 'Buscar' },
    table: { car: 'CAR', owner: 'Propietario', cpf: 'CPF', muni: 'Municipio', area: 'Área', status: 'Estado', risk: 'Riesgo', alerts: 'Alertas', last: 'Última lectura' },
    status: { ok: 'Conforme', watch: 'Observación', breach: 'Incumplimiento' },
    regions: 'Regiones', region: 'Región',
    geoTitle: 'Distribución geográfica',
    distTitle: 'Distribución por región',
    detTitle: 'Detecciones en las últimas 12 semanas',
    sources: 'Fuentes',
    by: 'por',
    lastScan: 'Último escaneo',
    biome: 'Bioma', crop: 'Cultivo', loan: 'Saldo deudor',
    alertKinds: { deforestation: 'Deforestación', fire: 'Foco de calor', embargo: 'Embargo IBAMA', overlap: 'Solapamiento CAR' },
    severity: { high: 'Alta', medium: 'Media', low: 'Baja' },
    confidence: 'Confianza', detected: 'Detectado', area: 'Área', satellite: 'Fuente',
    triage: 'Triaje', open: 'Abrir', dismiss: 'Archivar',
    portfolioPanel: 'Cartera', alertsPanel: 'Alertas', mapPanel: 'Cobertura',
    explore: 'Explorar', overlay: 'Capas', legend: 'Leyenda',
    forest: 'Bosque', pasture: 'Pasto', crop2: 'Cultivo', defl: 'Deforestado',
    queue: 'Cola de triaje', resolved: 'Resueltos', sla: 'SLA',
    of: 'de',
  },
  en: {
    appName: 'Sekura', tagline: 'Rural collateral monitoring',
    welcome: 'Welcome, ', admin: 'analyst',
    nav: { overview: 'Overview', map: 'Map', alerts: 'Alerts', detail: 'Property' },
    metrics: { portfolio: 'Total portfolio', cars: 'Total CARs', alerts: 'Active alerts', exposure: 'Total exposure', breach: 'In breach', risk: 'Avg. risk' },
    actions: { newQuery: 'New query', filters: 'Filters', export: 'Export', search: 'Search' },
    table: { car: 'CAR', owner: 'Owner', cpf: 'CPF', muni: 'Municipality', area: 'Area', status: 'Status', risk: 'Risk', alerts: 'Alerts', last: 'Last scan' },
    status: { ok: 'Compliant', watch: 'Watch', breach: 'In breach' },
    regions: 'Regions', region: 'Region',
    geoTitle: 'Geographic distribution',
    distTitle: 'Distribution by region',
    detTitle: 'Detections — last 12 weeks',
    sources: 'Sources',
    by: 'by',
    lastScan: 'Last scan',
    biome: 'Biome', crop: 'Crop', loan: 'Outstanding',
    alertKinds: { deforestation: 'Deforestation', fire: 'Heat anomaly', embargo: 'IBAMA embargo', overlap: 'CAR overlap' },
    severity: { high: 'High', medium: 'Medium', low: 'Low' },
    confidence: 'Confidence', detected: 'Detected', area: 'Area', satellite: 'Source',
    triage: 'Triage', open: 'Open', dismiss: 'Dismiss',
    portfolioPanel: 'Portfolio', alertsPanel: 'Alerts', mapPanel: 'Coverage',
    explore: 'Explore', overlay: 'Layers', legend: 'Legend',
    forest: 'Forest', pasture: 'Pasture', crop2: 'Crop', defl: 'Cleared',
    queue: 'Triage queue', resolved: 'Resolved', sla: 'SLA',
    of: 'of',
  },
};

// Number formatters
const sekuraFmt = {
  ha: (n, lang) => (lang === 'en' ? n.toLocaleString('en-US') : n.toLocaleString('pt-BR')) + ' ha',
  brl: (n, lang) => {
    const opts = { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 };
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : (lang === 'es' ? 'es-ES' : 'pt-BR'), opts).format(n);
  },
  int: (n, lang) => (lang === 'en' ? n.toLocaleString('en-US') : n.toLocaleString('pt-BR')),
  pct: (n) => n.toFixed(1) + '%',
};

// Aggregates
const SEKURA_AGG = {
  totalCars: SEKURA_PROPERTIES.length === 10 ? 1900 : SEKURA_PROPERTIES.length, // displayed total
  totalHa: 1_974_958,
  totalAlerts: 4280,
  exposureBrl: 1_847_200_000,
  breachCount: 287,
  avgRisk: 34,
};

Object.assign(window, {
  SEKURA_REGIONS, SEKURA_PROPERTIES, SEKURA_ALERTS, SEKURA_TIMELINE, SEKURA_I18N, SEKURA_AGG, sekuraFmt,
});
