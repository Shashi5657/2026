import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { catsService } from './cats/cats.service';

@Module({
  imports: [CatsModule],
  controllers: [AppController, CatsController],
  providers: [AppService, catsService],
})
export class AppModule {}
