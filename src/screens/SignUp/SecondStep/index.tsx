import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import api from "../../../services/api";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";

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

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SecondStep() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params as Params;
  const theme = useTheme();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleBack() {
    navigation.dispatch(CommonActions.goBack());
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Informe a senha e a confirmação!");
    }

    if (password != passwordConfirm) {
      return Alert.alert("As senhas não são iguais!");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })
      .then(() => {
        navigation.dispatch(
          CommonActions.navigate({
            name: "Confirmation",
            params: {
              title: "Conta criada!",
              message: `Agora é só fazer o login${"\n"}é aproveitar!`,
              nextSceneRoute: "SignIn",
            },
          })
        );
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Não foi possível cadastrar!");
      });
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

            <InputPassword
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />

            <InputPassword
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            enabled={true}
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
