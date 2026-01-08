const diagrams = {
    curva: `<svg viewBox="0 0 200 150" width="180"><path d="M40,130 Q40,40 130,40" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="4"/><path d="M30,130 L50,130 L50,100 L75,80 L100,65 L130,60 L130,40 L30,40 Z" fill="#e2e8f0" stroke="#333"/><text x="10" y="80" font-size="12">D</text><text x="80" y="145" font-size="12">R</text></svg>`,
    cotovelo: `<svg viewBox="0 0 200 150" width="180"><path d="M60,130 L120,130 L120,80 L80,40 L40,80 Z" fill="#e2e8f0" stroke="#333"/><text x="85" y="145" font-size="12">D</text><text x="35" y="110" font-size="12">h</text><path d="M120,80 A40,40 0 0 1 80,40" fill="none" stroke="red" stroke-width="1"/><text x="110" y="60" font-size="12">α</text></svg>`,
    boca: `<svg viewBox="0 0 200 150" width="180"><rect x="40" y="80" width="120" height="50" fill="#e2e8f0" stroke="#333"/><rect x="80" y="30" width="40" height="50" fill="#cbd5e1" stroke="#333"/><text x="25" y="110" font-size="12">D</text><text x="95" y="25" font-size="12">d</text></svg>`
};

let currentMode = 'curva';

function switchTab(mode) {
    currentMode = mode;
    document.body.setAttribute('data-mode', mode);
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${mode}`).classList.add('active');
    
    const titles = { curva: "Curva de Gomos", cotovelo: "Cotovelo", boca: "Boca de Lobo" };
    document.getElementById('app-title').innerText = titles[mode];
    document.getElementById('main-diagram').innerHTML = diagrams[mode];
    document.getElementById('result-section').style.display = 'none';
}

// Inicializar
switchTab('curva');

function calcular() {
    const D = parseFloat(document.getElementById('val-D').value);
    const div = parseInt(document.getElementById('val-div').value);
    const resultSection = document.getElementById('result-section');
    const table = document.getElementById('results-table');

    if (!D || !div) return alert("Preencha os dados básicos!");

    let alturas = [];
    const perimetro = Math.PI * D;
    const incremento = perimetro / div;

    if (currentMode === 'boca') {
        const d = parseFloat(document.getElementById('val-d').value);
        const h = parseFloat(document.getElementById('val-h').value);
        const R = D / 2;
        const r = d / 2;
        for (let i = 0; i <= div; i++) {
            let ang = (360 / div) * i * (Math.PI / 180);
            let y = h - (R - Math.sqrt(R * R - Math.pow(r * Math.sin(ang), 2)));
            alturas.push(y);
        }
    } else {
        // Lógica simplificada para Curva/Cotovelo
        const angTotal = parseFloat(document.getElementById('val-a').value) || 90;
        const rad = (angTotal / 2) * (Math.PI / 180);
        for (let i = 0; i <= div; i++) {
            let angDiv = (360 / div) * i * (Math.PI / 180);
            let y = (D / 2) * Math.cos(angDiv) * Math.tan(rad) + (D/2);
            alturas.push(y);
        }
    }

    // Gerar Tabela
    let html = `<div><b>P:</b> ${perimetro.toFixed(2)}</div><div><b>A:</b> ${incremento.toFixed(2)}</div>`;
    alturas.forEach((alt, i) => {
        if (i <= div/2) html += `<div><b>Pt ${i+1}:</b> ${alt.toFixed(2)}</div>`;
    });
    table.innerHTML = html;

    // Gerar Gráfico de Planificação
    gerarPlanificacao(alturas, perimetro, div);
    resultSection.style.display = 'block';
}

function gerarPlanificacao(pontos, P, div) {
    const w = 300, h = 120;
    const step = w / div;
    const maxVal = Math.max(...pontos);
    const scale = 80 / maxVal;

    let path = `M 0 ${h - pontos[0] * scale}`;
    let labels = "";
    
    pontos.forEach((p, i) => {
        let x = i * step;
        let y = h - p * scale;
        path += ` L ${x} ${y}`;
        if (i % 2 === 0) labels += `<text x="${x}" y="${h+15}" font-size="8">${i+1}</text>`;
    });

    document.getElementById('plan-visual').innerHTML = `
        <svg viewBox="0 -10 ${w} ${h+30}" width="100%">
            <path d="${path}" fill="none" stroke="#3b82f6" stroke-width="2"/>
            <line x1="0" y1="${h}" x2="${w}" y2="${h}" stroke="#333" />
            ${labels}
        </svg>`;
}
