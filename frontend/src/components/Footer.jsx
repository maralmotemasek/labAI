import "../styles/Footer.css";

function HealthLogoSmall() {
  return (
    <div className="footer-logo">

      <svg
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M32 4L53 12V29C53 43 45 54 32 60C19 54 11 43 11 29V12L32 4Z"
          fill="#fff4f1"
          stroke="#b64040"
          strokeWidth="2.5"
        />

        <path
          d="M27 17H37V27H47V37H37V47H27V37H17V27H27V17Z"
          fill="#b64040"
        />
      </svg>

    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-main">

        <div className="footer-brand-section">

          <div className="footer-brand-row">

            <HealthLogoSmall />

            <div>
              <div className="footer-brand-name">
                Lab<span>AI</span>
              </div>

              <div className="footer-brand-title">
                تحلیل هوشمند نتایج آزمایش
              </div>
            </div>

          </div>

          <p>
            سامانه‌ای برای ثبت ساختاریافته اطلاعات فردی
            و نتایج آزمایش‌های پزشکی و آماده‌سازی آن‌ها
            برای تحلیل هوشمند.
          </p>

        </div>

        <div className="footer-section">

          <h3>
            روند کار
          </h3>

          <div className="footer-step">
            <span>۱</span>
            <p>ثبت اطلاعات فردی</p>
          </div>

          <div className="footer-step">
            <span>۲</span>
            <p>ثبت نتایج آزمایش</p>
          </div>

          <div className="footer-step">
            <span>۳</span>
            <p>تحلیل هوشمند</p>
          </div>

        </div>

        <div className="footer-section footer-note-section">

          <h3>
            توجه
          </h3>

          <p>
            این پروژه در حال توسعه است و نتایج تحلیل
            آن در نسخه نهایی باید صرفاً به عنوان
            اطلاعات کمکی در نظر گرفته شود.
          </p>

        </div>

      </div>

      <div className="footer-bottom">

        <div>
          © 2026 LabAI
        </div>

        <div>
          پروژه دانشگاهی بینایی ماشین و هوش مصنوعی
        </div>

      </div>

    </footer>
  );
}

export default Footer;