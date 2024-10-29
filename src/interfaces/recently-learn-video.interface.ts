import {IBase} from './base.interface';
import {ITopicVideo} from './topic-video.interface';
import {IUser} from './user.interface';

export interface IRecentlyLearnVideo extends IBase {
  userId: number;
  topicVideoId: number;

  user?: IUser;
  topicVideo?: ITopicVideo;
}
