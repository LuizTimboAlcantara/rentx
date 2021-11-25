import React, { useState, useEffect } from "react";
import { StatusBar, FlatList } from "react-native";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import { CarDTO } from "../../dtos/carDTO";
import api from "../../services/api";

import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

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
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";

interface CarProps {
  id: string;
  car: CarDTO;
  user_id: string;
  startDate: string;
  endDate: string;
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

      {loading ? (
        <Load />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            keyExtractor={(item) => item.id}
            data={cars}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />

                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      sise={20}
                      color={theme.colors.title}
                      styles={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
            showsVerticalScrollIndicator={false}
          />
        </Content>
      )}
    </Container>
  );
}
