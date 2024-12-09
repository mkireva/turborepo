import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SheetsService } from './sheets.service';
import { CreateSheetRequest } from '@repo/types';

@Controller('sheets')
export class SheetsController {
  constructor(private readonly sheetsService: SheetsService) {}

  @Get()
  async getSheets() {
    return this.sheetsService.getSheets();
  }

  @Patch(':id')
  async updateSheet(
    @Param('id') sheetId: string,
    @Body() request: { title: string; url: string },
  ) {
    return this.sheetsService.updateSheet(parseInt(sheetId), request);
  }

  @Get(':id')
  async getSheet(@Param('id') sheetId: string) {
    return this.sheetsService.getSheet(parseInt(sheetId));
  }

  @Post()
  async createSheet(@Body() request: CreateSheetRequest) {
    return this.sheetsService.createSheet(
      {
        title: request.title,
        url: request.url,
        ...(request.audio && { audio: request.audio }),
        ...(request.composer && { composer: request.composer }),
        ...(request.lyricist && { lyricist: request.lyricist }),
        ...(request.date && { date: request.date }),
        ...(request.location && { location: request.location }),
        ...(request.description && { description: request.description }),
        ...(request.key && { key: request.key }),
        ...(request.category && { category: request.category }),
        ...(request.genre && { genre: request.genre }),
        userId: request.userId,
      },
      request.category,
    );
  }
}
