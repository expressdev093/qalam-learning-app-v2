import React from 'react';
import {useWindowDimensions} from 'react-native';
import RenderHTML from 'react-native-render-html';

type IProps = {
  html?: string;
};

const HtmlView: React.FC<IProps> = ({html}) => {
  const {width} = useWindowDimensions();
  return (
    <RenderHTML
      source={{
        html: html ?? '',
      }}
      tagsStyles={{
        body: {
          whiteSpace: 'normal',

          margin: 0,
        },
        p: {},
      }}
      contentWidth={width}
    />
  );
};

export default HtmlView;
