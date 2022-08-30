import React, { useState } from "react";
import { View } from "../components/View";
import { StyleSheet } from "react-native";
import {
  Avatar,
  Button,
  TextInput,
  Text,
  HelperText,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
// import second from "../assets/";
// import todoLogo from "../assets/todo-logo.png";
import todoLogo from "../assets/todo-logo.png";
import { WelcomeDialog } from "../components/WelcomeDialog";
import { app } from "../src/firebase/config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

export const SignUp = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConformPassword, setShowConformPassword] = useState(false);
  const [showError, setShowError] = useState<
    "" | "invalidEmail" | "minLen" | "confirmPass" | "exists" | "random"
  >("");

  //, auth/weak-password(password should be at least 6 characters),passwords don't match,

  const closeDialog = () => {
    setOpenDialog(false);
  };

  // const register = () => {
  //   if (password.length < 6) {
  //     setShowError("minLen");
  //     return;
  //   }
  //   if (password !== confirmPassword) {
  //     setShowError("confirmPass");
  //     return;
  //   }
  // };

  const onRegisterPress = () => {
    if (password.length < 6) {
      setShowError("minLen");
      return;
    }
    if (password !== confirmPassword) {
      setShowError("confirmPass");
      return;
    }

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response: any) => {
        const uid = response.user.uid;
        // const data = {
        //   id: uid,
        //   email,
        //   fullName: "hahaha",
        // };
        const firestore = getFirestore(app);
        const d = doc(firestore, `users/${uid}`);
        // try {
        // await setDoc(d, { name: "haha" }, { merge: true });
        // setCred({ email, password });
        // const user = await(await getDoc(d)).data();
        // navigation.navigate();
        setOpenDialog(true);

        // const usersRef = firestore.collection("users");
        // usersRef
        //   .doc(uid)
        //   .set(data)
        //   .then(() => {
        //     navigation.navigate("Todos", { user: data });
        //   })
        //   .catch((error: any) => {
        //     alert(error);
        //   });
        // } catch (error) {

        // alert(error);
        // }
      })
      .catch((error: any) => {
        if ((error as any).toString().indexOf("email-already-in-use") > -1) {
          setShowError("exists");
        } else if ((error as any).toString().indexOf("invalid-email") > -1) {
          setShowError("invalidEmail");
        } else {
          setShowError("random");
        }
        // alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Avatar.Image
          style={styles.image}
          source={todoLogo}
          size={150}
        ></Avatar.Image>
        <Text style={styles.title}>Welcome</Text>
      </View>

      <View>
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          // style={styles.input}
          error={showError === "exists" || showError === "invalidEmail"}
        />
        {showError === "exists" && (
          <HelperText type="error">Email already in use</HelperText>
        )}
        {showError === "invalidEmail" && (
          <HelperText type="error">Invalid Email address</HelperText>
        )}

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
          error={showError === "minLen"}
        />
        {showError === "minLen" && (
          <HelperText type="error">Min length is 6 characters</HelperText>
        )}
        <TextInput
          style={styles.input}
          label="Confirm Password"
          mode="outlined"
          // right={<TextInput.Affix text="/100" />}
          right={
            <TextInput.Icon
              name={showConformPassword ? "eye-off" : "eye"}
              onPress={() => {
                setShowConformPassword(!showConformPassword);
              }}
            />
          }
          secureTextEntry={showConformPassword ? false : true}
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
          error={showError === "confirmPass"}
        />
        {showError === "confirmPass" && (
          <HelperText type="error">Passwords do not match</HelperText>
        )}
      </View>
      <View>
        <Button
          style={styles.button}
          onPress={() => {
            onRegisterPress();
          }}
          mode="contained"
        >
          Register
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("LogIn");
          }}
          mode="text"
        >
          Log in
        </Button>
        <WelcomeDialog open={openDialog} closeDialog={closeDialog} />
      </View>
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
    marginTop: 20,
    // alignSelf: "stretch",
  },

  button: {
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
  },
});
function setCred(arg0: { email: string; password: string }) {
  throw new Error("Function not implemented.");
}
