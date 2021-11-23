import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Car } from "../../components/Car";

import Logo from "../../assets/logo.svg";

import { Container, Header, HeaderContent, TotalCars } from "./styles";

export function Home() {
  const carDataOne = {
    brand: "Audi",
    name: "Rs 5 Coupé",
    rent: {
      period: "Ao dia",
      price: 120,
    },
    thumbnail: "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
  };
  const carDataTwo = {
    brand: "Porsche",
    name: "Panamera",
    rent: {
      period: "Ao dia",
      price: 340,
    },
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcjNyYzAaDuKhvsO_t45BZbB4uYhtqryrA5efIsnfaGWsU-P3r05g-X34M09z9vXVSUbs&usqp=CAU",
  };

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
      <Car data={carDataOne} />
      <Car data={carDataTwo} />
    </Container>
  );
}
