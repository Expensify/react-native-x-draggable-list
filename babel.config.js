module.exports = {
    presets: ['@babel/preset-env', ['@babel/preset-react', {runtime: 'automatic'}], '@babel/preset-typescript', 'module:metro-react-native-babel-preset'],
    plugins: ['react-native-reanimated/plugin'],
};
