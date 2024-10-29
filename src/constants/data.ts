import {IAppCorner, IOnlineClass, ISubject} from '../interfaces';

export const subjects: ISubject[] = [
  {
    id: 1,
    name: 'Bilogy',
    isActive: true,
  },
  {
    id: 2,
    name: 'Chemistry',
    isActive: true,
  },
  {
    id: 3,
    name: 'Computer',
    isActive: true,
  },
  {
    id: 4,
    name: 'English',
    isActive: true,
  },
  {
    id: 5,
    name: 'Mathematics',
    isActive: true,
  },
];

export const appCorners: IAppCorner[] = [
  {
    id: 1,
    title: 'Take Control  of you time',
    description: 'We have positively disrupted our..',
    isActive: true,
  },
  {
    id: 2,
    title: 'Take Control  of you time',
    description: 'We have positively disrupted our..',
    isActive: true,
  },
  {
    id: 3,
    title: 'Take Control  of you time',
    description: 'We have positively disrupted our..',
    isActive: true,
  },
  {
    id: 4,
    title: 'Take Control  of you time',
    description: 'We have positively disrupted our..',
    isActive: true,
  },
  {
    id: 5,
    title: 'Take Control  of you time',
    description: 'We have positively disrupted our..',
    isActive: true,
  },
];

export const onlineClasses: IOnlineClass[] = [
  {
    id: 1,
    title: 'Chemistry',
    description: 'We have positively disrupted our..',
    isActive: true,
    startDate: new Date().toDateString(),
    endDate: new Date().toDateString(),
    topicId: 1,
    subjectId: 1,
    chapterId: 1,
    chapter: {
      id: 1,
      name: 'Evaporation',
      isActive: true,
      subjectId: 1,
    },
  },
  {
    id: 2,
    title: 'Chemistry',
    description: 'We have positively disrupted our..',
    isActive: true,
    startDate: new Date().toDateString(),
    endDate: new Date().toDateString(),
    topicId: 1,
    subjectId: 1,
    chapterId: 1,
    chapter: {
      id: 1,
      name: 'Evaporation',
      isActive: true,
      subjectId: 1,
    },
  },
  {
    id: 3,
    title: 'Chemistry',
    description: 'We have positively disrupted our..',
    isActive: true,
    startDate: new Date().toDateString(),
    endDate: new Date().toDateString(),
    topicId: 1,
    subjectId: 1,
    chapterId: 1,
    chapter: {
      id: 1,
      name: 'Evaporation',
      isActive: true,
      subjectId: 1,
    },
  },
  {
    id: 4,
    title: 'Chemistry',
    description: 'We have positively disrupted our..',
    isActive: true,
    startDate: new Date().toDateString(),
    endDate: new Date().toDateString(),
    topicId: 1,
    subjectId: 1,
    chapterId: 1,
    chapter: {
      id: 1,
      name: 'Evaporation',
      isActive: true,
      subjectId: 1,
    },
  },
  {
    id: 5,
    title: 'Chemistry',
    description: 'We have positively disrupted our..',
    isActive: true,
    startDate: new Date().toDateString(),
    endDate: new Date().toDateString(),
    topicId: 1,
    subjectId: 1,
    chapterId: 1,
    chapter: {
      id: 1,
      name: 'Evaporation',
      isActive: true,
      subjectId: 1,
    },
  },
];
