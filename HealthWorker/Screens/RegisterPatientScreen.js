import React, { useState, useContext ,useEffect} from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import PatientContext from "../Context/PatientContext";
import DeleteService from "../Services/DatabaseServices/DeleteService";
import SelectService from "../Services/DatabaseServices/SelectService";

function RegisterPatientScreen({ navigation }) {
  const [abhaId, setAbhaId] = useState("");
  const [abhaTable,setAbhaTable] =useState([]);
  const { setAabhaId } = useContext(PatientContext);
  // const navigation = useNavigation();

  const fetchDataFromDatabase = async () => {
    try {
      const data = await SelectService.getAllAabhaIdInfo();
      console.log("DATA :",data);
      setAbhaTable(data);
      console.log("AabhaId Fetched From Data: ", data);
     
    } catch (error) {
      console.error("Error fetching data from database:", error);
    }
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const handleRegister = () => {
    if (abhaId.trim() === "") {
      Alert.alert("Error", "Please enter ABHA ID");
      return;
    }
    // setAabhaId(abhaId);
    // console.log("ABHA ID registered:", abhaId);
    //  navigation.navigate("PatientDetailsScreen");

    //   navigation.navigate("PatientDetailsScreen")
    let aabhaId_not_in_array = true;
    console.log("Desired :",abhaId);
    console.log("In Array : ",abhaTable[0].aabhaId);
    console.log("abhaTable[i]",abhaTable[12]["aabhaId"])
    // Checking if the desired_aabhaId is not present in the array
    for (let i = 0; i < abhaTable.length; i++) {
      if (abhaTable[i]["aabhaId"] === abhaId ) {
        aabhaId_not_in_array = false;
        break;
      }
    }

    if (aabhaId_not_in_array) {
      console.log(abhaId + " is not in the array");
      setAabhaId(abhaId);
      console.log("ABHA ID registered:", abhaId);
      navigation.navigate("PatientDetailsScreen");
    } else {
      console.log(abhaId + " is in the array");
      Alert.alert("Aabha Id Already Registered");

    }
   
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior based on platform
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Offset to adjust for navigation bar height
    >
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter ABHA ID:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => {
            // Check if the entered value contains only numeric characters
            if (/^\d+$/.test(value)) {
              // If it contains only numeric characters, update the state
              setAbhaId(value);
            }
          }}
          value={abhaId}
          placeholder="ABHA ID"
          placeholderTextColor="#666"
          autoFocus // Automatically focus on input when the screen mounts
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 20,
    width: "75%",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterPatientScreen;
