import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: ${RFValue(2)}px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const IconContainer = styled.View`
  height: ${RFValue(56)}px;
  width: ${RFValue(55)}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  margin-right: ${RFValue(2)}px;
`;

export const InputText = styled(TextInput)`
  flex: 1;
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background_secondary};
  padding: 0 ${RFValue(23)}px;
`;
