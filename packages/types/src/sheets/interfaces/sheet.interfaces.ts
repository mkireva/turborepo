import { CreateSheetRequest } from "../dto/create-sheet.request";

export interface Sheet extends CreateSheetRequest {
    id: string;
    title: string;
    year: number;
}