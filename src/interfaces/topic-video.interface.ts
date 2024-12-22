import {IBase} from './base.interface';
import {ITopic} from './topic.interface';

export interface IVideoQuality {
  resolution: string;
  quality: string;
  url: string;
  isDefault: boolean;
}

export interface ITopicVideo extends IBase {
  title: string;

  description?: string;

  url: string;

  thumbnail: string;

  topicId: number;

  views: number;

  isActive: boolean;

  topic?: ITopic;

  videoQualities?: IVideoQuality[];
}
