import type IContato from "@/interface/IContato";

async function obterDadosURL<T>(url: string) {
    const resposta = await fetch(url);
    if (!resposta.ok) {
        throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText}`)
    }
    return resposta.json() as T;
}

export async function getContatos() {
    const contatos = await obterDadosURL<IContato[]>('https://gist.githubusercontent.com/meyreanusia/96aaa7d365564c653a23f2a90b5ad7b4/raw/08ff7bb7a62c15f27554daaaacb4029c1f02bfdb/contatos.json');
    let contatosExistentes = obterContatosLocalStorage();
    if (contatosExistentes.length === 0) {
        localStorage.setItem('contatos', JSON.stringify(contatos));
        contatosExistentes = obterContatosLocalStorage();
    }
    return contatosExistentes;
}

export const adicionarContato = (contato: IContato) => {
    const contatoCopia = { ...contato };
    const contatos = JSON.parse(localStorage.getItem('contatos') || '[]') as IContato[];
    contatos.push(contatoCopia);
    localStorage.setItem('contatos', JSON.stringify(contatos));
};

export const obterContatosLocalStorage = (): IContato[] => {
    return JSON.parse(localStorage.getItem('contatos') || '[]') as IContato[];
};


export const excluirContato = (nome: string) => {
    const contatos = obterContatosLocalStorage();
    const novosContatos = contatos.filter(contato => contato.nome !== nome);
    localStorage.setItem('contatos', JSON.stringify(novosContatos));
};

export const editarContato = (contatoEditado: IContato) => {
    const contatos = obterContatosLocalStorage();

    const novosContatos = contatos.map(contato => {
        const idIgual = contato.id === contatoEditado.id;
        contato.id === contatoEditado.id ? contatoEditado : contato
        return idIgual ? contatoEditado : contato;
    });
    console.log(novosContatos);

    localStorage.setItem('contatos', JSON.stringify(novosContatos));
};