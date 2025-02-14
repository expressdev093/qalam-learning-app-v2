import {Drm, ReactVideoSource, TextTracks} from 'react-native-video';
import {IVideoQuality} from './topic-video.interface';

export interface IVideo {
  entityName: 'topic-videos' | 'app-corners' | 'online-classes';
  entityId: number;
}

export interface IVideoData {
  videoId: number;
  title?: string;
  description?: string;
  url?: string;
  thumbnailUrl?: string;
  videoQualities: IVideoQuality[];
}

export type AdditionalSourceInfo = {
  textTracks?: TextTracks;
  adTagUrl?: string;
  description?: string;
  drm?: Drm;
  noView?: boolean;
};

export type SampleVideoSource = ReactVideoSource | AdditionalSourceInfo;
