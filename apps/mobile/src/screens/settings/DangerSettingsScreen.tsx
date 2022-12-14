import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { useAppDispatch } from '../../services/store/store';
import { useTranslate } from '../../i18n/useTranslate';
import { globalStyle } from '../../styles/global.style';
import {
  fireDeleteAccount,
  fireLogoutUser,
} from '../../services/firebase/fire-auth.service';
import { ActionType } from '@aniwatch/shared';
import {
  DangerSettingsScreenProps,
  SettingsScreenNames,
} from '../../routes/settings/interfaces';

const DangerSettingsScreen = ({ navigation }: DangerSettingsScreenProps) => {
  const dispatch = useAppDispatch();
  const { translate } = useTranslate();

  const handleAccountDelete = async () => {
    try {
      await dispatch(fireDeleteAccount());
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        await dispatch(fireLogoutUser());
      } else {
        console.error(error);
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <Button
        mode={'outlined'}
        style={[
          styles.center,
          globalStyle.marginTopBig,
          { borderColor: '#f85149' },
        ]}
        onPress={() =>
          navigation.navigate(SettingsScreenNames.SettingsActionConfirm, {
            action: () => {
              handleAccountDelete();
            },
            type: ActionType.AccountDelete,
          })
        }>
        <Text style={{ color: '#f85149' }}>
          {translate('auth.delete_account')}
        </Text>
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: 'cover',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  highlight: {
    fontWeight: 'bold',
  },
  center: {
    alignSelf: 'center',
  },
  textInput: {},
  formInputs: {
    alignItems: 'center',
  },
  width90: {
    maxWidth: 500,
    width: '90%',
    minWidth: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default DangerSettingsScreen;
