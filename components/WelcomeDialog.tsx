import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";
import { View } from "./View";

type Props = {
  open: boolean;
  closeDialog: () => void;
};

export const WelcomeDialog = (props: Props) => {
  const navigation = useNavigation();

  return (
    <View>
      <Portal>
        <Dialog
          visible={props.open}
          // onDismiss={!props.open}
        >
          <Dialog.Title>Well done</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Now click 'Get started' to add your first todo.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                navigation.navigate("Todos");
                props.closeDialog();
              }}
            >
              Get started
            </Button>
          </Dialog.Actions>
        </Dialog>
        {/* <Button onPress={}>Show Dialog</Button> */}
      </Portal>
    </View>
  );
};
