export interface Student {
  readonly name: string;
  readonly age: number;
  readonly birthday: string;
  readonly sex: boolean;
  readonly mobile: string;
  readonly Class: object;
  readonly id?: number;
  readonly deletedAt?: number | null;
}
