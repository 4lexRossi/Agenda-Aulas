export interface Atividade {
  nome: string;
  id: string;
  descricao: string;

}

export interface BaseResponse<T> {
  data: T;
  notifications: string[];
}
