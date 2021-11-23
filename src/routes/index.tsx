import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { StackRoutes } from "./stacks.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}
