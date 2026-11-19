
import React, { useMemo } from "react";
import "../styles/AnalysisReport.css";

// ========================================
// بررسی وضعیت هر آزمایش
// ========================================

const getTestStatus = (test) => {
  const value = Number(test.resultValue);
  const min = Number(test.normalMin);
  const max = Number(test.normalMax);

  if (
    test.resultValue === "" ||
    test.normalMin === "" ||
    test.normalMax === "" ||
    !Number.isFinite(value) ||
    !Number.isFinite(min) ||
    !Number.isFinite(max) ||
    min > max
  ) {
    return {
      key: "unknown",
      label: "قابل ارزیابی نیست",
      description: "اطلاعات کافی برای مقایسه وجود ندارد.",
    };
  }

  if (value < min) {
    return {
      key: "low",
      label: "پایین‌تر از محدوده",
      description: "مقدار ثبت‌شده کمتر از حداقل بازه مرجع است.",
    };
  }

  if (value > max) {
    return {
      key: "high",
      label: "بالاتر از محدوده",
      description: "مقدار ثبت‌شده بیشتر از حداکثر بازه مرجع است.",
    };
  }

  return {
    key: "normal",
    label: "در محدوده ثبت‌شده",
    description: "مقدار ثبت‌شده در محدوده مرجع واردشده قرار دارد.",
  };
};

// ========================================
// نمایش اعداد
// ========================================

const formatNumber = (value) => {
  if (value === "" || value === null || value === undefined) {
    return "—";
  }

  return String(value);
};

// ========================================
// Main Component
// ========================================

function AnalysisReport({
  profileData = {},
  labTests = [],
  analysisText = "",
  onBack,
  onEditProfile,
}) {

  // ========================================
  // محاسبه وضعیت آزمایش‌ها
  // ========================================

  const analyzedTests = useMemo(() => {

    return labTests.map((test, index) => ({
      ...test,
      id: index + 1,
      status: getTestStatus(test),
    }));

  }, [labTests]);


  // ========================================
  // آمار کلی
  // ========================================

  const summary = useMemo(() => {

    return {
      total: analyzedTests.length,

      normal: analyzedTests.filter(
        (test) => test.status.key === "normal"
      ).length,

      high: analyzedTests.filter(
        (test) => test.status.key === "high"
      ).length,

      low: analyzedTests.filter(
        (test) => test.status.key === "low"
      ).length,

      unknown: analyzedTests.filter(
        (test) => test.status.key === "unknown"
      ).length,
    };

  }, [analyzedTests]);


  // ========================================
  // Render
  // ========================================

  return (

    <section className="analysis-report-page">

      <div className="analysis-report-shell">

        {/* ==================================
            عنوان گزارش
        ================================== */}

        <div className="analysis-page-header">

          <div className="analysis-stage-badge">
            مرحله سوم
          </div>

          <div className="analysis-header-icon">
            <span>✓</span>
          </div>

          <h2>گزارش تحلیل آزمایش‌ها</h2>

          <p>
            نتایج ثبت‌شده شما در این بخش نمایش داده می‌شود.
            لطفاً گزارش را با دقت مطالعه کنید.
          </p>

        </div>


        {/* ==================================
            مشخصات فردی
        ================================== */}

        <div className="analysis-section">

          <div className="analysis-section-heading">

            <div className="analysis-section-number">
              ۱
            </div>

            <div>
              <h3>خلاصه اطلاعات فردی</h3>

              <p>
                اطلاعاتی که در مرحله اول ثبت کرده‌اید
              </p>
            </div>

          </div>


          <div className="analysis-profile-grid">

            <div className="analysis-profile-item">
              <span>جنسیت</span>
              <strong>{profileData.gender || "ثبت نشده"}</strong>
            </div>

            <div className="analysis-profile-item">
              <span>سن</span>
              <strong>
                {profileData.age
                  ? `${profileData.age} سال`
                  : "ثبت نشده"}
              </strong>
            </div>

            <div className="analysis-profile-item">
              <span>قد</span>
              <strong>
                {profileData.height
                  ? `${profileData.height} سانتی‌متر`
                  : "ثبت نشده"}
              </strong>
            </div>

            <div className="analysis-profile-item">
              <span>وزن</span>
              <strong>
                {profileData.weight
                  ? `${profileData.weight} کیلوگرم`
                  : "ثبت نشده"}
              </strong>
            </div>

          </div>

        </div>


        {/* ==================================
            خلاصه نتایج
        ================================== */}

        <div className="analysis-section">

          <div className="analysis-section-heading">

            <div className="analysis-section-number">
              ۲
            </div>

            <div>
              <h3>خلاصه وضعیت آزمایش‌ها</h3>

              <p>
                مقایسه عددی نتایج با محدوده‌های مرجعی که وارد کرده‌اید
              </p>
            </div>

          </div>


          <div className="analysis-summary-grid">

            <div className="analysis-summary-card total">

              <span className="summary-icon">Σ</span>

              <strong>{summary.total}</strong>

              <span>تعداد کل آزمایش‌ها</span>

            </div>


            <div className="analysis-summary-card normal">

              <span className="summary-icon">✓</span>

              <strong>{summary.normal}</strong>

              <span>داخل محدوده</span>

            </div>


            <div className="analysis-summary-card high">

              <span className="summary-icon">↑</span>

              <strong>{summary.high}</strong>

              <span>بالاتر از محدوده</span>

            </div>


            <div className="analysis-summary-card low">

              <span className="summary-icon">↓</span>

              <strong>{summary.low}</strong>

              <span>پایین‌تر از محدوده</span>

            </div>

          </div>

          {summary.unknown > 0 && (

            <p className="analysis-unknown-note">
              {summary.unknown} آزمایش به دلیل ناقص بودن اطلاعات
              قابل مقایسه نیست.
            </p>

          )}

        </div>


        {/* ==================================
            جزئیات آزمایش‌ها
        ================================== */}

        <div className="analysis-section">

          <div className="analysis-section-heading">

            <div className="analysis-section-number">
              ۳
            </div>

            <div>
              <h3>بررسی تک‌تک آزمایش‌ها</h3>

              <p>
                مقدار هر آزمایش در کنار محدوده مرجع آن
              </p>
            </div>

          </div>


          <div className="analysis-tests-list">

            {analyzedTests.map((test) => (

              <div
                className="analysis-test-card"
                key={test.id}
              >

                <div className="analysis-test-header">

                  <div>
                    <h4>{test.testName || `آزمایش ${test.id}`}</h4>

                    <span>
                      آزمایش شماره {test.id}
                    </span>
                  </div>


                  <div
                    className={`analysis-status ${test.status.key}`}
                  >
                    {test.status.label}
                  </div>

                </div>


                <div className="analysis-test-values">

                  <div className="analysis-value-box">

                    <span>نتیجه ثبت‌شده</span>

                    <strong>
                      {formatNumber(test.resultValue)}
                    </strong>

                    <small>
                      {test.unit || "بدون واحد"}
                    </small>

                  </div>


                  <div className="analysis-value-box">

                    <span>حداقل مقدار نرمال</span>

                    <strong>
                      {formatNumber(test.normalMin)}
                    </strong>

                    <small>
                      {test.unit || "بدون واحد"}
                    </small>

                  </div>


                  <div className="analysis-value-box">

                    <span>حداکثر مقدار نرمال</span>

                    <strong>
                      {formatNumber(test.normalMax)}
                    </strong>

                    <small>
                      {test.unit || "بدون واحد"}
                    </small>

                  </div>

                </div>


                <div className={`analysis-test-description ${test.status.key}`}>

                  {test.status.description}

                </div>


                {test.notes && (

                  <div className="analysis-test-notes">

                    <strong>توضیحات ثبت‌شده:</strong>

                    <p>{test.notes}</p>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>


        {/* ==================================
            تحلیل هوشمند
        ================================== */}

        <div className="analysis-section">

          <div className="analysis-section-heading">

            <div className="analysis-section-number">
              ۴
            </div>

            <div>
              <h3>تحلیل هوشمند نتایج</h3>

              <p>
                بخش تفسیر و جمع‌بندی نتایج آزمایش
              </p>
            </div>

          </div>


          <div className="analysis-ai-card">

            <div className="analysis-ai-header">

              <div className="analysis-ai-icon">
                AI
              </div>

              <div>
                <h4>گزارش تحلیل LabAI</h4>

                <span>
                  تحلیل اولیه و مقایسه با محدوده مرجع
                </span>
              </div>

            </div>


            {analysisText ? (

              <div className="analysis-ai-content">
                {analysisText}
              </div>

            ) : (

              <div className="analysis-ai-content">

                <p>
                  در این نسخه، نتایج آزمایش‌ها بر اساس
                  محدوده‌های مرجعی که وارد کرده‌اید مقایسه شده‌اند.
                </p>

                <p>
                  نتایج خارج از محدوده ثبت‌شده صرفاً نشان‌دهنده
                  تفاوت عددی با بازه واردشده هستند و به‌تنهایی
                  بیانگر وجود بیماری نیستند.
                </p>

                <p>
                  پس از اتصال بک‌اند و سرویس هوش مصنوعی،
                  تفسیر تکمیلی و متناسب با اطلاعات فردی شما
                  در همین قسمت نمایش داده خواهد شد.
                </p>

              </div>

            )}

          </div>

        </div>


        {/* ==================================
            هشدار پزشکی
        ================================== */}

        <div className="analysis-medical-notice">

          <div className="analysis-notice-icon">
            !
          </div>

          <div>

            <h4>توجه مهم پزشکی</h4>

            <p>
              این گزارش صرفاً جنبه اطلاع‌رسانی و آموزشی دارد
              و جایگزین تشخیص، نظر یا توصیه پزشک نیست.
              تفسیر نتایج باید با در نظر گرفتن شرایط بالینی،
              علائم، سابقه پزشکی و نظر متخصص انجام شود.
            </p>

          </div>

        </div>


        {/* ==================================
            دکمه‌های پایانی
        ================================== */}

        <div className="analysis-actions">

          <button
            type="button"
            className="analysis-back-button"
            onClick={onBack}
          >
            بازگشت به ویرایش آزمایش‌ها
          </button>


          <button
            type="button"
            className="analysis-edit-button"
            onClick={onEditProfile}
          >
            ویرایش اطلاعات فردی
          </button>

        </div>

      </div>

    </section>

  );

}

export default AnalysisReport;
