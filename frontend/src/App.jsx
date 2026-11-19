
import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import ProfileForm from "./components/ProfileForm";
import LabTestsForm from "./components/LabTestsForm";
import AnalysisReport from "./components/AnalysisReport";


// ========================================
// ساخت داروی خالی
// ========================================

const createEmptyMedication = () => ({
  name: "",
  duration: "",
  durationUnit: "ماه",
});


// ========================================
// اطلاعات اولیه کاربر
// ========================================

const initialProfileData = {
  gender: "",
  age: "",
  height: "",
  weight: "",

  medicalHistory: "",
  medicalHistoryDetails: "",

  familyHistory: "",
  familyHistoryDetails: "",

  hasMedication: "no",

  medications: [createEmptyMedication()],
};


// ========================================
// Main App
// ========================================

function App() {

  // مرحله فعلی
  const [currentStep, setCurrentStep] = useState(1);

  // اطلاعات فردی
  const [profileData, setProfileData] =
    useState(initialProfileData);

  // نتایج آزمایش‌ها
  const [labTests, setLabTests] = useState([]);


  // ========================================
  // ثبت اطلاعات فردی و رفتن به مرحله دوم
  // ========================================

  const handleProfileSubmit = (data) => {

    const cleanedData = {
      ...data,

      medications:
        data.hasMedication === "yes"
          ? data.medications
          : [],
    };

    setProfileData(cleanedData);

    setCurrentStep(2);

    console.log(
      "Profile data:",
      cleanedData
    );

  };


  // ========================================
  // ثبت آزمایش‌ها و رفتن به مرحله سوم
  // ========================================

  const handleLabTestsSubmit = (tests) => {

    setLabTests(tests);

    const finalData = {
      profile: profileData,
      labTests: tests,
    };

    console.log(
      "Final project data:",
      finalData
    );

    // فعلاً تحلیل نمایشی در صفحه سوم نمایش داده می‌شود.
    // پس از آماده شدن بک‌اند، اینجا API نیما را صدا می‌زنیم.

    setCurrentStep(3);

  };


  // ========================================
  // بازگشت به اطلاعات فردی
  // ========================================

  const handleBackToProfile = () => {

    setCurrentStep(1);

  };


  // ========================================
  // بازگشت به ثبت آزمایش‌ها
  // ========================================

  const handleBackToLabs = () => {

    setCurrentStep(2);

  };


  // ========================================
  // Render
  // ========================================

  return (

    <div className="app">

      {/* هدر مشترک */}

      <Header currentStep={currentStep} />


      {/* محتوای اصلی */}

      <main className="main-content">

        <div className="page-container">


          {/* ==================================
              مرحله اول: اطلاعات فردی
          ================================== */}

          {currentStep === 1 && (

            <ProfileForm
              initialData={profileData}
              onSubmit={handleProfileSubmit}
            />

          )}


          {/* ==================================
              مرحله دوم: ثبت آزمایش‌ها
          ================================== */}

          {currentStep === 2 && (

            <LabTestsForm
              initialTests={labTests}
              onBack={handleBackToProfile}
              onSubmit={handleLabTestsSubmit}
            />

          )}


          {/* ==================================
              مرحله سوم: گزارش تحلیل
          ================================== */}

          {currentStep === 3 && (

            <AnalysisReport
              profileData={profileData}
              labTests={labTests}
              onBack={handleBackToLabs}
              onEditProfile={handleBackToProfile}
            />

          )}

        </div>

      </main>


      {/* فوتر مشترک */}

      <Footer />

    </div>

  );

}

export default App;
