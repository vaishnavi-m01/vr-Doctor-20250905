export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Participants: undefined;
  Reports: undefined;
  Profile: undefined;
  PreVR: { patientId: number };
  PostVRAssessment: { patientId: number };
  PreAndPostVR: { patientId: number };
  DistressThermometerScreen: { patientId: number };
  EdmontonFactGScreen: { patientId: number };
  AdverseEventForm: { patientId: number };
  StudyObservation: { patientId: number };
  PatientDashboard: { patientId: number };
  ExitInterview: { patientId: number };
  DoctorDashboard: undefined;
  SessionSetupScreen: undefined;
  ParticipantInfo: { patientId: number };
  SessionControlScreen: undefined;
  SessionCompletedScreen: undefined;
  SocioDemographic: { patientId: number };
  PatientScreening: { patientId: number };
  Screening: { patientId: number };
  FactG: { patientId: number };
};
 