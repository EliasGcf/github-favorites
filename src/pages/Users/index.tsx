import React, { useRef, useCallback, useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, Alert, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FormHandles } from '@unform/core';
import AsyncStorage from '@react-native-community/async-storage';
import { useTheme } from 'styled-components';

import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/Input';

import {
  Container,
  AddButton,
  Form,
  Divisor,
  LoadingContainer,
  UserContainer,
  UserImage,
  UserName,
  UserBio,
  ProfileButton,
  UserButtonText,
  RemoveUserButton,
} from './styles';

import { api } from '../../services/api';

interface FormData {
  user: string;
}

interface User {
  id: number;
  avatar_url: string;
  name: string;
  bio: string;
  login: string;
}

export const Users: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const { colors } = useTheme();
  const { navigate } = useNavigation();

  useEffect(() => {
    async function loadUsers() {
      const storageUsers = await AsyncStorage.getItem('@Users');

      if (storageUsers) {
        setUsers(JSON.parse(storageUsers));
      }

      setIsLoading(false);
    }

    loadUsers();
  }, []);

  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  const handleSubmit = useCallback(async (data: FormData) => {
    try {
      formRef.current?.setErrors({});
      setFormIsLoading(true);
      const { data: user } = await api.get<User>(`users/${data.user}`);

      const newUser: User = {
        id: user.id,
        avatar_url: user.avatar_url,
        name: user.name,
        bio: user.bio,
        login: user.login,
      };

      formRef.current?.reset();

      setUsers(state => {
        const newUsers = [...state, newUser];
        AsyncStorage.setItem('@Users', JSON.stringify(newUsers));
        return newUsers;
      });
    } catch (err) {
      formRef.current?.setFieldError('user', 'error');
    } finally {
      setFormIsLoading(false);
    }
  }, []);

  const removeUser = useCallback((id: number) => {
    setUsers(state => {
      const usersFiltereds = state.filter(user => user.id !== id);
      AsyncStorage.setItem('@Users', JSON.stringify(usersFiltereds));
      return usersFiltereds;
    });
  }, []);

  const navigateUser = useCallback(
    (login: string) => {
      Alert.alert(
        'O que deseja fazer?',
        '',
        [
          {
            text: 'Manter no App',
            onPress: () => navigate('GitHubProfile', { login }),
          },
          {
            text: 'Usar o navegador',
            onPress: () => Linking.openURL(`https://github.com/${login}`),
          },
          {
            text: 'Cancelar',
            style: 'destructive',
          },
        ],
        { cancelable: true },
      );
    },
    [navigate],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="user"
          placeholder="Digite o usuário do GitHub"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="send"
          onSubmitEditing={handleSubmitForm}
          editable={!isLoading && !formIsLoading}
        />
        <AddButton onPress={handleSubmitForm}>
          {isLoading || formIsLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Feather name="plus" color={colors.white} size={24} />
          )}
        </AddButton>
      </Form>

      <Divisor />

      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" />
        </LoadingContainer>
      ) : (
        <FlatList
          data={users}
          keyExtractor={user => String(user.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 32,
            paddingBottom: 24,
          }}
          renderItem={({ item: user }) => (
            <UserContainer>
              <UserImage source={{ uri: user.avatar_url }} />
              <UserName>{user.name}</UserName>
              <UserBio>{user.bio}</UserBio>
              <ProfileButton onPress={() => navigateUser(user.login)}>
                <UserButtonText>VER PERFIL</UserButtonText>
              </ProfileButton>
              <RemoveUserButton onPress={() => removeUser(user.id)}>
                <UserButtonText>REMOVER PERFIL</UserButtonText>
              </RemoveUserButton>
            </UserContainer>
          )}
        />
      )}
    </Container>
  );
};
