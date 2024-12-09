import { Module } from '@nestjs/common';
import { SheetsController } from './sheets.controller';
import { SheetsService } from './sheets.service';
import { DatabaseModule } from 'src/database/database.module';
import { CategoriesModule } from '../categories/categories.module';


@Module({
  imports: [DatabaseModule, CategoriesModule],
  controllers: [SheetsController],
  providers: [SheetsService],
  
})
export class SheetsModule {}
