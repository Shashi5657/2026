import { DynamicModule, Module } from '@nestjs/common';
import { catsService } from './cats.service';
import { CatsController } from './cats.controller';

@Module({
  controllers: [CatsController],
  providers: [catsService],
})
export class CatsModule {}

//dynamic module
// @Module({})
// export class DatabaseModule{
//     static forRoot(options): DynamicModule{
//         return {
//             module: DatabaseModule,
//             providers: [
//                 {
//                     provide: 'DB_OPTIONS',
//                     useValue: options
//                 },
//                 DatabaseService,
//             ],
//             exports: [DatabaseService]
//         }

//     }
// }
