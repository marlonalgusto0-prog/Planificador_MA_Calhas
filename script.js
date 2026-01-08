let currentMode = 'boca';

function switchTab(mode) {
    currentMode = mode;
    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('app-title').innerText = event.target.innerText;
}

function calcular() {
    const D = parseFloat(document.getElementById('diam_D').value);
    const d = parseFloat(document.getElementById('diam_d').value);
    const h = parseFloat(document.getElementById('altura').value);
    
    if (!D || !d || !h) {
        alert("Preencha os valores de D, d e h");
        return;
    }

    const div = 12; // Padrão de 12 divisões para o gabarito
    const R = D / 2;
    const r = d / 2;
    const P = Math.PI * d; // Perímetro
    const A = P / div;    // Distância entre divisões

    let pontos = [];
    let htmlResultados = `<div class="res-item"><b>P</b> = ${P.toFixed(2)}</div>`;
    htmlResultados += `<div class="res-item"><b>A</b> = ${A.toFixed(2)}</div>`;

    // Cálculo das ordenadas (alturas) para Boca de Lobo 90°
    // Fórmula: y = h - (R - sqrt(R² - (r * sen(θ))²))
    for (let i = 0; i <= div; i++) {
        const anguloGraus = (360 / div) * i;
        const rad = anguloGraus * (Math.PI / 180);
        
        const yBase = Math.sqrt(Math.pow(R, 2) - Math.pow(r * Math.sin(rad), 2));
        const alturaPonto = h - (R - yBase);
        pontos.push(alturaPonto);

        // Apenas para mostrar do ponto 1 ao 7 (simetria) como na imagem
        if (i <= 6) {
            htmlResultados += `<div class="res-item"><b>${i + 1}</b> = ${alturaPonto.toFixed(2)}</div>`;
        }
    }

    exibirDesenho(pontos, P, div);
    document.getElementById('numerical-results').innerHTML = htmlResultados;
    document.getElementById('result-container').style.display = 'block';
}

function exibirDesenho(pontos, perimetro, div) {
    const larguraImg = 350;
    const alturaImg = 150;
    const espacamentoX = larguraImg / div;
    
    // Encontrar escala para o desenho caber no SVG
    const maxH = Math.max(...pontos);
    const minH = Math.min(...pontos);
    const escalaY = 60 / (maxH || 1); 

    let pathD = `M 0 ${alturaImg - (pontos[0] * escalaY)}`;
    let linhasVerticais = '';
    let textos = '';

    for (let i = 0; i <= div; i++) {
        const x = i * espacamentoX;
        const y = alturaImg - (pontos[i] * escalaY);
        
        pathD += ` L ${x} ${y}`;
        
        // Linhas verticais do gabarito
        linhasVerticais += `<line x1="${x}" y1="${alturaImg}" x2="${x}" y2="${y}" stroke="#ccc" stroke-width="1" />`;
        
        // Números 1, 2, 3...
        if (i <= 6) {
            textos += `<text x="${x}" y="${alturaImg + 15}" font-size="10" text-anchor="middle">${i+1}</text>`;
        }
    }

    const svgHTML = `
        <svg viewBox="-10 -20 ${larguraImg + 20} ${alturaImg + 40}" width="100%">
            <line x1="0" y1="${alturaImg}" x2="${larguraImg}" y2="${alturaImg}" stroke="black" stroke-width="2" />
            <path d="${pathD}" fill="none" stroke="blue" stroke-width="2" />
            ${linhasVerticais}
            ${textos}
            <text x="${larguraImg/2}" y="${alturaImg + 35}" font-size="12" text-anchor="middle" font-weight="bold">P = ${perimetro.toFixed(2)}</text>
        </svg>
    `;

    document.getElementById('svg-area').innerHTML = svgHTML;
}

