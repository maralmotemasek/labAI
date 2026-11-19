
import React, {
  useMemo,
  useState,
  useRef,
  useEffect
} from "react";

import "../styles/Form.css";

// ========================================
// آزمایش‌های پرکاربرد
// ========================================

const COMMON_TESTS = [
  "FBS",
  "BS",
  "HbA1c",
  "CBC",
  "WBC",
  "RBC",
  "Hemoglobin",
  "Hematocrit",
  "Platelet",
  "Cholesterol",
  "Triglyceride",
  "HDL",
  "LDL",
  "Creatinine",
  "Urea",
  "BUN",
  "AST",
  "ALT",
  "ALP",
  "TSH",
  "T3",
  "T4",
  "Vitamin D",
  "Ferritin",
  "CRP",
];

// ========================================
// واحدهای اندازه‌گیری پرکاربرد
// ========================================

const COMMON_UNITS = [
  "mg/dL",
  "g/dL",
  "U/L",
  "IU/L",
  "mIU/L",
  "ng/mL",
  "pg/mL",
  "mmol/L",
  "µg/dL",
  "10^3/µL",
  "10^6/µL",
  "%",
];

// ========================================
// ساخت آزمایش خالی
// ========================================

const createEmptyTest = () => ({
  testName: "",
  resultValue: "",
  unit: "",
  normalMin: "",
  normalMax: "",
  notes: "",
});

// ========================================
// Main Component
// ========================================

function LabTestsForm({
  initialTests = [],
  onBack,
  onSubmit,
}) {

  const [tests, setTests] = useState(
    initialTests.length > 0
      ? initialTests
      : [createEmptyTest()]
  );

  // پیام اعتبارسنجی
  const [validationMessage, setValidationMessage] =
    useState("");

  const messageTimer = useRef(null);

  const commonTests = useMemo(
    () => COMMON_TESTS,
    []
  );

  const commonUnits = useMemo(
    () => COMMON_UNITS,
    []
  );

  // ========================================
  // پاک کردن تایمر هنگام خروج از صفحه
  // ========================================

  useEffect(() => {
    return () => {
      if (messageTimer.current) {
        clearTimeout(messageTimer.current);
      }
    };
  }, []);

  // ========================================
  // نمایش پیام اعتبارسنجی به مدت ۵ ثانیه
  // ========================================

  const showValidationMessage = (message) => {

    setValidationMessage(
      message ||
      "کاربر گرامی، لطفاً تمام فیلدهای ستاره‌دار را تکمیل کنید."
    );

    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
    }

    messageTimer.current = setTimeout(() => {
      setValidationMessage("");
      messageTimer.current = null;
    }, 5000);

  };

  // ========================================
  // تغییر اطلاعات آزمایش
  // ========================================

  const handleChange = (index, field, value) => {

    setTests((prev) =>
      prev.map((test, i) =>
        i === index
          ? {
              ...test,
              [field]: value,
            }
          : test
      )
    );

  };

  // ========================================
  // افزودن آزمایش جدید
  // ========================================

  const handleAddTest = () => {

    setTests((prev) => [
      ...prev,
      createEmptyTest(),
    ]);

    setTimeout(() => {

      const testCards = document.querySelectorAll(
        ".test-item-card"
      );

      const lastCard =
        testCards[testCards.length - 1];

      if (lastCard) {
        lastCard.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

    }, 100);

  };

  // ========================================
  // حذف آزمایش
  // ========================================

  const handleRemoveTest = (index) => {

    if (tests.length === 1) return;

    setTests((prev) =>
      prev.filter((_, i) => i !== index)
    );

  };

  // ========================================
  // ثبت آزمایش‌ها و اعتبارسنجی
  // ========================================

  const handleSubmit = (event) => {

    event.preventDefault();

    const form = event.currentTarget;

    // پیدا کردن اولین فیلد اجباری ناقص
    const firstInvalidField =
      form.querySelector(":invalid");

    if (firstInvalidField) {

      showValidationMessage();

      firstInvalidField.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      firstInvalidField.focus({
        preventScroll: true,
      });

      return;
    }

    // بررسی محدوده نرمال
    const invalidRangeIndex = tests.findIndex(
      (test) =>
        Number(test.normalMin) >
        Number(test.normalMax)
    );

    if (invalidRangeIndex !== -1) {

      showValidationMessage(
        "حداقل مقدار نرمال نمی‌تواند از حداکثر مقدار نرمال بیشتر باشد."
      );

      const field = document.getElementById(
        `normalMin-${invalidRangeIndex}`
      );

      if (field) {

        field.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        field.focus({
          preventScroll: true,
        });

      }

      return;
    }

    // پاک کردن پیام قبلی
    setValidationMessage("");

    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
      messageTimer.current = null;
    }

    // آماده‌سازی اطلاعات آزمایش‌ها
    const cleanedTests = tests
      .map((test) => ({
        testName: test.testName.trim(),
        resultValue: test.resultValue,
        unit: test.unit.trim(),
        normalMin: test.normalMin,
        normalMax: test.normalMax,
        notes: test.notes.trim(),
      }))
      .filter(
        (test) =>
          test.testName ||
          test.resultValue ||
          test.unit ||
          test.normalMin ||
          test.normalMax ||
          test.notes
      );

    if (cleanedTests.length === 0) return;

    if (onSubmit) {
      onSubmit(cleanedTests);
    }

  };

  // ========================================
  // Render
  // ========================================

  return (

    <section className="profile-page">

      <div className="profile-container">

        {/* عنوان صفحه */}

        <div className="form-page-header">

          <h2>نتایج آزمایش</h2>

          <p>
            لطفاً نتایج آزمایش خود را دقیقاً مطابق
            برگه آزمایش وارد کنید تا تحلیل نهایی
            با دقت بیشتری انجام شود.
          </p>

        </div>

        {/* ==================================
            پیام اعتبارسنجی
            دقیقاً با استایل صفحه اول
        ================================== */}

        {validationMessage && (

          <div
            className="validation-toast"
            role="alert"
            aria-live="assertive"
          >

            <span className="toast-icon">
              !
            </span>

            <span>
              {validationMessage}
            </span>

          </div>

        )}

        <form
          className="profile-form"
          onSubmit={handleSubmit}
          noValidate
        >

          {/* کارت اصلی ثبت آزمایش‌ها */}

          <div className="form-card">

            <div className="form-section-header">

              <div className="section-number">
                ۱
              </div>

              <div>

                <h3>ثبت آزمایش‌ها</h3>

                <p>
                  می‌توانید چند آزمایش ثبت کنید.
                  در صورت نبودن نام آزمایش در پیشنهادها،
                  نام دلخواه خود را وارد کنید.
                </p>

              </div>

            </div>

            {/* لیست آزمایش‌ها */}

            <div className="test-list">

              {tests.map((test, index) => (

                <div
                  className="form-card test-item-card"
                  key={index}
                >

                  {/* عنوان هر آزمایش */}

                  <div className="form-section-header">

                    <div className="section-number">
                      {index + 1}
                    </div>

                    <div>

                      <h3>
                        آزمایش {index + 1}
                      </h3>

                      <p>
                        اطلاعات ثبت‌شده روی برگه آزمایش
                      </p>

                    </div>

                    {tests.length > 1 && (

                      <button
                        type="button"
                        className="remove-test-button"
                        onClick={() =>
                          handleRemoveTest(index)
                        }
                      >
                        حذف آزمایش
                      </button>

                    )}

                  </div>

                  {/* فیلدهای آزمایش */}

                  <div className="form-grid">

                    {/* نام آزمایش */}

                    <div className="form-field full-width">

                      <label htmlFor={`testName-${index}`}>

                        نام آزمایش

                        <span className="required-star">
                          *
                        </span>

                      </label>

                      <input
                        id={`testName-${index}`}
                        name={`testName-${index}`}
                        type="text"
                        list="common-tests-list"
                        value={test.testName}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "testName",
                            e.target.value
                          )
                        }
                        placeholder="مثلاً FBS یا نام دقیق آزمایش روی برگه"
                        required
                      />

                      <span className="field-description">
                        می‌توانید از پیشنهادهای رایج استفاده کنید
                        یا نام آزمایش را به‌صورت دلخواه وارد کنید.
                      </span>

                    </div>

                    {/* مقدار نتیجه */}

                    <div className="form-field">

                      <label htmlFor={`resultValue-${index}`}>

                        مقدار نتیجه

                        <span className="required-star">
                          *
                        </span>

                      </label>

                      <input
                        id={`resultValue-${index}`}
                        name={`resultValue-${index}`}
                        type="number"
                        step="any"
                        value={test.resultValue}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "resultValue",
                            e.target.value
                          )
                        }
                        placeholder="مثلاً 95"
                        required
                      />

                    </div>

                    {/* واحد اندازه‌گیری */}

                    <div className="form-field">

                      <label htmlFor={`unit-${index}`}>

                        واحد اندازه‌گیری

                        <span className="required-star">
                          *
                        </span>

                      </label>

                      <input
                        id={`unit-${index}`}
                        name={`unit-${index}`}
                        type="text"
                        list="common-units-list"
                        value={test.unit}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "unit",
                            e.target.value
                          )
                        }
                        placeholder="مثلاً mg/dL"
                        required
                      />

                      <span className="field-description">
                        اگر واحد موردنظر در پیشنهادها نبود،
                        خودتان آن را تایپ کنید.
                      </span>

                    </div>

                    {/* حداقل مقدار نرمال */}

                    <div className="form-field">

                      <label htmlFor={`normalMin-${index}`}>

                        حداقل مقدار نرمال

                        <span className="required-star">
                          *
                        </span>

                      </label>

                      <input
                        id={`normalMin-${index}`}
                        name={`normalMin-${index}`}
                        type="number"
                        step="any"
                        value={test.normalMin}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "normalMin",
                            e.target.value
                          )
                        }
                        placeholder="مثلاً 70"
                        required
                      />

                    </div>

                    {/* حداکثر مقدار نرمال */}

                    <div className="form-field">

                      <label htmlFor={`normalMax-${index}`}>

                        حداکثر مقدار نرمال

                        <span className="required-star">
                          *
                        </span>

                      </label>

                      <input
                        id={`normalMax-${index}`}
                        name={`normalMax-${index}`}
                        type="number"
                        step="any"
                        value={test.normalMax}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "normalMax",
                            e.target.value
                          )
                        }
                        placeholder="مثلاً 110"
                        required
                      />

                    </div>

                    {/* توضیحات تکمیلی */}

                    <div className="form-field full-width">

                      <label htmlFor={`notes-${index}`}>
                        توضیحات تکمیلی
                      </label>

                      <textarea
                        id={`notes-${index}`}
                        name={`notes-${index}`}
                        rows="4"
                        value={test.notes}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "notes",
                            e.target.value
                          )
                        }
                        placeholder="در صورت نیاز توضیحات اضافی مربوط به این آزمایش را وارد کنید."
                      />

                      <span className="field-description">
                        این بخش اختیاری است.
                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* راهنمای فیلدهای اجباری */}

            <p className="required-hint">

              <span className="required-star">
                *
              </span>

              تکمیل فیلدهای ستاره‌دار برای هر آزمایش الزامی است.

            </p>

            {/* افزودن آزمایش جدید */}

            <div className="lab-bottom-actions">

              <button
                type="button"
                className="light-action-button"
                onClick={handleAddTest}
              >

                <span>+</span>

                افزودن آزمایش جدید

              </button>

            </div>

          </div>

          {/* دکمه‌های پایین صفحه */}

          <div className="form-submit-area lab-submit-area">

            <div className="lab-submit-actions">

              <button
                type="button"
                className="secondary-action-button"
                onClick={onBack}
              >
                بازگشت به اطلاعات فردی
              </button>

              <button
                type="submit"
                className="profile-submit-button"
              >
                ثبت آزمایش‌ها و ادامه
              </button>

            </div>

            <p>
              پس از ثبت این مرحله، وارد بخش تحلیل نهایی خواهید شد.
            </p>

          </div>

          {/* پیشنهادهای نام آزمایش */}

          <datalist id="common-tests-list">

            {commonTests.map((item) => (

              <option
                key={item}
                value={item}
              />

            ))}

          </datalist>

          {/* پیشنهادهای واحد اندازه‌گیری */}

          <datalist id="common-units-list">

            {commonUnits.map((item) => (

              <option
                key={item}
                value={item}
              />

            ))}

          </datalist>

        </form>

      </div>

    </section>

  );

}

export default LabTestsForm;
