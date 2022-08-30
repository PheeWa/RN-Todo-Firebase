import React, { useState } from "react";
import { View } from "../components/View";
import { StyleSheet } from "react-native";
import {
  Avatar,
  Button,
  TextInput,
  Text,
  HelperText,
  Snackbar,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
// import second from "../assets/";
// import todoLogo from "../assets/todo-logo.png";
import todoLogo from "../assets/todo-logo.png";
import { WelcomeDialog } from "../components/WelcomeDialog";
import {
  getAdditionalUserInfo,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../src/firebase/config";
import { doc, getFirestore } from "firebase/firestore";

export const LogIn = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState<"" | "notExists" | "random">("");

  //   const [openDialog, setOpenDialog] = useState(false);

  const onLogInPress = async (email: string, password: string) => {
    app;
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Todos");
      // getUser();
    } catch (error) {
      if ((error as any)?.toString()?.indexOf("user-not-found") > -1) {
        setShowError("notExists");
      } else {
        setShowError("random");
      }
    }
  };

  // const getUser = () => {
  //   const firebase = getFirestore(app);
  //   const auth = getAuth();
  //   if (auth.currentUser) {
  //     const d = doc(firebase, `users/${auth.currentUser.uid}`);
  //     try {
  //       navigation.navigate("Todos");
  //     } catch (error) {
  //       setShowError("random");
  //     }
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Avatar.Image
          style={styles.image}
          source={todoLogo}
          size={150}
        ></Avatar.Image>
        <Text style={styles.title}>Welcome back</Text>
      </View>

      <View>
        <TextInput
          style={styles.input}
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          // style={styles.input}
        />
        <TextInput
          style={styles.input}
          label="Password"
          mode="outlined"
          // right={<TextInput.Affix text="/100" />}
          right={
            <TextInput.Icon
              name={showPassword ? "eye-off" : "eye"}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            />
          }
          secureTextEntry={showPassword ? false : true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}

          // style={styles.input}
        />
        <HelperText
          style={{ marginTop: 20 }}
          visible={!!showError}
          type="error"
        >
          Email/Password combo not correct
        </HelperText>
      </View>
      <View>
        <Button
          style={styles.button}
          onPress={() => {
            onLogInPress(email, password);
          }}
          mode="contained"
        >
          Log in
        </Button>

        <Button
          onPress={() => {
            navigation.navigate("SignUp");
          }}
          mode="text"
        >
          Register
        </Button>
      </View>
      <Snackbar
        visible={!!showError}
        onDismiss={() => setShowError("")}
        action={{
          label: "Close",
          onPress: () => {
            setShowError("");
          },
        }}
      >
        An error occured. Please try again.
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    alignSelf: "center",
    alignItems: "center",
  },

  image: {
    // width: "100%",
    // height: 300,
    marginBottom: 30,
  },

  container: {
    padding: 16,
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    // alignContent: "space-between",
  },

  // inputContainer:{

  // },

  input: {
    marginBottom: 20,
    // alignSelf: "stretch",
  },

  button: {
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
  },
});
