import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyABu6AbsWN_IHKdaUP5y0t1u9aTxgRR6l8",
    authDomain: "check-8ea15.firebaseapp.com",
    projectId: "check-8ea15",
    storageBucket: "check-8ea15.firebasestorage.app",
    messagingSenderId: "922868309929",
    appId: "1:922868309929:web:66f27bbce8493849b22eb8",
    measurementId: "G-7407JREWHE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const equipmentCollection = collection(db, "equipments");

// ... restante da lógica da equipe e das abas que geramos anteriormente

// Dados Iniciais (Carregados caso o localStorage esteja vazio)
const defaultTeam = [
    { id: 1, name: "Matheus Rodrigues", role: "Líder Mídia" },
    { id: 2, name: "Éric Esdras", role: "Líder Mídia" },
    { id: 3, name: "Daiara Silva", role: "Líder Comunicação" },
    { id: 4, name: "Letícia Costa", role: "Social Media" },
    { id: 5, name: "Lorrana Cristina", role: "Storymaker" },
    { id: 6, name: "Gabriel Vitor", role: "Videomaker" },
    { id: 7, name: "Gabriel de Jesus", role: "Videomaker" },
    { id: 8, name: "Giovana Moura", role: "Repórter" },
    { id: 9, name: "Gabriel Matos", role: "Técnico de Som" },
    { id: 10, name: "Abner Oliveira", role: "Técnico de Som" }
];

const defaultEquipment = [
    // Mídia
    { id: 1, name: "Canon 5d mark 3", category: "midia", subcategory: "Câmeras", status: "temos", personId: "", checked: false },
    { id: 2, name: "Canon 80d", category: "midia", subcategory: "Câmeras", status: "temos", personId: "", checked: false },
    { id: 3, name: "Canon 77d", category: "midia", subcategory: "Câmeras", status: "temos", personId: "", checked: false },
    { id: 4, name: "Canon 70-300mm", category: "midia", subcategory: "Lentes", status: "temos", personId: "", checked: false },
    { id: 5, name: "Canon 50mm 1.8", category: "midia", subcategory: "Lentes", status: "temos", personId: "", checked: false },
    { id: 6, name: "Canon 50mm 1.8", category: "midia", subcategory: "Lentes", status: "temos", personId: "", checked: false },
    { id: 7, name: "Canon sigma 70-300mm", category: "midia", subcategory: "Lentes", status: "temos", personId: "", checked: false },
    { id: 8, name: "4 Bateria LEP6 Canon", category: "midia", subcategory: "Baterias", status: "temos", personId: "", checked: false },
    { id: 9, name: "8 Pilhas AAA Recarregável", category: "midia", subcategory: "Baterias", status: "temos", personId: "", checked: false },
    { id: 10, name: "3 carregadores de pilha AAA", category: "midia", subcategory: "Baterias", status: "temos", personId: "", checked: false },
    { id: 11, name: "Computador do Eric", category: "midia", subcategory: "Computadores", status: "temos", personId: "2", checked: false },
    { id: 12, name: "Computador do Abner", category: "midia", subcategory: "Computadores", status: "temos", personId: "10", checked: false },
    { id: 13, name: "Notebook acer Matheus", category: "midia", subcategory: "Computadores", status: "temos", personId: "1", checked: false },
    { id: 14, name: "3 Extensão 6 entradas 1,5m", category: "midia", subcategory: "Extensões", status: "temos", personId: "", checked: false },
    { id: 15, name: "1 extensão 3 entradas 5m", category: "midia", subcategory: "Extensões", status: "temos", personId: "", checked: false },
    { id: 16, name: "4 Cabo de rede 2m", category: "midia", subcategory: "Extras", status: "temos", personId: "", checked: false },
    { id: 17, name: "3 Powerbank", category: "midia", subcategory: "Extras", status: "temos", personId: "", checked: false },
    { id: 18, name: "2 colchão de solteiro", category: "midia", subcategory: "Extras", status: "temos", personId: "", checked: false },

    // Som
    { id: 19, name: "Behnriger x18", category: "som", subcategory: "Mesa de Som", status: "temos", personId: "", checked: false },
    { id: 20, name: "Yamaha 01v96", category: "som", subcategory: "Mesa de Som", status: "temos", personId: "", checked: false },
    { id: 21, name: "DYLAN QS 10", category: "som", subcategory: "Microfones", status: "temos", personId: "", checked: false },
    { id: 22, name: "KADOSH K502M", category: "som", subcategory: "Microfones", status: "temos", personId: "", checked: false },
    { id: 23, name: "KADOSH K2 (Com fio)", category: "som", subcategory: "Microfones", status: "temos", personId: "", checked: false },
    { id: 24, name: "TECLADO ROLAND XPS 10", category: "som", subcategory: "Instrumentos", status: "temos", personId: "", checked: false },
    { id: 25, name: "CONTRABAIXO IBANEZ", category: "som", subcategory: "Instrumentos", status: "temos", personId: "", checked: false },
    { id: 26, name: "VIOLÃO TAKAMINE", category: "som", subcategory: "Instrumentos", status: "temos", personId: "", checked: false },
    { id: 27, name: "BATERIA NAGANO", category: "som", subcategory: "Instrumentos", status: "temos", personId: "", checked: false },
    { id: 28, name: "DBR DTX 12", category: "som", subcategory: "Caixas de Som", status: "temos", personId: "", checked: false },
    { id: 29, name: "ONEAL RETORNO", category: "som", subcategory: "Caixas de Som", status: "temos", personId: "", checked: false },
    { id: 30, name: "FRAHM GRT 12", category: "som", subcategory: "Caixas de Som", status: "temos", personId: "", checked: false },
    { id: 31, name: "FRAHM GTR 12", category: "som", subcategory: "Caixas de Som", status: "temos", personId: "", checked: false },
    { id: 32, name: "CICLOTRON TITANIUM 700A", category: "som", subcategory: "Caixas de Som", status: "temos", personId: "", checked: false },
    { id: 33, name: "CICLOTRON TITANIUM 700A", category: "som", subcategory: "Caixas de Som", status: "temos", personId: "", checked: false },
    { id: 34, name: "SUB CICLOTRON S18 A600", category: "som", subcategory: "Caixas de Som", status: "temos", personId: "", checked: false },
    { id: 35, name: "SUB CICLOTRON S18 A600", category: "som", subcategory: "Caixas de Som", status: "temos", personId: "", checked: false },
    { id: 36, name: "8 radinho", category: "som", subcategory: "Acessórios e Cabeamento", status: "temos", personId: "", checked: false },
    { id: 37, name: "2 MEDUSA", category: "som", subcategory: "Acessórios e Cabeamento", status: "temos", personId: "", checked: false },
    { id: 38, name: "10 cabos curtos (1m a 3m)", category: "som", subcategory: "Acessórios e Cabeamento", status: "temos", personId: "", checked: false },
    { id: 39, name: "7 cabos longos (5m a 10m)", category: "som", subcategory: "Acessórios e Cabeamento", status: "temos", personId: "", checked: false },
    { id: 40, name: "4 Cabos P10 - P10", category: "som", subcategory: "Acessórios e Cabeamento", status: "temos", personId: "", checked: false }
];

// Inicialização e Controle de Estado
let team = JSON.parse(localStorage.getItem('av_team')) || defaultTeam;
let equipment = JSON.parse(localStorage.getItem('av_equipment')) || defaultEquipment;

if (!localStorage.getItem('av_team')) localStorage.setItem('av_team', JSON.stringify(team));
if (!localStorage.getItem('av_equipment')) localStorage.setItem('av_equipment', JSON.stringify(equipment));

// Sistema de Abas
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const formSection = document.getElementById('form-section');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');

        // Esconde o formulário na aba de equipe
        formSection.style.display = tabId === 'equipe' ? 'none' : 'block';
    });
});

// Preencher o select de responsáveis no formulário
function populatePersonSelect() {
    const select = document.getElementById('eq-person');
    select.innerHTML = '<option value="">Sem responsável</option>';
    team.forEach(person => {
        const option = document.createElement('option');
        option.value = person.id;
        option.textContent = person.name;
        select.appendChild(option);
    });
}

function getPersonName(id) {
    const person = team.find(p => p.id == id);
    return person ? person.name : '';
}

// Renderizar Equipamentos agrupados por Subcategoria
function renderEquipmentList(category, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';

    const categoryItems = equipment.filter(item => item.category === category);

    // Extrai subcategorias únicas
    const subcategories = [...new Set(categoryItems.map(item => item.subcategory))];

    subcategories.forEach(sub => {
                const subHeader = document.createElement('div');
                subHeader.className = 'subcategory-title';
                subHeader.textContent = sub || 'Outros';
                container.appendChild(subHeader);

                const itemsInSub = categoryItems.filter(item => item.subcategory === sub);

                itemsInSub.forEach(item => {
                            const li = document.createElement('li');
                            li.className = `list-item ${item.checked ? 'checked' : ''}`;

                            const personName = getPersonName(item.personId);

                            li.innerHTML = `
                <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="toggleEquipmentCheck(${item.id})">
                <div class="item-details">
                    <span class="item-name">${item.name}</span>
                    <div class="item-badges">
                        <span class="badge ${item.status}">${item.status === 'temos' ? 'Temos' : 'Precisamos'}</span>
                        ${personName ? `<span class="badge resp-badge">${personName}</span>` : ''}
                    </div>
                </div>
                <button class="delete-btn" onclick="deleteEquipment(${item.id})">×</button>
            `;
            container.appendChild(li);
        });
    });
}

// Renderizar Equipe
function renderTeamList() {
    const container = document.getElementById('list-equipe');
    container.innerHTML = '';
    
    team.forEach(person => {
        const li = document.createElement('li');
        li.className = 'list-item';
        li.innerHTML = `
            <div class="item-details">
                <span class="item-name">${person.name}</span>
                <span class="team-role">${person.role}</span>
            </div>
        `;
        container.appendChild(li);
    });
}

// Funções de Ação (Adicionar, Checar, Deletar)
document.getElementById('equipment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newItem = {
        id: Date.now(),
        name: document.getElementById('eq-name').value,
        category: document.getElementById('eq-category').value,
        subcategory: "Novos",
        status: document.getElementById('eq-status').value,
        personId: document.getElementById('eq-person').value,
        checked: false
    };

    equipment.push(newItem);
    saveAndRender();
    e.target.reset();
});

window.toggleEquipmentCheck = (id) => {
    const item = equipment.find(i => i.id === id);
    if(item) {
        item.checked = !item.checked;
        saveAndRender();
    }
};

window.deleteEquipment = (id) => {
    equipment = equipment.filter(i => i.id !== id);
    saveAndRender();
};

function saveAndRender() {
    localStorage.setItem('av_equipment', JSON.stringify(equipment));
    renderEquipmentList('midia', 'list-midia');
    renderEquipmentList('som', 'list-som');
}

// Iniciar Aplicação
populatePersonSelect();
renderEquipmentList('midia', 'list-midia');
renderEquipmentList('som', 'list-som');
renderTeamList();
