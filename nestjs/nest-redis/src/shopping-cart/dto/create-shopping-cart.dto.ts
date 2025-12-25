export class CreateShoppingCartDto {
  userId: number;

  cartData: Record<string, number> & { count: number };
}
