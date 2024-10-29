import {IBase} from './base.interface';
import {ITopicVideo} from './topic-video.interface';
import {IUser} from './user.interface';

export interface IVideoLike extends IBase {
  isLiked: boolean;

  userId: number;

  videoId: number;

  user?: IUser;
  video?: ITopicVideo;
}
