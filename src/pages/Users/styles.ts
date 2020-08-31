import styled from 'styled-components/native';
import { Form as Unform } from '@unform/mobile';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const AddButton = styled(RectButton)`
  height: 46px;
  width: 46px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;

  margin-left: 16px;

  align-items: center;
  justify-content: center;
`;

export const Form = styled(Unform)`
  flex-direction: row;
  padding: 16px 24px;
`;

export const Divisor = styled.View`
  height: 1px;
  background: ${({ theme }) => theme.colors.grayHard};
  margin: 0 24px 24px 24px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const UserContainer = styled.View`
  align-items: center;
  margin-bottom: 32px;
`;

export const UserImage = styled.Image`
  height: 92px;
  width: 92px;
  border-radius: 46px;
  background: ${({ theme }) => theme.colors.grayHard};
`;

export const UserName = styled.Text`
  font: 14px Roboto_500Medium;
  color: ${({ theme }) => theme.colors.white};
  margin-top: 16px;
`;

export const UserBio = styled.Text`
  font: 14px Roboto_400Regular;
  color: ${({ theme }) => theme.colors.gray};
  margin-top: 8px;
  text-align: center;
`;

export const ProfileButton = styled(RectButton)`
  height: 36px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  margin-top: 16px;

  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const UserButtonText = styled.Text`
  font: 14px Roboto_700Bold;
  color: ${({ theme }) => theme.colors.white};
`;

export const RemoveUserButton = styled(ProfileButton)`
  background: ${({ theme }) => theme.colors.error};
`;
