import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post()
  create(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.create(createShoppingCartDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoppingCartService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShoppingCartDto: UpdateShoppingCartDto,
  ) {
    return this.shoppingCartService.update(updateShoppingCartDto);
  }
}
