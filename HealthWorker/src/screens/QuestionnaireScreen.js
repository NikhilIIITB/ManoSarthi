import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
  Image,
} from "react-native";
import "../Services/SurveyQuestionsService";
import SelectService from "../Services/DatabaseServices/SelectService";
import PatientContext from "../context/PatientContext"; // Import PatientContext here
import InsertService from "../Services/DatabaseServices/InsertService";
import DeleteService from "../Services/DatabaseServices/DeleteService";
import UpdateService from "../Services/DatabaseServices/UpdateService";
import * as ImagePicker from "expo-image-picker";

const QuestionnaireScreen = ({ navigation, route }) => {
  const [surveyquestions, setsurveyquestions] = useState([]);
  const { age, type, pid } = route.params; // console.log("age", age);
  // State to hold the answers for each question
  const [answers, setAnswers] = useState([]);
  const { aabhaId } = useContext(PatientContext); // Access aabhaId from the context
  const [selectedImage, setSelectedImage] = useState(null); // Changed initial value to null

  const fetchPatientDataFromDatabase = async () => {
    try {
      const patient_data = await SelectService.getAllPatients();
      console.log(
        "[QuestionarieScreen]Patients Fetched from Database: ",
        patient_data
      );
    } catch (error) {
      console.error("Error fetching data from database:", error);
    }
  };

  const fetchQuestionsFromDatabase = async () => {
    try {
      const data = await SelectService.getAllQuestions(age, type);

      setsurveyquestions(data);
      setAnswers(Array(data.length).fill(null));
      console.log("[QuestionarieScreen] Questions Need To Render: ", data);
    } catch (error) {
      console.error("Error fetching data from database:", error);
    }
  };

  const fetchSurveyQuestionsAnswersFromDatabase = async () => {
    try {
      const data = await SelectService.getAllSurveyQuestionAnswers();

      console.log("Response of Survey Questions Answers : ", data);
    } catch (error) {
      console.error("Error fetching data from database:", error);
    }
  };

  useEffect(() => {
    fetchPatientDataFromDatabase();
    fetchQuestionsFromDatabase();
    // fetchSurveyQuestionsAnswersFromDatabase();
    // DeleteService.deleteAllSurveyQuestions();
  }, []);

  // Function to handle radio button selection
  const handleAnswerSelect = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // Function to handle navigation to next screen
  const handleNext = async () => {
    // Perform any necessary validation before proceeding
    // For example, you can check if all questions are answered
    if (answers.some((answer) => answer === null)) {
      Alert.alert("Please answer all questions.");
      return;
    }

    console.log("[QuestionarieScreen]Entered Answers: ", answers);
    let promises;
    try {
      if (type === "normal") {
        promises = surveyquestions.map(async (question, index) => {
          const answer = answers[index];
          await InsertService.insertSurveyQuestionAnswer(
            aabhaId,
            question.question_id,
            answer
          );
        });
      } else if (type === "followup") {
        promises = surveyquestions.map(async (question, index) => {
          const answer = answers[index];
          await InsertService.insertFollowUpQuestionAnswer(
            pid,
            question.question_id,
            answer
          );
        });
      }

      await Promise.all(promises)
        .then((msg) => {
          console.log("Success Message: ", msg);
        })
        .catch((err) => {
          console.log("Caught Error: ", err);
        });

      // Matching the answers with the default ans
      const unmatchedCount = countUnmatchedAnswers(surveyquestions, answers);
      console.log("[QuestionarieScreen]Unmatched count: ", unmatchedCount);

      // Navigate to the next screen
      if (type === "normal") {
        if (unmatchedCount >= surveyquestions.length / 2) {
          // await InsertService.insertAabhaId(aabhaId, "old");
          navigation.navigate("MedicalDetails", { age, type });
        } else {
          const res1 = await InsertService.insertAabhaId(aabhaId, "new");
          console.log(
            "[QuestionarieScreen]Res1- Not Reffered Patient AabhaId Noted: ",
            res1
          );
          const res2 = await DeleteService.deleteSurveyQuestionAnswersByAabhaId(
            aabhaId
          );
          console.log(
            "[QuestionarieScreen]Res2- Not Reffered Patient SurveyQNA: ",
            res2
          );

          const res3 = await DeleteService.deletePatientByAabhaId(aabhaId);
          console.log(
            "[QuestionarieScreen]Res3- Not Reffered Patient Details: ",
            res3
          );
          Alert.alert(
            "Not referring to the doctor",
            "Related data is deleted from DB"
          );
          navigation.navigate("HomeScreen");
        }
      } else if (type === "followup") {
        if (unmatchedCount >= surveyquestions.length / 2) {
          // await InsertService.insertAabhaId(aabhaId, "old");
          // InsertService.insertFollowUpReferNotRefer(pid, "1");
          const res1 = await InsertService.insertFollowUpReferNotRefer(pid);
          console.log(
            "[QuestionarieScreen]PatientId staus storing Response in Followup referNotRefer: ",
            res1
          );

          const res2 = await UpdateService.updateFollowUpReferNotRefer(
            pid,
            true
          );
          console.log(
            "[QuestionarieScreen]Refer staus storing Response: ",
            res2
          );
          navigation.navigate("Preview", { age, pid, type });
        } else {
          // InsertService.insertFollowUpReferNotRefer(pid, "0");
          const res1 = await InsertService.insertFollowUpReferNotRefer(pid);
          console.log(
            "[QuestionarieScreen]PatientId staus storing Response in Followup referNotRefer: ",
            res1
          );

          navigation.navigate("Preview", { age, pid, type });
        }
      }
    } catch (error) {
      console.error("Error inserting survey answers:", error);
    }
  };

  const countUnmatchedAnswers = (questions, answers) => {
    let unmatchedCount = 0;
    questions.forEach((question, index) => {
      if (answers[index] !== question.default_ans) {
        unmatchedCount++;
      }
    });
    return unmatchedCount;
  };

  const takePicture = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        // Check if image was not cancelled
        setSelectedImage(result?.assets[0]?.base64); // Update selected image state
        const resUpdate = await UpdateService.updatePatientFollowupImage(
          result?.assets[0]?.base64,
          pid
        );
        console.log("resUpdate", resUpdate);
      }
    } catch (error) {
      console.log("Error taking picture:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {surveyquestions.map((item, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            <View style={styles.radioButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  answers[index] === "yes" && styles.radioButtonSelected,
                ]}
                onPress={() => handleAnswerSelect(index, "yes")}
              >
                <Text style={styles.radioButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  answers[index] === "no" && styles.radioButtonSelected,
                ]}
                onPress={() => handleAnswerSelect(index, "no")}
              >
                <Text style={styles.radioButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10, // const [newLatitude, setNewLatitude] = useState("NULL");
    // const [newLongitude, setNewLongitude] = useState("NULL");
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: "#3498db",
  },
  radioButtonText: {
    fontSize: 16,
    color: "#000",
  },
  nextButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default QuestionnaireScreen;
