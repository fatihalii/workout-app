import {
  Text,
  StyleSheet,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Colors from "../../../constants/Colors";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc } from 'firebase/firestore';
//import { getFirestore, setDoc, doc } from "firebase/firestore";
import { auth,db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { async } from "@firebase/util";

//import {getFirestore, collection, getDocs} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const Register = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [userCredentials, setUserCredentials] = useState({
    Name: "",
    BirthOfDate: "",
    Height: "",
    Weight: "",
    Gender: "",
  });

  const navigation = useNavigation();

  const createUser =  () => {
    createUserWithEmailAndPassword(auth, email, pw)
      .then((response) => {
        const user = response.user;
        try{
          const docRef =setDoc(doc(db,'users',user.uid),userCredentials);
          console.log("success")
          navigation.navigate("AppPage");
        }catch(error){
          alert(error.message);
          console.log(error.message);
        }
        
       
      })
      .catch((error) => {
        alert(error.message);
        console.log(error.message)
        console.log(error);
      });
  };

const userMaker= async (identity)=>{
  try{
    const docRef = await setDoc(doc(db,'users',identity),pw);
  }catch(error){
    alert(error.message);
    console.log(error.message);
  }

}

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.headerText}>Create account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.nameInput}
          placeholder="Full Name"
          placeholderTextColor={Colors.secondary100}
          textAlign={"center"}
          autoCorrect="false"
          value={userCredentials.Name}
          onChangeText={(text) => {
            setUserCredentials({...userCredentials,name:text})
          }}
        />
        <TextInput
          style={styles.nameInput}
          placeholder="E-mail"
          autoCapitalize="none"
          autoCorrect="false"
          placeholderTextColor={Colors.secondary100}
          Value={email}
          onChangeText={(text) => {
            setEmail(text)
          }}
          textAlign={"center"}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.nameInput}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect="false"
          placeholderTextColor={Colors.secondary100}
          Value={pw}
          onChangeText={(text) => {
            setPw(text)
          }}
          textAlign={"center"}
          secureTextEntry="true"
        />
       
        <TextInput
          style={styles.nameInput}
          placeholder="Confirm Password"
          placeholderTextColor={Colors.secondary100}
          textAlign={"center"}
          autoCorrect="false"
          secureTextEntry="true"
        />
        <TextInput
          style={styles.smallInput}
          placeholder="Birth of Date"
          keyboardType="number-pad"
          placeholderTextColor={Colors.secondary100}
          textAlign={"center"}
          value={userCredentials.BirthOfDate}
          onChangeText={(text) => {
            setUserCredentials({...userCredentials,BirthOfDate:text})
          }}
        />
        <TextInput
          style={styles.smallInput}
          placeholder="Height"
          placeholderTextColor={Colors.secondary100}
          textAlign={"center"}
          value={userCredentials.Height}
          onChangeText={(text) => {
            setUserCredentials({...userCredentials,height:text})
          }}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.smallInput}
          placeholder="Weight"
          placeholderTextColor={Colors.secondary100}
          textAlign={"center"}
          value={userCredentials.Weight}
          onChangeText={(text) => {
            setUserCredentials({...userCredentials,weight:text})
          }}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.smallInput}
          placeholder="Gender"
          placeholderTextColor={Colors.secondary100}
          textAlign={"center"}
          value={userCredentials.Gender}
          onChangeText={(text) => {
            setUserCredentials({...userCredentials,gender:text})
          }}

        />
      </View>

      <Pressable style={styles.button} onPress={() => createUser()}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.primary200,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 35,
    marginTop: 25,
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 50,
  },
  nameInput: {
    width: 300,
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.secondary100,
    color: "#FFFFFF",
    marginVertical: 13,
    marginHorizontal: 5,
  },
  smallInput: {
    width: 145,
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.secondary100,
    color: "#FFFFFF",
    marginVertical: 13,
    marginHorizontal: 5,
  },
  button: {
    borderColor: "white",
    backgroundColor: Colors.secondary100,
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    fontSize: 50,
    textAlign: "center",
  },
  buttonText: {
    color: Colors.primary200,
  },
});
