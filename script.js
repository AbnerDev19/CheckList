import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc, onSnapshot, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyABu6AbsWN_IHKdaUP5y0t1u9aTxgRR6l8",
    authDomain: "check-8ea15.firebaseapp.com",
    projectId: "check-8ea15",
    storageBucket: "check-8ea15.firebasestorage.app",
    messagingSenderId: "922868309929",
    appId: "1:922868309929:web:66f27bbce8493849b22eb8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const equipmentCollection = collection(db, "equipments");

const team = [
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
    { name: "Canon 5d mark 3", category: "midia", subcategory: "Câmeras", status: "temos", personId: "", checked: false },
    { name: "Canon 80d", category: "midia", subcategory: "Câmeras", status: "temos", personId: "", checked: false },
    { name: "Canon 77d", category: "midia", subcategory: "Câmeras", status: "temos", personId: "", checked: false },
    { name: "Canon 70-300mm", category: "midia", subcategory: "Lentes", status: "temos", personId: "", checked: false },
    { name: "Canon 50mm 1.8", category: "midia", subcategory: "Lentes", status: "temos", personId: "", checked: false },
    { name: "Canon 50mm 1.8", category: "midia", subcategory: "Lentes", status: "temos", personId: "", checked: false },
    { name: "Canon sigma 70-300mm", category: "midia", subcategory: "Lentes", status: "temos", personId: "", checked: false },
    { name: "4 Bateria LEP6 Canon", category: "midia", subcategory: "Baterias", status: "temos", personId: "", checked: false },
    { name: "8 Pilhas AAA Recarregável", category: "midia", subcategory: "Baterias", status: "temos", personId: "", checked: false },
    { name: "3 carregadores de pilha AAA", category: "midia", subcategory: "Baterias", status: "temos", personId: "", checked: false },
    { name: "Computador do Eric", category: "midia", subcategory: "Computadores", status: "temos", personId: "2", checked: false },
    { name: "Computador do Abner", category: "midia", subcategory: "Computadores", status: "temos", personId: "10", checked: false },
    { name: "Notebook acer Matheus", category: "midia", subcategory: "Computadores", status: "temos", personId: "1", checked: false },
    { name: "3 Extensão 6 entradas 1,5m", category: "midia", subcategory: "Extensões", status: "temos", personId: "", checked: false },
    { name: "1 extensão 3 entradas 5m", category: "midia", subcategory: "Extensões", status: "temos", personId: "", checked: false },
    { name: "4 Cabo de rede 2m", category: "midia", subcategory: "Extras", status: "temos", personId: "", checked: false },
    { name: "3 Powerbank", category: "midia", subcategory: "Extras", status: "temos", personId: "", checked: false },
    { name: "2 colchão de solteiro", category: "midia", subcategory: "Extras", status: "temos", personId: "", checked: false },
    { name: "Behnriger x18", category: "som", subcategory: "Mesa de Som", status: "temos", personId: "", checked: false },
    { name: "Yamaha 01v96", category: "som", subcategory: "Mesa de Som", status: "temos", personId: "", checked: false },
    { name: "DYLAN QS 10", category: "som", subcategory: "Microfones", status: "temos", personId: "", checked: false },
    { name: "KADOSH K502M", category: "som", subcategory: "Microfones", status: "temos", personId: "", checked: false },
    { name: "KADOSH K2 (Com fio)", category: "som", subcategory: "Microfones", status: "temos", personId: "", checked: false },
    { name: "TECLADO ROLAND XPS 10", category: "som", subcategory: "Instrumentos", status: "temos", personId: "", checked: false },
    { name: "CONTRABAIXO IBANEZ", category: "som", subcategory: "Instrumentos", status: "temos", personId: "", checked: false },
    { name: "VIOLÃO TAKAMINE", category: "som", subcategory: "Instrumentos", status: "temos", personId: "", checked: false },
    { name: "BATERIA NAGANO", category: "som", subcategory: "Instrumentos", status: "temos", personId: "", checked: false },
    { name: "DBR DTX 12", category: "som", subcategory: "Caixas de Som", status: "temos", personId: "", checked: false },
    { name: "ONEAL RETORNO", category: "som", subcategory: "Caixas de Som", status: "temos", personId: "", checked: false },
    { name: "FRAHM GRT 12", category: "som", subcategory: "Caixas de Som", status: "temos", personId: "", checked: false },
    { name: "FRAHM GTR 12", category: "som", subcategory: "Caixas de Som", status: "temos", personId: "", checked: false },
    { name: "CICLOTRON TITANIUM 700A", category: "som", subcategory: "Caixas de Som", status: "temos", personId: "", checked: false },
    { name: "CICLOTRON TITANIUM 700A", category: "som", subcategory: "Caixas de Som", status: "temos", personId: "", checked: false },
    { name: "SUB CICLOTRON S18 A600", category: "som", subcategory: "Caixas de Som", status: "temos", personId: "", checked: false },
    { name: "SUB CICLOTRON S18 A600", category: "som", subcategory: "Caixas de Som", status: "temos", personId: "", checked: false },
    { name: "8 radinho", category: "som", subcategory: "Acessórios e Cabeamento", status: "temos", personId: "", checked: false },
    { name: "2 MEDUSA", category: "som", subcategory: "Acessórios e Cabeamento", status: "temos", personId: "", checked: false },
    { name: "10 cabos curtos (1m a 3m)", category: "som", subcategory: "Acessórios e Cabeamento", status: "temos", personId: "", checked: false },
    { name: "7 cabos longos (5m a 10m)", category: "som", subcategory: "Acessórios e Cabeamento", status: "temos", personId: "", checked: false },
    { name: "4 Cabos P10 - P10", category: "som", subcategory: "Acessórios e Cabeamento", status: "temos", personId: "", checked: false }
];

let equipment = [];

// Popular o Firebase automaticamente se estiver vazio
async function initializeDatabase() {
    const snapshot = await getDocs(equipmentCollection);
    if (snapshot.empty) {
        console.log("Banco de dados vazio. Populando itens base...");
        for (const item of defaultEquipment) {
            await addDoc(equipmentCollection, item);
        }
    }
}
initializeDatabase();

// Controle das Abas
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
        formSection.style.display = tabId === 'equipe' ? 'none' : 'block';
    });
});

// Equipe
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

// Renderização Dinâmica e Listeners do Firebase
function renderEquipmentList(category, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    
    const categoryItems = equipment.filter(item => item.category === category);
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
                <input type="checkbox" ${item.checked ? 'checked' : ''} id="check-${item.id}">
                <div class="item-details">
                    <span class="item-name">${item.name}</span>
                    <div class="item-badges">
                        <span class="badge ${item.status}">${item.status === 'temos' ? 'Temos' : 'Precisamos'}</span>
                        ${personName ? `<span class="badge resp-badge">${personName}</span>` : ''}
                    </div>
                </div>
                <button class="delete-btn" id="del-${item.id}">×</button>
            `;
            container.appendChild(li);

            document.getElementById(`check-${item.id}`).addEventListener('change', () => toggleEquipmentCheck(item.id, !item.checked));
            document.getElementById(`del-${item.id}`).addEventListener('click', () => deleteEquipment(item.id));
        });
    });
}

// Observador do Firebase
onSnapshot(equipmentCollection, (snapshot) => {
    equipment = [];
    snapshot.forEach((doc) => {
        equipment.push({ ...doc.data(), id: doc.id });
    });
    renderEquipmentList('midia', 'list-midia');
    renderEquipmentList('som', 'list-som');
});

// Adicionar novo item
document.getElementById('equipment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = 'Adicionando...';
    
    const newItem = {
        name: document.getElementById('eq-name').value,
        category: document.getElementById('eq-category').value,
        subcategory: "Novos",
        status: document.getElementById('eq-status').value,
        personId: document.getElementById('eq-person').value,
        checked: false
    };

    await addDoc(equipmentCollection, newItem);
    e.target.reset();
    btn.textContent = 'Adicionar';
});

// Atualizar e Deletar
async function toggleEquipmentCheck(id, newStatus) {
    const itemRef = doc(db, "equipments", id);
    await updateDoc(itemRef, { checked: newStatus });
}

async function deleteEquipment(id) {
    const itemRef = doc(db, "equipments", id);
    await deleteDoc(itemRef);
}

// Iniciar
populatePersonSelect();
renderTeamList();
