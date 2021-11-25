import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

import api from "../../services/api";
import { CarDTO } from "../../dtos/carDTO";

import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

import Logo from "../../assets/logo.svg";

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarButton,
} from "./styles";

export function Home() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  function handleCarDetails(car: CarDTO) {
    navigation.dispatch(
      CommonActions.navigate({
        name: "CarDetails",
        params: {
          car: car,
        },
      })
    );
  }

  function handleOpenMyCar() {
    navigation.dispatch(
      CommonActions.navigate({
        name: "MyCars",
      })
    );
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");

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
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <CarList
          keyExtractor={(item) => item.id}
          data={cars}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <MyCarButton>
        <Ionicons
          name="ios-car-sport"
          size={32}
          color={theme.colors.shape}
          onPress={handleOpenMyCar}
        />
      </MyCarButton>
    </Container>
  );
}
