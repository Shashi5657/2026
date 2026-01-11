import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { catsService } from './cats.service';

//This is @controller decarator reqiure to define a basic controller
@Controller('cats')

//GET /cats
export class CatsController {
  constructor(private catsService: catsService) {}
  //The @Get() HTTP request method decorator
  @Get()
  //to redirect we can use this decarator
  @Redirect('https://nestjs.com', 302)
  // @Req decarator - will give access to the request object
  findAll(@Req() request: Request) {
    return this.catsService.findAll();
  }

  //@Post() HTTP request method decarator
  @Post()
  // @Header('Cache-control', 'no-store')
  //change the behaviour of the status code using this decarator
  // @HttpCode(204)
  async create(@Body() createDto: CreateCatDto) {
    this.catsService.create(createDto);
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}

//sub-domain routing
@Controller({ host: 'admin.mydomain.com' })
export class adminExample {
  @Get()
  index(): string {
    return 'Admin page';
  }

  //async function always returns promises
  @Get()
  async findAll(): Promise<any[]> {
    return [];
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return 'this action adds a new cat';
  }

  @Get()
  async findAllByFilter(
    @Query('age') age: number,
    @Query('breed') breed: string,
  ) {
    return 'This returns filtered results';
  }
}
