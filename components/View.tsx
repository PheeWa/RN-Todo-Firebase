import React from "react";
import { View as ViewRN } from "react-native";
import { useTheme } from "react-native-paper";

export const View = (props: any) => {
  const { colors } = useTheme();

  return (
    <ViewRN
      {...props}
      style={[{ backgroundColor: colors.background }, props.style]}
    >
      {props.children}
    </ViewRN>
  );
};
