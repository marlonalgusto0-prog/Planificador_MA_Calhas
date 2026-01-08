const config = {
    boca: {
        title: "Boca de Lobo",
        inputs: ['D (Tubo)', 'd (Ramal)', 'h (Altura)', 'E (Espessura)'],
        svg: `<svg viewBox="0 0 200 150" width="160"><rect x="40" y="80" width="120" height="40" fill="#f0f0f0" stroke="#333"/><rect x="85" y="40" width="30" height="40" fill="#e0e0e0" stroke="#333"/><text x="20" y="105" font-size="12">D</text><text x="95" y="30" font-size="12">d</text><text x="130" y="60" font-size="12">h</text></svg>`
    },
    curva: {
        title: "Curva de Gomos",
        inputs: ['D (Diâmetro)', 'R (Raio)', 'α (Ângulo)', 'Nº Gomos'],
        svg: `<svg viewBox="0 0 200 150" width="160"><path d="M40,120 Q40,40 120,40" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="4"/><path d="M30,120 L50,120 L55,80 L90,45 L120,40 L120,25 L30,25 Z" fill="#f0f0f0" stroke="#333"/><text x="15" y="70" font-size="12">D</text></svg>`
    }
    // Adicionar outros conforme necessário
};

function openCalc(type) {
    const item = config[type];
    if (!item) return alert("Em desenvolvimento");

    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('calc-screen').style.display = 'block';
    
    document.getElementById('calc-title').innerText = item.title;
    document.getElementById('diagram-view').innerHTML = item.svg;

    let inputHtml = '';
    item.inputs.forEach(label => {
        inputHtml += `
            <div class="field">
                <label>${label}</label>
                <input type="number" step="0.01" placeholder="0.00">
            </div>`;
    });
    document.getElementById('inputs-container').innerHTML = inputHtml;
}

function goBack() {
    document.getElementById('home-screen').style.display = 'block';
    document.getElementById('calc-screen').style.display = 'none';
    document.getElementById('result-area').innerHTML = '';
}

function processarCalculo() {
    // Exemplo visual de saída de dados baseado na imagem 3
    const res = document.getElementById('result-area');
    res.innerHTML = `
        <h3 style="text-align:center">Planificação</h3>
        <div style="background:#eee; height:80px; margin:10px 0; border-radius:5px; border:1px dashed #999"></div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; font-family:monospace">
            <div><b>P</b> = 62.52</div><div><b>4</b> = 58.78</div>
            <div><b>A</b> = 5.21</div><div><b>5</b> = 57.72</div>
            <div><b>1</b> = 55.00</div><div><b>6</b> = 55.85</div>
        </div>
    `;
}
