import React, {useState} from 'react';
import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import HTML from 'react-native-render-html';

type IProps = {
  html?: string;
};

const CollapsibleHtmlView: React.FC<IProps> = ({html}) => {
  const {width} = useWindowDimensions();
  const htmlContent = html ?? '';
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View>
      <HTML
        source={{
          html: isCollapsed ? htmlContent.slice(0, 120) : htmlContent,
        }}
        contentWidth={width}
        tagsStyles={{p: {marginBottom: 0}}} // Remove extra margin between paragraphs
      />
      {htmlContent.length > 100 && (
        <TouchableOpacity onPress={handleToggleCollapse}>
          <Text style={{color: 'blue'}}>
            {isCollapsed ? 'View More' : 'View Less'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CollapsibleHtmlView;
