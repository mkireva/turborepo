export class CreateSheetRequest {
  title: string;
  url: string;
  audio?: {
    vocal?: {
      url: string;
      description: string;
    };
    instrumental?: {
      url: string;
      description: string;
    };
  };
  composer?: string;
  lyricist?: string;
  date?: string;
  location?: string;
  description?: string;
  key?: Array<{
    tonic: string;
    mode: string;
    color: string;
  }>;
  category?: string;
  genre?: string;
  lyrics?: {
    de?: string[];
    en?: string[];
    es?: string[];
    fr?: string[];
    it?: string[];
    bg?: string[];
  };
  userId: number;
}
