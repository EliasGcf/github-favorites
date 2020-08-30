import styled from 'styled-components/native';

interface TextInputProps {
  isErrored: boolean;
}

export const TextInput = styled.TextInput<TextInputProps>`
  background: ${({ theme }) => theme.colors.inputBg};
  height: 46px;
  border-radius: 8px;
  padding: 0 16px;
  color: ${({ theme }) => theme.colors.white};

  border: 1px solid
    ${({ theme, isErrored }) =>
      isErrored ? theme.colors.error : theme.colors.inputBg};

  font: 14px Roboto_400Regular;

  flex: 1;
`;
