import { Platform, StatusBar, StyleSheet } from 'react-native';

const COLORS = {
  LIST: ['#FAF1E4', '#CEDEBD', '#9EB384'],
  DARK: '#435334',
  SUBTITLE: '#49573c',
  ACTIVE: '#d6dbd0',
  LIGHT: '#FAF1E4',
};

const getBackgroundColor = (index: number) =>
  COLORS.LIST[index % COLORS.LIST.length] ?? 'white';

const getCurrentTime = () => new Date().toLocaleTimeString();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundDark: {
    backgroundColor: COLORS.DARK,
  },
  androidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  rowItem: {
    height: 100,
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  text: {
    color: COLORS.DARK,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.SUBTITLE,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: COLORS.DARK,
    color: COLORS.LIGHT,
    paddingBottom: 10,
  },
  logger: {
    fontSize: 16,
    color: COLORS.LIGHT,
    textAlign: 'center',
  },
});

export { COLORS, getBackgroundColor, getCurrentTime, styles };
