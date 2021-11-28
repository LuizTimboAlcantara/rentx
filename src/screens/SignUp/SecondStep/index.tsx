import React from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { InputPassword } from "../../../components/InputPassword";
import { Button } from "../../../components/Button";

import { useTheme } from "styled-components";
import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styles";

export function SecondStep() {
  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack() {
    navigation.dispatch(CommonActions.goBack());
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>
          <SubTitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <InputPassword iconName="lock" placeholder="Senha" />

            <InputPassword iconName="lock" placeholder="Repetir Senha" />
          </Form>

          <Button title="Cadastrar" enabled={true} color={theme.colors.success} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
