import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { User2Module } from './user2/user2.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './warehouse/Auth/auth.module';

@Module({
  imports: [AdminModule, WarehouseModule, User2Module, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }
  ), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
