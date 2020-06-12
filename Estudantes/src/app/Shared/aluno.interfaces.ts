
export interface Aluno {
  id: string;
  nome: string;
  nomeResponsavel: string;
  dataNascimento: string;
  turma:string;
  sexo: string;
  email: string;
  atividades: Atividade[];

}
export interface BaseResponse<T> {
  data: T;
  notifications: string[];
}

export interface Atividade {
  nome: string;
  id: string;
  descricao: string;

}
