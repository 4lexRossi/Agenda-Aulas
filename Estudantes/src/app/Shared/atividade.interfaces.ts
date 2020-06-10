export interface Atividade {
  id: string;
  nome: string;
  descricao: string;

}

export interface BaseResponse<T> {
  data: T;
  notifications: string[];
}
