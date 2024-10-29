import {StyleService} from '@ui-kitten/components';
import {StyleSheet, StyleSheetProperties} from 'react-native';

export const COMMON_STYLES = StyleService.create({
  CENTER_CONTAINER: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LAYOUT_COINTAINER: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
  },
  FLEX: {
    flex: 1,
  },
  BUTTON_STYLE: {
    width: '100%',
    height: 50,
  },

  OUTLINE_BUTTON: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 50,
  },
});
