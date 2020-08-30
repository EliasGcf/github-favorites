import React, { useRef, useCallback, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { FormHandles } from '@unform/core';
import { FlatList } from 'react-native';

import { Input } from '../../components/Input';

import {
  Container,
  AddButton,
  Form,
  Divisor,
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
}

export const Users: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [users, setUsers] = useState<User[]>([]);

  const handleSubmitButton = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  const handleSubmit = useCallback(async (data: FormData) => {
    try {
      formRef.current?.setErrors({});
      const { data: user } = await api.get<User>(`users/${data.user}`);

      const newUser: User = {
        id: user.id,
        avatar_url: user.avatar_url,
        name: user.name,
        bio: user.bio,
      };

      formRef.current?.reset();
      setUsers(state => [...state, newUser]);
    } catch (err) {
      formRef.current?.setFieldError('user', 'error');
    }
  }, []);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="user"
          placeholder="Digite o usuário do GitHub"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <AddButton onPress={handleSubmitButton}>
          <Feather name="plus" color="#fff" size={24} />
        </AddButton>
      </Form>
      <Divisor />

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
            <ProfileButton>
              <UserButtonText>VER PERFIL</UserButtonText>
            </ProfileButton>
            <RemoveUserButton>
              <UserButtonText>REMOVER PERFIL</UserButtonText>
            </RemoveUserButton>
          </UserContainer>
        )}
      />
    </Container>
  );
};
