import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import api from "../../services/api";
import { CarDTO } from "../../dtos/carDTO";

import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

import Logo from "../../assets/logo.svg";

import { Container, Header, HeaderContent, TotalCars, CarList } from "./styles";

export function Home() {
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const carData = {
    brand: "Audi",
    name: "Rs 5 Coupé",
    rent: {
      period: "Ao dia",
      price: 120,
    },
    thumbnail: "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
  };

  function handleCarDetails() {
    navigation.dispatch(
      CommonActions.navigate({
        name: "CarDetails",
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

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <CarList
          keyExtractor={(item) => item.id}
          data={cars}
          renderItem={({ item }) => <Car data={item} onPress={handleCarDetails} />}
        />
      )}
    </Container>
  );
}
