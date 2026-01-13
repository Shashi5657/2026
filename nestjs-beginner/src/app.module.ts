import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { catsService } from './cats/cats.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { NestFactory } from '@nestjs/core';

@Module({
  imports: [CatsModule],
  controllers: [AppController, CatsController],
  providers: [AppService, catsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(LoggerMiddleware)
    //   .exclude({path: 'cats', method: RequestMethod.GET})
    //   .forRoutes({ path: 'abcd/{*splat  }', method: RequestMethod.GET });

    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'cat', method: RequestMethod.POST })
      .forRoutes(CatsController);
  }
}

// const app = NestFactory.create(AppModule);

// app.use(LoggerMiddleware);
