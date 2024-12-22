import React, {useState} from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import {
  Button,
  Icon,
  Popover,
  Layout,
  List,
  ListItem,
} from '@ui-kitten/components';
import {IVideoQuality} from '../../interfaces';

// Define the type for video quality

// Define the props for the VideoQualitySelector component
interface VideoQualitySelectorProps {
  videoQualities: IVideoQuality[];
  onQualitySelect: (selectedQuality: IVideoQuality) => void; // Callback prop
}

export const VideoQualitySelector: React.FC<VideoQualitySelectorProps> = ({
  videoQualities,
  onQualitySelect,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedQuality, setSelectedQuality] = useState<IVideoQuality | null>(
    null,
  );

  const handleSelectQuality = (quality: IVideoQuality): void => {
    setSelectedQuality(quality);
    onQualitySelect(quality); // Call the callback with the selected quality
    setVisible(false); // Close the popover
  };

  const renderItem = ({item}: {item: IVideoQuality}) => (
    <ListItem
      title={item.resolution}
      onPress={() => handleSelectQuality(item)}
    />
  );

  return (
    <Layout style={styles.container}>
      {/* Settings Button */}
      <Button
        style={styles.settingsButton}
        onPress={() => setVisible(true)}
        accessoryLeft={props => <Icon {...props} name="settings-outline" />}>
        Settings
      </Button>

      {/* Display selected quality */}
      {selectedQuality && (
        <Text style={styles.selectedQuality}>
          Selected Quality: {selectedQuality.resolution}
        </Text>
      )}

      {/* Popover for selecting video quality */}
      <Popover
        visible={visible}
        onBackdropPress={() => setVisible(false)}
        anchor={() => (
          <Button style={styles.popoverAnchor} onPress={() => setVisible(true)}>
            Select Video Quality
          </Button>
        )}>
        {/* <Layout style={styles.popoverContent}>
          <List data={videoQualities} renderItem={renderItem} />
        </Layout> */}
      </Popover>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    marginBottom: 20,
  },
  selectedQuality: {
    marginTop: 20,
    fontSize: 18,
    color: '#000',
  },
  popoverAnchor: {
    marginTop: 10,
  },
  popoverContent: {
    width: 200,
  },
});
