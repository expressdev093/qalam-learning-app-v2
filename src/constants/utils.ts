import {HttpError} from '@refinedev/core';
import {ITopic, ITopicVideosView} from '../interfaces';

export class Utils {
  static getTextColor(backgroundColor: string): string {
    const rgb = Utils.hexToRgb(backgroundColor);
    const brightness = Utils.getBrightness(rgb?.r, rgb?.g, rgb?.b);
    return brightness > 130 ? '#000000' : '#FFFFFF';
  }

  static hexToRgb(hex: string): {r: number; g: number; b: number} | undefined {
    const result: any = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const r: number = parseInt(result[1] as any, 16);
    const g: number = parseInt(result[2] as any, 16);
    const b: number = parseInt(result[3] as any, 16);
    return result
      ? {
          r,
          g,
          b,
        }
      : undefined;
  }

  static getBrightness(r?: number, g?: number, b?: number): number {
    return Math.round(
      (parseInt(r as any) * 299 +
        parseInt(g as any) * 587 +
        parseInt(b as any) * 114) /
        1000,
    );
  }

  static extractName(fullname: string): {firstName: string; lastName: string} {
    const words = fullname.split(' ');

    const lastName = words.pop();
    const firstName = words.join(' ');

    return {firstName, lastName: lastName ?? ''};
  }

  static removeHtmlTags(input?: string) {
    return input?.replace(/<[^>]*>/g, '');
  }

  static capitalizeFirstWord(str?: string) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  }

  static mapTopicVideos(topics: ITopic[]): ITopicVideosView[] {
    const result: ITopicVideosView[] = [];

    topics.forEach(topic => {
      const {
        id,
        name,
        description,
        image,
        chapterId,
        subjectId,
        isActive,
        subject,
        videos,
      } = topic;

      videos.forEach(video => {
        const {
          id: videoId,
          title: videoTitle,
          description: videoDescription,
          url: videoUrl,
          thumbnail: videoThumbnail,
          views: videoViews,
        } = video;

        result.push({
          id,
          name,
          description: description || '',
          image: image || '', // Default empty if null
          chapterId,
          subjectId,
          isActive,
          videoId,
          videoTitle,
          videoDescription: videoDescription || '',
          videoUrl,
          videoThumbnail,
          videoViews,
          subjectName: subject?.name || '', // Default empty if null
          subjectImage: subject?.placeholderUrl || '', // Default empty if null
        });
      });
    });

    return result;
  }

  static getErrorMessage(error: HttpError): string {
    const errorMessage = Object.values(error.errors as any)
      .flat()
      .join('');

    return errorMessage;
  }
}
