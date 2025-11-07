// Toggle del menú móvil
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', function() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// --- DOM ---
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatBox = document.getElementById("chat-box");
const initialTime1 = document.getElementById("initial-time-1");
const menuItems = document.querySelectorAll('.menu-item');

// Hora inicial
initialTime1.textContent = getCurrentTime();

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

// Manejo de selección de menú
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remover clase activa de todos los elementos
        menuItems.forEach(i => i.classList.remove('active'));
        // Agregar clase activa al elemento clickeado
        this.classList.add('active');
        
        // Cerrar menú en móviles
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
        
        // Mostrar formulario correspondiente
        const calcType = this.getAttribute('data-calc');
        mostrarFormularioCalculo(calcType);
    });
});

// Función para mostrar formularios de cálculo
function mostrarFormularioCalculo(tipo) {
    // Limpiar chat
    chatBox.innerHTML = '';
    
    let formularioHTML = '';
    let titulo = '';
    
    switch(tipo) {
        case 'turbina':
            titulo = 'Cálculo de Potencia de Turbina';
            formularioHTML = `
                <div class="calc-form">
                    <h3>${titulo}</h3>
                    <div class="form-group">
                        <label for="d1">Diámetro entrada (pulgadas):</label>
                        <input type="number" id="d1" step="0.01" placeholder="Ej: 6">
                    </div>
                    <div class="form-group">
                        <label for="d2">Diámetro salida (pulgadas):</label>
                        <input type="number" id="d2" step="0.01" placeholder="Ej: 4">
                    </div>
                    <div class="form-group">
                        <label for="v1">Velocidad entrada (ft/s):</label>
                        <input type="number" id="v1" step="0.01" placeholder="Ej: 100">
                    </div>
                    <div class="form-group">
                        <label for="P1">Presión entrada (psia):</label>
                        <input type="number" id="P1" step="0.01" placeholder="Ej: 100">
                    </div>
                    <div class="form-group">
                        <label for="T1">Temperatura entrada (°F):</label>
                        <input type="number" id="T1" step="0.01" placeholder="Ej: 500">
                    </div>
                    <div class="form-group">
                        <label for="P2">Presión salida (psia):</label>
                        <input type="number" id="P2" step="0.01" placeholder="Ej: 20">
                    </div>
                    <div class="form-group">
                        <label for="T2">Temperatura salida (°F):</label>
                        <input type="number" id="T2" step="0.01" placeholder="Ej: 300">
                    </div>
                    <button class="calc-btn" onclick="calcularTurbina()">Calcular</button>
                    <div id="resultado-turbina" class="result-box" style="display:none;"></div>
                </div>
            `;
            break;
            
        case 'calor':
            titulo = 'Cálculo de Calor Transferido';
            formularioHTML = `
                <div class="calc-form">
                    <h3>${titulo}</h3>
                    <div class="form-group">
                        <label for="h1">Entalpía entrada (kJ/kg):</label>
                        <input type="number" id="h1" step="0.01" placeholder="Ej: 3000">
                    </div>
                    <div class="form-group">
                        <label for="h2">Entalpía salida (kJ/kg):</label>
                        <input type="number" id="h2" step="0.01" placeholder="Ej: 2500">
                    </div>
                    <div class="form-group">
                        <label for="v1_calor">Velocidad entrada (m/s):</label>
                        <input type="number" id="v1_calor" step="0.01" placeholder="Ej: 10">
                    </div>
                    <div class="form-group">
                        <label for="v2_calor">Velocidad salida (m/s):</label>
                        <input type="number" id="v2_calor" step="0.01" placeholder="Ej: 50">
                    </div>
                    <button class="calc-btn" onclick="calcularCalor()">Calcular</button>
                    <div id="resultado-calor" class="result-box" style="display:none;"></div>
                </div>
            `;
            break;
            
        case 'entalpia':
            titulo = 'Cálculo de Entalpía';
            formularioHTML = `
                <div class="calc-form">
                    <h3>${titulo}</h3>
                    <div class="form-group">
                        <label for="u">Energía interna específica (kJ/kg):</label>
                        <input type="number" id="u" step="0.01" placeholder="Ej: 2500">
                    </div>
                    <div class="form-group">
                        <label for="P_entalpia">Presión (kPa):</label>
                        <input type="number" id="P_entalpia" step="0.01" placeholder="Ej: 1000">
                    </div>
                    <div class="form-group">
                        <label for="v_entalpia">Volumen específico (cm³/g):</label>
                        <input type="number" id="v_entalpia" step="0.01" placeholder="Ej: 1.5">
                    </div>
                    <button class="calc-btn" onclick="calcularEntalpia()">Calcular</button>
                    <div id="resultado-entalpia" class="result-box" style="display:none;"></div>
                </div>
            `;
            break;
            
        case 'trabajo':
            titulo = 'Cálculo de Trabajo';
            formularioHTML = `
                <div class="calc-form">
                    <h3>${titulo}</h3>
                    <div class="form-group">
                        <label for="Q">Calor añadido (kJ):</label>
                        <input type="number" id="Q" step="0.01" placeholder="Ej: 100">
                    </div>
                    <div class="form-group">
                        <label for="delta_U">Cambio energía interna (kJ):</label>
                        <input type="number" id="delta_U" step="0.01" placeholder="Ej: 50">
                    </div>
                    <button class="calc-btn" onclick="calcularTrabajo()">Calcular</button>
                    <div id="resultado-trabajo" class="result-box" style="display:none;"></div>
                </div>
            `;
            break;
            
        case 'tobera':
            titulo = 'Cálculo de Tobera';
            formularioHTML = `
                <div class="calc-form">
                    <h3>${titulo}</h3>
                    <div class="form-group">
                        <label for="d1_tobera">Diámetro entrada (cm):</label>
                        <input type="number" id="d1_tobera" step="0.01" placeholder="Ej: 10">
                    </div>
                    <div class="form-group">
                        <label for="P1_tobera">Presión entrada (kPa):</label>
                        <input type="number" id="P1_tobera" step="0.01" placeholder="Ej: 500">
                    </div>
                    <div class="form-group">
                        <label for="T1_tobera">Temperatura entrada (°C):</label>
                        <input type="number" id="T1_tobera" step="0.01" placeholder="Ej: 200">
                    </div>
                    <div class="form-group">
                        <label for="P2_tobera">Presión salida (kPa):</label>
                        <input type="number" id="P2_tobera" step="0.01" placeholder="Ej: 100">
                    </div>
                    <div class="form-group">
                        <label for="T2_tobera">Temperatura salida (°C):</label>
                        <input type="number" id="T2_tobera" step="0.01" placeholder="Ej: 150">
                    </div>
                    <div class="form-group">
                        <label for="v1_tobera">Velocidad entrada (m/s):</label>
                        <input type="number" id="v1_tobera" step="0.01" placeholder="Ej: 50">
                    </div>
                    <div class="form-group">
                        <label for="h1_tobera">Entalpía entrada (kJ/kg):</label>
                        <input type="number" id="h1_tobera" step="0.01" placeholder="Ej: 3000">
                    </div>
                    <div class="form-group">
                        <label for="h2_tobera">Entalpía salida (kJ/kg):</label>
                        <input type="number" id="h2_tobera" step="0.01" placeholder="Ej: 2800">
                    </div>
                    <div class="form-group">
                        <label for="V_esp1">Volumen específico entrada (cm³/g):</label>
                        <input type="number" id="V_esp1" step="0.01" placeholder="Ej: 1.2">
                    </div>
                    <div class="form-group">
                        <label for="V_esp2">Volumen específico salida (cm³/g):</label>
                        <input type="number" id="V_esp2" step="0.01" placeholder="Ej: 2.5">
                    </div>
                    <button class="calc-btn" onclick="calcularTobera()">Calcular</button>
                    <div id="resultado-tobera" class="result-box" style="display:none;"></div>
                </div>
            `;
            break;
            
        case 'boquilla':
            titulo = 'Cálculo de Boquilla para Agua';
            formularioHTML = `
                <div class="calc-form">
                    <h3>${titulo}</h3>
                    <div class="form-group">
                        <label for="d1_boquilla">Diámetro entrada (cm):</label>
                        <input type="number" id="d1_boquilla" step="0.01" placeholder="Ej: 5">
                    </div>
                    <div class="form-group">
                        <label for="d2_boquilla">Diámetro salida (cm):</label>
                        <input type="number" id="d2_boquilla" step="0.01" placeholder="Ej: 2">
                    </div>
                    <div class="form-group">
                        <label for="tiempo">Tiempo para llenar (s):</label>
                        <input type="number" id="tiempo" step="0.01" placeholder="Ej: 30">
                    </div>
                    <div class="form-group">
                        <label for="volumen">Volumen a llenar (litros):</label>
                        <input type="number" id="volumen" step="0.01" placeholder="Ej: 10">
                    </div>
                    <button class="calc-btn" onclick="calcularBoquilla()">Calcular</button>
                    <div id="resultado-boquilla" class="result-box" style="display:none;"></div>
                </div>
            `;
            break;
            
        case 'compresion':
            titulo = 'Proceso de Compresión en Dos Etapas';
            formularioHTML = `
                <div class="calc-form">
                    <h3>${titulo}</h3>
                    <div class="form-group">
                        <label for="P1_comp">Presión inicial (bar):</label>
                        <input type="number" id="P1_comp" step="0.01" placeholder="Ej: 1">
                    </div>
                    <div class="form-group">
                        <label for="P2_comp">Presión final (bar):</label>
                        <input type="number" id="P2_comp" step="0.01" placeholder="Ej: 10">
                    </div>
                    <div class="form-group">
                        <label for="T_comp">Temperatura constante (°C):</label>
                        <input type="number" id="T_comp" step="0.01" placeholder="Ej: 25">
                    </div>
                    <button class="calc-btn" onclick="calcularCompresion()">Calcular</button>
                    <div id="resultado-compresion" class="result-box" style="display:none;"></div>
                </div>
            `;
            break;
            
        case 'piston':
            titulo = 'Cilindro-Pistón con Calentamiento Eléctrico';
            formularioHTML = `
                <div class="calc-form">
                    <h3>${titulo}</h3>
                    <div class="form-group">
                        <label for="m_piston">Masa de agua (g):</label>
                        <input type="number" id="m_piston" step="0.01" placeholder="Ej: 500">
                    </div>
                    <div class="form-group">
                        <label for="P_piston">Presión constante (kPa):</label>
                        <input type="number" id="P_piston" step="0.01" placeholder="Ej: 100">
                    </div>
                    <div class="form-group">
                        <label for="I">Corriente eléctrica (A):</label>
                        <input type="number" id="I" step="0.01" placeholder="Ej: 10">
                    </div>
                    <div class="form-group">
                        <label for="V_piston">Voltaje (V):</label>
                        <input type="number" id="V_piston" step="0.01" placeholder="Ej: 220">
                    </div>
                    <div class="form-group">
                        <label for="t_piston">Tiempo de operación (min):</label>
                        <input type="number" id="t_piston" step="0.01" placeholder="Ej: 5">
                    </div>
                    <div class="form-group">
                        <label for="Q_perdido">Calor perdido (kJ):</label>
                        <input type="number" id="Q_perdido" step="0.01" placeholder="Ej: 50">
                    </div>
                    <button class="calc-btn" onclick="calcularPiston()">Calcular</button>
                    <div id="resultado-piston" class="result-box" style="display:none;"></div>
                </div>
            `;
            break;
            
        default:
            formularioHTML = '<p>Selecciona un tipo de cálculo en la barra lateral.</p>';
    }
    
    // Mostrar mensaje con el formulario
    appendMessage(`<h3>${titulo}</h3>${formularioHTML}`, 'bot');
}

// Agrega mensaje al chat
function appendMessage(content, type='bot') {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", type === "user" ? "user-message" : "bot-message");

    const avatarDiv = document.createElement("div");
    avatarDiv.classList.add("avatar", type === "user" ? "user-avatar" : "bot-avatar");
    const avatarIcon = document.createElement("i");
    avatarIcon.className = type === "user" ? "fas fa-user" : "fas fa-robot";
    avatarDiv.appendChild(avatarIcon);

    const messageContent = document.createElement("div");
    messageContent.classList.add("message-content");
    messageContent.innerHTML = content;

    const timeDiv = document.createElement("div");
    timeDiv.classList.add("message-time");
    timeDiv.textContent = getCurrentTime();
    messageContent.appendChild(timeDiv);

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(messageContent);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// --- FUNCIONES DE CÁLCULO ---

// Turbina
function calcularTurbina() {
    try {
        const d1 = parseFloat(document.getElementById('d1').value) / 12; // pulgadas a pies
        const d2 = parseFloat(document.getElementById('d2').value) / 12;
        const v1 = parseFloat(document.getElementById('v1').value);
        const P1 = parseFloat(document.getElementById('P1').value);
        const T1 = parseFloat(document.getElementById('T1').value);
        const P2 = parseFloat(document.getElementById('P2').value);
        const T2 = parseFloat(document.getElementById('T2').value);
        
        // Conversión de unidades
        const P1_SI = P1 * 6894.76;
        const T1_SI = (T1 - 32) * 5/9 + 273.15;
        const P2_SI = P2 * 6894.76;
        const T2_SI = (T2 - 32) * 5/9 + 273.15;
        
        // En un entorno real, aquí se usaría CoolProp
        // Para esta demo, usaremos valores aproximados
        const h1 = 1500; // Valor de ejemplo
        const h2 = 1200; // Valor de ejemplo
        const vesp1 = 0.5; // Valor de ejemplo
        const vesp2 = 1.2; // Valor de ejemplo
        
        // Cálculos
        const A1 = Math.PI * Math.pow(d1 / 2, 2);
        const A2 = Math.PI * Math.pow(d2 / 2, 2);
        const rho1 = 1 / vesp1;
        const rho2 = 1 / vesp2;
        const v2 = (rho1 * A1 * v1) / (rho2 * A2);
        
        const mdot = rho1 * A1 * v1;
        const potencia = mdot * ((h1 - h2) + (Math.pow(v1, 2) - Math.pow(v2, 2)) / 2);
        const potenciaHP = potencia / 550;
        
        // Mostrar resultado
        const resultadoDiv = document.getElementById('resultado-turbina');
        resultadoDiv.innerHTML = `
            <h4>Resultados:</h4>
            <p>Velocidad de salida: <strong>${v2.toFixed(2)} ft/s</strong></p>
            <p>Potencia de salida: <strong>${potenciaHP.toFixed(2)} hp</strong></p>
        `;
        resultadoDiv.style.display = 'block';
    } catch (error) {
        alert('Error en los cálculos: ' + error.message);
    }
}

// Calor transferido
function calcularCalor() {
    try {
        const h1 = parseFloat(document.getElementById('h1').value);
        const h2 = parseFloat(document.getElementById('h2').value);
        const v1 = parseFloat(document.getElementById('v1_calor').value);
        const v2 = parseFloat(document.getElementById('v2_calor').value);
        
        const delta_energia_cinetica = (Math.pow(v2, 2) - Math.pow(v1, 2)) / 2 / 1000;
        const q = h2 - h1 + delta_energia_cinetica;
        
        const resultadoDiv = document.getElementById('resultado-calor');
        resultadoDiv.innerHTML = `
            <h4>Resultados:</h4>
            <p>Calor transferido por unidad de masa: <strong>${q.toFixed(2)} kJ/kg</strong></p>
        `;
        resultadoDiv.style.display = 'block';
    } catch (error) {
        alert('Error en los cálculos: ' + error.message);
    }
}

// Entalpía
function calcularEntalpia() {
    try {
        const u = parseFloat(document.getElementById('u').value);
        const P = parseFloat(document.getElementById('P_entalpia').value);
        const v = parseFloat(document.getElementById('v_entalpia').value);
        
        const v_m3_kg = v * 1e-3;
        const h = u + P * v_m3_kg;
        
        const resultadoDiv = document.getElementById('resultado-entalpia');
        resultadoDiv.innerHTML = `
            <h4>Resultados:</h4>
            <p>Entalpía específica: <strong>${h.toFixed(2)} kJ/kg</strong></p>
        `;
        resultadoDiv.style.display = 'block';
    } catch (error) {
        alert('Error en los cálculos: ' + error.message);
    }
}

// Trabajo
function calcularTrabajo() {
    try {
        const Q = parseFloat(document.getElementById('Q').value);
        const delta_U = parseFloat(document.getElementById('delta_U').value);
        
        const W = Q - delta_U;
        
        const resultadoDiv = document.getElementById('resultado-trabajo');
        resultadoDiv.innerHTML = `
            <h4>Resultados:</h4>
            <p>Energía transferida como trabajo: <strong>${W.toFixed(2)} kJ</strong></p>
        `;
        resultadoDiv.style.display = 'block';
    } catch (error) {
        alert('Error en los cálculos: ' + error.message);
    }
}

// Tobera
function calcularTobera() {
    try {
        const d1 = parseFloat(document.getElementById('d1_tobera').value);
        const P1 = parseFloat(document.getElementById('P1_tobera').value);
        const T1 = parseFloat(document.getElementById('T1_tobera').value);
        const P2 = parseFloat(document.getElementById('P2_tobera').value);
        const T2 = parseFloat(document.getElementById('T2_tobera').value);
        const v1 = parseFloat(document.getElementById('v1_tobera').value);
        const h1 = parseFloat(document.getElementById('h1_tobera').value) * 1000;
        const h2 = parseFloat(document.getElementById('h2_tobera').value) * 1000;
        const V_esp1 = parseFloat(document.getElementById('V_esp1').value) / 1000;
        const V_esp2 = parseFloat(document.getElementById('V_esp2').value) / 1000;
        
        const v2 = Math.sqrt(Math.pow(v1, 2) + 2 * (h1 - h2));
        const A1 = Math.PI * Math.pow(d1 / 100, 2) / 4;
        const A2 = A1 * (v1 * V_esp2) / (v2 * V_esp1);
        const d2 = Math.sqrt(4 * A2 / Math.PI) * 100;
        
        const resultadoDiv = document.getElementById('resultado-tobera');
        resultadoDiv.innerHTML = `
            <h4>Resultados:</h4>
            <p>Velocidad de salida: <strong>${v2.toFixed(2)} m/s</strong></p>
            <p>Diámetro de salida: <strong>${d2.toFixed(2)} cm</strong></p>
        `;
        resultadoDiv.style.display = 'block';
    } catch (error) {
        alert('Error en los cálculos: ' + error.message);
    }
}

// Boquilla
function calcularBoquilla() {
    try {
        const d1 = parseFloat(document.getElementById('d1_boquilla').value);
        const d2 = parseFloat(document.getElementById('d2_boquilla').value);
        const tiempo = parseFloat(document.getElementById('tiempo').value);
        const volumen = parseFloat(document.getElementById('volumen').value) / 1000;
        
        const Q = volumen / tiempo;
        const A1 = Math.PI * Math.pow(d1 / 100, 2) / 4;
        const A2 = Math.PI * Math.pow(d2 / 100, 2) / 4;
        const v1 = Q / A1;
        const v2 = Q / A2;
        const m_dot = 1000 * Q;
        
        const resultadoDiv = document.getElementById('resultado-boquilla');
        resultadoDiv.innerHTML = `
            <h4>Resultados:</h4>
            <p>Flujo volumétrico: <strong>${(Q * 1000).toFixed(2)} L/s</strong></p>
            <p>Flujo másico: <strong>${m_dot.toFixed(2)} kg/s</strong></p>
            <p>Velocidad de entrada: <strong>${v1.toFixed(2)} m/s</strong></p>
            <p>Velocidad de salida: <strong>${v2.toFixed(2)} m/s</strong></p>
        `;
        resultadoDiv.style.display = 'block';
    } catch (error) {
        alert('Error en los cálculos: ' + error.message);
    }
}

// Compresión
function calcularCompresion() {
    try {
        const P1 = parseFloat(document.getElementById('P1_comp').value);
        const P2 = parseFloat(document.getElementById('P2_comp').value);
        const T = parseFloat(document.getElementById('T_comp').value);
        
        const R = 8.314;
        const Cv = 5/2 * R;
        const Cp = 7/2 * R;
        const T_k = T + 273.15;
        const T_inter = T_k * (P2 / P1);
        
        const Q1 = Cv * (T_inter - T_k);
        const W1 = 0;
        const ΔU1 = Q1;
        
        const Q2 = Cp * (T_k - T_inter);
        const W2 = R * (T_k - T_inter);
        const ΔU2 = Cv * (T_k - T_inter);
        
        const resultadoDiv = document.getElementById('resultado-compresion');
        resultadoDiv.innerHTML = `
            <h4>Resultados:</h4>
            <p>Temperatura intermedia: <strong>${T_inter.toFixed(2)} K</strong></p>
            <p>Calor total: <strong>${(Q1 + Q2).toFixed(2)} J/mol</strong></p>
            <p>Trabajo total: <strong>${(W1 + W2).toFixed(2)} J/mol</strong></p>
            <p>Energía interna total: <strong>${(ΔU1 + ΔU2).toFixed(2)} J/mol</strong></p>
        `;
        resultadoDiv.style.display = 'block';
    } catch (error) {
        alert('Error en los cálculos: ' + error.message);
    }
}

// Cilindro-Pistón
function calcularPiston() {
    try {
        const m = parseFloat(document.getElementById('m_piston').value) / 1000;
        const P = parseFloat(document.getElementById('P_piston').value);
        const I = parseFloat(document.getElementById('I').value);
        const V = parseFloat(document.getElementById('V_piston').value);
        const t = parseFloat(document.getElementById('t_piston').value) * 60;
        const Q_perdido = parseFloat(document.getElementById('Q_perdido').value) * 1000;
        
        const Q_electrico = V * I * t;
        const Q_neto = Q_electrico - Q_perdido;
        
        const h1_vapor_sat = 2725.3;
        const h1_liquido_sat = 561.47;
        const h1 = h1_liquido_sat * 1000;
        const h2 = h1 + Q_neto / m;
        const h2_kJ = h2 / 1000;
        
        let estado = "";
        let calidad = "";
        
        if (h2_kJ > h1_vapor_sat) {
            estado = "Vapor sobrecalentado";
        } else if (h1_liquido_sat <= h2_kJ && h2_kJ <= h1_vapor_sat) {
            estado = "Mezcla líquido-vapor";
            const x = (h2_kJ - h1_liquido_sat) / (h1_vapor_sat - h1_liquido_sat);
            calidad = `Calidad: ${x.toFixed(3)}`;
        } else {
            estado = "Líquido subenfriado";
        }
        
        const resultadoDiv = document.getElementById('resultado-piston');
        resultadoDiv.innerHTML = `
            <h4>Resultados:</h4>
            <p>Calor eléctrico: <strong>${(Q_electrico / 1000).toFixed(2)} kJ</strong></p>
            <p>Calor neto: <strong>${(Q_neto / 1000).toFixed(2)} kJ</strong></p>
            <p>Entalpía final: <strong>${h2_kJ.toFixed(2)} kJ/kg</strong></p>
            <p>Estado final: <strong>${estado}</strong></p>
            ${calidad ? `<p>${calidad}</p>` : ''}
        `;
        resultadoDiv.style.display = 'block';
    } catch (error) {
        alert('Error en los cálculos: ' + error.message);
    }
}

// Inicializar mostrando el primer formulario
window.onload = function() {
    mostrarFormularioCalculo('turbina');
};