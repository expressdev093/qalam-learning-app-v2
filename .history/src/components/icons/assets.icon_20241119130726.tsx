import React from 'react';
import {Image} from 'react-native';

const IconProvider = (source: string) => ({
  toReactElement: ({animation, ...props}: any) => (
    <Image {...props} source={source} />
  ),
});

export const AssetIconsPack = {
  name: 'assets',
  icons: {
    github: IconProvider('@assets/github.png'),
    home: IconProvider(require('./../../../assets/images/home.svg')),

    // ...
  },
};
