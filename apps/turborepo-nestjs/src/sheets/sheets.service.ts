import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database-connection';
import * as schema from './schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class SheetsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async getSheets() {
    return this.database.query.sheets.findMany({
      with: { user: true, sheetsToCategories: true },
    });
  }

  async updateSheet(sheetId: number, sheet: typeof schema.sheets.$inferInsert) {
    return this.database
      .update(schema.sheets)
      .set(sheet)
      .where(eq(schema.sheets.id, sheetId))
      .returning();
  }

  async getSheet(sheetId: number) {
    return this.database.query.sheets.findFirst({
      where: eq(schema.sheets.id, sheetId),
    });
  }

  async createSheet(sheet: typeof schema.sheets.$inferInsert & { userId: number }, category?: string) {
    await this.database.transaction(async (tx) => {
      const sheets = await tx
        .insert(schema.sheets)
        .values(sheet)
        .returning({ id: schema.sheets.id });
      if (category) {
        const { id } = await this.categoriesService.createCategory(
          {
            name: category,
          },
          tx,
        );
        await this.categoriesService.addToSheet(
          {
            sheetId: sheets[0].id,
            categoryId: id,
          },
          tx,
        );
      }
    });
  }
}