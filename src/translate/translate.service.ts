import { Injectable } from '@nestjs/common';
import { v2 as TranslateV2 } from '@google-cloud/translate';
import { throws } from 'assert';

const { Translate } = TranslateV2;

@Injectable()
export class TranslateService {
  private translateClient: InstanceType<typeof Translate>;

  constructor() {
    this.translateClient = new Translate({
      projectId: process.env.GOOGLE_PROJECT_ID,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, 
    });
  }

  async defineLanguage(text: string): Promise<string> {
    const [detections] = await this.translateClient.detect(text);

    if (Array.isArray(detections)) {
      return detections[0].language;
    }

    return detections.language;
  }




  async optionalTranslation(text:string, preferredLanguage:string): Promise<string> {
    const checkLanguage = await this.defineLanguage(text)
    if (checkLanguage === preferredLanguage) {
        return text
    }
    const [setTranslate] =   await this.translateClient.translate(text, preferredLanguage)
    return setTranslate
    

  }
}
