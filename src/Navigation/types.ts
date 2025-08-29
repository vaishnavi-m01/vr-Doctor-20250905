export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Participants: undefined;
  Reports: undefined;
  Profile: undefined;
  PreVR: { patientId: number,age:number };
  PostVRAssessment: { patientId: number,age:number };
  PreAndPostVR: { patientId: number,age:number };
  DistressThermometerScreen: { patientId: number,age:number };
  EdmontonFactGScreen: { patientId: number,age:number };
  AdverseEventForm: { patientId: number,age:number };
  StudyObservation: { patientId: number,age:number };
  PatientDashboard: { patientId: number,age:number };
  ExitInterview: { patientId: number,age:number };
  DoctorDashboard: undefined;
  SessionSetupScreen: {patientId:number,age:number};
  ParticipantInfo: { patientId: number,age:number };
  SessionControlScreen: undefined;
  SessionCompletedScreen: undefined;
  SocioDemographic: { patientId?: number,age?:number };
  PatientScreening: { patientId: number,age:number };
  Screening: { patientId: number,age:number };
  FactG: { patientId: number,age:number };
  DistressThermometerList:{ patientId: number,age:number };
  StudyObservation_List:{patientId:number,age:number};
  FactGAssessmentHistory: {patientId:number,age:number}
};
 