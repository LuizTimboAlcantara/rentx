import React, { useState, useEffect } from "react";
import { StatusBar, FlatList } from "react-native";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";

import { CarDTO } from "../../dtos/carDTO";
import api from "../../services/api";

import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";

import { useTheme } from "styled-components";
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
} from "./styles";

interface CarProps {
  id: string;
  car: CarDTO;
  user_id: string;
}

export function MyCars() {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  function handleBack() {
    navigation.dispatch(CommonActions.goBack());
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/schedules_byuser?user_id=1");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <Title>{`Escolha uma ${"\n"} data de início e ${"\n"} fim do aluguel`}</Title>
        <SubTitle>"Conforto, segurança e praticidade."</SubTitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>5</AppointmentsQuantity>
        </Appointments>

        <FlatList
          keyExtractor={(item) => item.id}
          data={cars}
          renderItem={({ item }) => <Car data={item.car} />}
          showsVerticalScrollIndicator={false}
        />
      </Content>
    </Container>
  );
}
