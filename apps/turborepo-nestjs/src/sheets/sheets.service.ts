import { Injectable } from '@nestjs/common';
import { CreateSheetRequest, Sheet } from '@repo/types';

@Injectable()
export class SheetsService {
  private readonly sheets = [];
  createSheet(createSheetRequest: CreateSheetRequest) {
    const sheet: Sheet = {
      ...createSheetRequest,
      id: Math.random().toString(36).substring(7),
    };
    this.sheets.push(sheet);
    return sheet;
  }
  getSheets() {
    return this.sheets;
  }
}
