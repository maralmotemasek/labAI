
import React from "react";
import "@fontsource-variable/vazirmatn";
import "../styles/Header.css";

function Header({ currentStep = 1 }) {

  const steps = [
    {
      number: 1,
      title: "اطلاعات فردی",
    },
    {
      number: 2,
      title: "ثبت آزمایش‌ها",
    },
    {
      number: 3,
      title: "تحلیل هوشمند",
    },
  ];

  // محدود کردن شماره مرحله به بازه ۱ تا ۳
  const activeStep = Math.min(
    3,
    Math.max(1, Number(currentStep) || 1)
  );

  return (
    <header className="site-header">

      <div className="header-container">

        {/* =================================
            Brand
        ================================== */}

        <div className="header-brand">

          <div className="brand-text">

            <div className="brand-name">
              <span className="brand-lab">Lab</span>
              <span className="brand-ai">AI</span>
            </div>

            <div className="brand-subtitle">
              تحلیل هوشمند نتایج آزمایش
            </div>

          </div>

          {/* Medical Logo */}

          <div className="brand-logo">

            <svg
              viewBox="0 0 72 72"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="LabAI"
            >

              <path
                d="M36 5C36 5 58 10 62 12V32C62 48 51 60 36 67C21 60 10 48 10 32V12C14 10 36 5 36 5Z"
                fill="#fff8f8"
                stroke="#e8c1c1"
                strokeWidth="1.5"
              />

              <path
                d="M36 13C36 13 52 17 55 18V32C55 43 47 52 36 58C25 52 17 43 17 32V18C20 17 36 13 36 13Z"
                fill="#d94b4b"
              />

              <rect
                x="31"
                y="21"
                width="10"
                height="27"
                rx="1"
                fill="#ffffff"
              />

              <rect
                x="22.5"
                y="29.5"
                width="27"
                height="10"
                rx="1"
                fill="#ffffff"
              />

            </svg>

          </div>

        </div>


        {/* =================================
            Dynamic Progress
        ================================== */}

        <div className="header-progress">

          <div className="progress-title">
            مسیر تحلیل آزمایش
          </div>

          <div className="progress-steps">

            {steps.map((step, index) => {

              const completed = activeStep > step.number;

              const active = activeStep === step.number;

              let status = "در انتظار";

              if (completed) {
                status = "تکمیل شد";
              } else if (active) {
                status = "مرحله فعلی";
              } else if (step.number === activeStep + 1) {
                status = "مرحله بعد";
              }

              return (
                <React.Fragment key={step.number}>

                  {/* Individual Step */}

                  <div
                    className={`progress-step ${
                      completed
                        ? "completed"
                        : active
                          ? "active"
                          : ""
                    }`}
                  >

                    <div className="step-circle">

                      {completed ? (

                        <svg
                          viewBox="0 0 24 24"
                          width="17"
                          height="17"
                          fill="none"
                        >
                          <path
                            d="M5 12L10 17L19 7"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                      ) : (

                        step.number

                      )}

                    </div>

                    <div className="step-info">

                      <span className="step-label">
                        {step.title}
                      </span>

                      <span className="step-status">
                        {status}
                      </span>

                    </div>

                  </div>


                  {/* Connector */}

                  {index < steps.length - 1 && (

                    <div
                      className={`step-connector ${
                        completed ? "completed" : ""
                      }`}
                    >
                      <span></span>
                    </div>

                  )}

                </React.Fragment>
              );
            })}

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;
