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
}
