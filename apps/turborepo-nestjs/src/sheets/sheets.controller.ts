import {Body, Controller, Get, Post} from '@nestjs/common';
import { SheetsService } from './sheets.service';
import { CreateSheetRequest } from '@repo/types';
@Controller('sheets')
export class SheetsController {
  constructor(private readonly sheetsService: SheetsService) {}

  @Post()
  async createSheet(@Body() createSheetRequest: CreateSheetRequest) {
    return this.sheetsService.createSheet(createSheetRequest);
  }

  @Get()
  getSheets() {
    return this.sheetsService.getSheets();
  }
}
