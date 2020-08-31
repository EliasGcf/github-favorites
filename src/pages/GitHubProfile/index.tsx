import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

const GitHubProfile: React.FC = () => {
  const { params } = useRoute();
  const { login } = params as { login: string };

  const { colors } = useTheme();

  return (
    <WebView
      startInLoadingState
      renderLoading={() => (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.background,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
      source={{ uri: `https://github.com/${login}` }}
    />
  );
};

export default GitHubProfile;
