// InsertService.js
import db from "../DatabaseServices/DatabaseServiceInit";

const InsertService = {
  insertPatientDetails: (patientDetails) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO PatientDetails (aabhaId, firstName, lastName, email, gender, dob, village, register_worker, doctor, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            patientDetails.aabhaId,
            patientDetails.firstName,
            patientDetails.lastName,
            patientDetails.email,
            patientDetails.gender,
            patientDetails.dob,
            patientDetails.village,
            patientDetails.register_worker,
            patientDetails.doctor,
            patientDetails.address,
          ],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve("Data inserted into PatientDetails successfully");
            } else {
              reject("Failed to insert data into PatientDetails");
            }
          },
          (_, error) => {
            reject("Error inserting data into PatientDetails: " + error);
          }
        );
      });
    });
  },

  insertSurveyQuestion: (SurveyQuestions) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        SurveyQuestions.forEach((question) => {
          tx.executeSql(
            "INSERT INTO SurveyQuestion (question_id, minage, maxage, question, default_ans, type) VALUES (?, ?, ?, ?, ?, ?)",
            [
              question.question_id,
              question.minage,
              question.maxage,
              question.question,
              question.default_ans,
              question.type,
            ],
            (_, { rowsAffected }) => {
              if (rowsAffected > 0) {
                resolve("Data inserted into SurveyQuestion successfully");
              } else {
                reject("Failed to insert data into SurveyQuestion");
              }
            },
            (_, error) => {
              reject("Error inserting data into SurveyQuestion: " + error);
            }
          );
        });
      });
    });
  },

  insertMedicalQuestions: (MedicalQuestions) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        MedicalQuestions.forEach((question) => {
          tx.executeSql(
            "INSERT INTO medical_questionarrie (question_id, question) VALUES (?, ?)",
            [
              question.question_id,
              question.question
            ],
            (_, { rowsAffected }) => {
              if (rowsAffected > 0) {
                resolve("Data inserted into Medical Questions successfully");
              } else {
                reject("Failed to insert data into Medical Questions");
              }
            },
            (_, error) => {
              reject("Error inserting data into Medical Questions: " + error);
            }
          );
        });
      });
    });
  },

  insertMedicalHistoryAnswers: (medicalQuestions, answers, comment) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        for (let index = 0; index < answers.length; index++) {
          tx.executeSql(
            "INSERT INTO medical_history_answers (question_id, question_ans) VALUES (?, ?)",
            [medicalQuestions[index].question_id, answers[index]],
            (_, result) => {
              console.log(`Data for question ${index + 1} saved successfully`);
            },
            (_, error) => {
              console.error(
                `Error saving data for question ${index + 1}`,
                error
              );
            }
          );
        }
        tx.executeSql(
          "INSERT INTO medical_history_answers (question_id, question_ans) VALUES (?, ?)",
          [medicalQuestions[ medicalQuestions.length-1 ].question_id, comment],
          (_, result) => {
            console.log("Comment saved successfully");
            resolve(); // Resolve the promise after successful execution
          },
          (_, error) => {
            console.error("Error saving comment", error);
            reject(error); // Reject the promise if there's an error
          }
        );
      });
    });
  },
};

export default InsertService;
