// DeleteService.js
import db from "../DatabaseServices/DatabaseServiceInit";

const DeleteService = {
  deleteAllPatients: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM PatientDetails",
          [],
          (_, { rowsAffected }) => {
            resolve(rowsAffected + " rows deleted from PatientDetails");
          },
          (_, error) => {
            reject("Error deleting patients: " + error);
          }
        );
      });
    });
  },
  deletePatientByAabhaId: (aabhaId) => {
    console.log("delete, id", aabhaId);
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM PatientDetails WHERE aabhaId=?",
          [aabhaId],
          (_, { rowsAffected }) => {
            resolve(rowsAffected + " rows deleted from PatientDetails");
          },
          (_, error) => {
            reject("Error deleting patients: " + error);
          }
        );
      });
    });
  },
  deleteAllSurveyQuestions: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM SurveyQuestion",
          [],
          (_, { rowsAffected }) => {
            resolve(rowsAffected + " rows deleted from SurveyQuestion");
          },
          (_, error) => {
            reject("Error deleting SurveyQuestion: " + error);
          }
        );
      });
    });
  },
  deleteAllSurveyQuestionAnswers: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM SurveyQuestionAnswer;`,
          [],
          (_, result) => {
            resolve("All entries deleted from SurveyQuestionAnswer table");
          },
          (_, error) => {
            reject("Error deleting entries from SurveyQuestionAnswer table: " + error);
          }
        );
      });
    });
  },


  deleteAllMedicalQuestions: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM medical_questionarrie",
          [],
          (_, { rowsAffected }) => {
            resolve(rowsAffected + " rows deleted from medical_questionarrie");
          },
          (_, error) => {
            reject("Error deleting medical_questionarrie: " + error);
          }
        );
      });
    });
  },

  deleteAllMedicalHistoryAnswers: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM medical_history_answers",
          [],
          (_, { rowsAffected }) => {
            resolve(
              rowsAffected + " rows deleted from medical_history_answers"
            );
          },
          (_, error) => {
            reject("Error deleting medical_history_answers: " + error);
          }
        );
      });
    });
  },
};

export default DeleteService;
