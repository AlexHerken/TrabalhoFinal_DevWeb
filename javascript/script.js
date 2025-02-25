const form = document.getElementById('horasForm');
const resumo = document.getElementById('resumo');
const categoriaSelect = document.getElementById('categoria');
const tipoSelect = document.getElementById('tipo');

const opcoesTipo = {
    Ensino: [
        "Estágio Extracurricular", "Monitoria", "Concursos e campeonatos de atividades acadêmicas", 
        "Presença comprovada a defesas de TCC do curso de Engenharia de Computação", 
        "Cursos Profissionalizantes Específicos na área", "Cursos Profissionalizantes em geral"
    ],
    Extensão: [
        "Projeto de extensão", "Atividades culturais", "Visitas Técnicas", "Visitas a Feiras e Exposições", "Cursos de Idiomas", "Palestras, Seminários e Congressos Extensionistas(Ouvinte)",
        "Palestras, Seminários e Congressos Extensionistas (apresentador)", "Projeto Empresa Júnior"
    ],
    Pesquisa: [
        "Iniciação científica", "Publicação de artigos em periódicos científicos", "Publicação de artigos completos em anais de congressos", "Publicação de capítulo de livro",
        "Publicação de resumos de artigos em anais", "Registro de patentes como auto/coautor", "Premiação resultante de pesquisa científica", "Colaborador em atividades como Seminários e Congressos",
        "Palestras, Seminários e Congressos de Pesquisa (ouvinte)", "Palestras, Seminários e Congressos de Pesquisa (apresentador)"
    ]
};

function atualizarOpcoesTipo() {
    if (!categoriaSelect || !tipoSelect) return;
    const categoria = categoriaSelect.value;
    tipoSelect.innerHTML = '';

    console.log("Categoria selecionada:", categoria);
    if (opcoesTipo[categoria]) {
        opcoesTipo[categoria].forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo;
            option.textContent = tipo;
            tipoSelect.appendChild(option);
        });
    }
    console.log("Opções carregadas:", Array.from(tipoSelect.options).map(opt => opt.value));
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarOpcoesTipo(); // Garante que as opções do tipo sejam carregadas inicialmente
    categoriaSelect.addEventListener('change', atualizarOpcoesTipo);
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const descricao = document.getElementById('descricao').value;
    const categoria = categoriaSelect.value;
    const tipo = tipoSelect.value;
    let horas = parseInt(document.getElementById('horas').value);
    
    try {
        await addDoc(collection(db, "atividades"), {
            descricao,
            categoria,
            tipo,
            horas,
            timestamp: new Date()
        });
        alert("Atividade salva com sucesso!");
        form.reset();
        atualizarOpcoesTipo();
    } catch (error) {
        alert("Erro ao salvar atividade!");
        console.error(error);
    }
});
