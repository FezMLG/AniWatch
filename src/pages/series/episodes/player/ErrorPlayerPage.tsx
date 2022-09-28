import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';

import { darkStyle } from '../../../../styles/darkMode.style';
import { maxHeight, maxWidth } from '../../../../components/maxDimensions';
import { Text } from 'react-native-paper';
import { globalStyle } from '../../../../styles/global.style';

const ErrorPlayerPage = ({ route }: any) => {
  const { playerName, animeId } = route.params;

  return (
    <SafeAreaView style={[styles.container, darkStyle.background]}>
      <Text
        variant="headlineLarge"
        style={[darkStyle.font, globalStyle.spacer]}>
        Source {playerName} is not yet implemented!
      </Text>
      <Text variant="titleLarge" style={[darkStyle.font, globalStyle.spacer]}>
        To watch video from this source on your tv, please scan qr code or open
        AniWatch mobile app, select this source and use built in cast to
        Chromecast feature
      </Text>
      <QRCode value={`aniwatch://browse/${encodeURI(animeId)}`} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: maxWidth(),
    height: maxHeight(),
  },
});

export default ErrorPlayerPage;
