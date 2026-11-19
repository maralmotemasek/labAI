
import React, { useState, useRef, useEffect } from "react";
import "../styles/Form.css";

function ProfileForm({ onSubmit }) {

  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    height: "",
    weight: "",
    currentDisease: "",
    familyHistory: "",
    medication: "",
    medicationDuration: "",
  });

  const [validationMessage, setValidationMessage] = useState("");

  const messageTimer = useRef(null);

  // پاک کردن تایمر هنگام خروج از صفحه
  useEffect(() => {
    return () => {
      if (messageTimer.current) {
        clearTimeout(messageTimer.current);
      }
    };
  }, []);

  // تغییر مقادیر فرم
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // نمایش پیام هشدار به مدت ۵ ثانیه
  const showValidationMessage = () => {
    setValidationMessage(
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

  // ثبت اطلاعات
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    // پیدا کردن اولین فیلد ناقص یا نامعتبر
    const firstInvalidField = form.querySelector(":invalid");

    if (firstInvalidField) {

      showValidationMessage();

      // انتقال صفحه به فیلد ناقص
      firstInvalidField.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      firstInvalidField.focus({
        preventScroll: true,
      });

      return;
    }

    // پاک کردن پیام قبلی
    setValidationMessage("");

    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
      messageTimer.current = null;
    }

    // ذخیره اطلاعات
    localStorage.setItem(
      "labAI_profile",
      JSON.stringify(formData)
    );

    // ارسال اطلاعات به App
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <section className="profile-page">

      <div className="profile-container">

        {/* عنوان صفحه */}

        <div className="form-page-header">
          <h2>اطلاعات فردی</h2>

          <p>
            لطفاً اطلاعات زیر را با دقت وارد کنید تا
            تحلیل نتایج آزمایش شما دقیق‌تر انجام شود.
          </p>
        </div>


        {/* پیام هشدار */}

        {validationMessage && (
          <div
            className="validation-toast"
            role="alert"
            aria-live="assertive"
          >
            <span className="toast-icon">!</span>

            <span>{validationMessage}</span>
          </div>
        )}


        {/* پیام حفظ حریم خصوصی */}

        <div className="privacy-notice">

          <div className="privacy-icon">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M24 4L40 10V22C40 33 33 40 24 44C15 40 8 33 8 22V10L24 4Z"
                fill="#FFF0F0"
                stroke="#D94B4B"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              <path
                d="M17 24L22 29L32 18"
                stroke="#D94B4B"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="privacy-text">
            <h4>کاربر گرامی، حریم خصوصی شما برای ما اهمیت دارد.</h4>

            <p>
              اطلاعات فردی و پزشکی شما با هدف تکمیل فرایند
              تحلیل آزمایش دریافت می‌شود. لطفاً اطلاعات خود
              را با اطمینان و دقت وارد کنید.
            </p>
          </div>

        </div>


        <form
          className="profile-form"
          onSubmit={handleSubmit}
          noValidate
        >

          {/* =================================
              بخش اول: اطلاعات پایه
          ================================== */}

          <div className="form-card">

            <div className="form-section-header">

              <div className="section-number">۱</div>

              <div>
                <h3>اطلاعات پایه</h3>
                <p>اطلاعات عمومی فرد</p>
              </div>

            </div>

            <div className="form-grid">

              {/* جنسیت */}

              <div className="form-field">

                <label htmlFor="gender">
                  جنسیت
                  <span className="required-star">*</span>
                </label>

                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  aria-required="true"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </select>

              </div>


              {/* سن */}

              <div className="form-field">

                <label htmlFor="age">
                  سن
                  <span className="required-star">*</span>
                </label>

                <div className="input-unit">

                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="مثلاً ۲۵"
                    required
                    aria-required="true"
                  />

                  <span>سال</span>

                </div>

              </div>


              {/* قد */}

              <div className="form-field">

                <label htmlFor="height">
                  قد
                  <span className="required-star">*</span>
                </label>

                <div className="input-unit">

                  <input
                    id="height"
                    name="height"
                    type="number"
                    min="30"
                    max="250"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="مثلاً ۱۷۵"
                    required
                    aria-required="true"
                  />

                  <span>cm</span>

                </div>

              </div>


              {/* وزن */}

              <div className="form-field">

                <label htmlFor="weight">
                  وزن
                  <span className="required-star">*</span>
                </label>

                <div className="input-unit">

                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    min="1"
                    max="500"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="مثلاً ۷۰"
                    required
                    aria-required="true"
                  />

                  <span>kg</span>

                </div>

              </div>

            </div>

            <p className="required-hint">
              <span className="required-star">*</span>
              تکمیل این فیلدها الزامی است.
            </p>

          </div>


          {/* =================================
              بخش دوم: سابقه بیماری
          ================================== */}

          <div className="form-card">

            <div className="form-section-header">

              <div className="section-number">۲</div>

              <div>
                <h3>سابقه بیماری</h3>
                <p>بیماری‌های فعلی یا بیماری‌های مهم گذشته</p>
              </div>

            </div>

            <div className="form-field full-width">

              <label htmlFor="currentDisease">
                سابقه بیماری خاص
              </label>

              <textarea
                id="currentDisease"
                name="currentDisease"
                value={formData.currentDisease}
                onChange={handleChange}
                rows="4"
                placeholder="مثلاً دیابت، فشار خون، بیماری قلبی و ..."
              />

              <span className="field-description">
                در صورت نداشتن بیماری خاص، می‌توانید بنویسید «ندارم».
              </span>

            </div>

          </div>


          {/* =================================
              بخش سوم: سابقه خانوادگی
          ================================== */}

          <div className="form-card">

            <div className="form-section-header">

              <div className="section-number">۳</div>

              <div>
                <h3>سابقه خانوادگی</h3>
                <p>بیماری‌های مهم در اعضای خانواده</p>
              </div>

            </div>

            <div className="form-field full-width">

              <label htmlFor="familyHistory">
                سابقه خانوادگی بیماری
              </label>

              <textarea
                id="familyHistory"
                name="familyHistory"
                value={formData.familyHistory}
                onChange={handleChange}
                rows="4"
                placeholder="مثلاً سابقه دیابت در پدر، فشار خون در مادر و ..."
              />

              <span className="field-description">
                در صورت نداشتن سابقه خانوادگی، می‌توانید بنویسید «ندارم».
              </span>

            </div>

          </div>


          {/* =================================
              بخش چهارم: داروهای مصرفی
          ================================== */}

          <div className="form-card">

            <div className="form-section-header">

              <div className="section-number">۴</div>

              <div>
                <h3>داروهای مصرفی</h3>
                <p>داروهایی که در حال حاضر مصرف می‌کنید</p>
              </div>

            </div>

            <div className="form-grid">

              <div className="form-field">

                <label htmlFor="medication">
                  داروی مصرفی
                </label>

                <input
                  id="medication"
                  name="medication"
                  type="text"
                  value={formData.medication}
                  onChange={handleChange}
                  placeholder="مثلاً متفورمین ۵۰۰"
                />

              </div>


              <div className="form-field">

                <label htmlFor="medicationDuration">
                  مدت مصرف
                </label>

                <input
                  id="medicationDuration"
                  name="medicationDuration"
                  type="text"
                  value={formData.medicationDuration}
                  onChange={handleChange}
                  placeholder="مثلاً ۶ ماه"
                />

              </div>

            </div>

            <span className="field-description">
              در صورت مصرف نکردن داروی خاص، می‌توانید بنویسید «ندارم».
            </span>

          </div>


          {/* =================================
              دکمه ثبت اطلاعات
          ================================== */}

          <div className="form-submit-area">

            <button
              type="submit"
              className="profile-submit-button"
            >
              ثبت اطلاعات و ادامه
            </button>

            <p>
              در مرحله بعد نتایج آزمایش‌های خود را وارد خواهید کرد.
            </p>

          </div>

        </form>

      </div>

    </section>
  );
}

export default ProfileForm;
