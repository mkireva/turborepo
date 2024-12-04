import { Module } from '@nestjs/common';
import { SheetsModule } from './sheets/sheets.module';


@Module({
  imports: [SheetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
