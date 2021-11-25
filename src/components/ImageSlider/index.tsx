import React from "react";
import { FlatList } from "react-native";

import {
  Container,
  ImageIndexs,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from "./styles";

interface Props {
  imagesUrl: string[];
}

export function ImageSlider({ imagesUrl }: Props) {
  return (
    <Container>
      <ImageIndexs>
        {imagesUrl.map((_, index) => (
          <ImageIndex key={String(index)} active={true} />
        ))}
      </ImageIndexs>

      <FlatList
        keyExtractor={(key) => key}
        data={imagesUrl}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
}
