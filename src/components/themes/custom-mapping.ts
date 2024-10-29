import {mapping, light as lightTheme} from '@eva-design/eva';

export const customMapping = {
  components: {
    Button: {
      meta: {
        borderRadius: 30,
      },
      appearances: {
        filled: {
          default: {
            backgroundColor: '#8F5DE8',
            textColor: '#FFFFFF',
          },
        },
      },
    },
    Input: {
      appearances: {
        filled: {
          default: {
            borderRadius: 30,
            backgroundColor: '#EAEAEA',
            textColor: '#000000',
            placeholderTextColor: '#999999',
          },
        },
      },
    },
  },
};
