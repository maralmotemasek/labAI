
// ساخت یک ردیف آزمایش جدید
export function createEmptyTest() {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: "",
    value: "",
    unit: "",
    reference_min: "",
    reference_max: ""
  };
}

// اعتبارسنجی اطلاعات
export function validateForm(profile, tests) {

  const age = Number(profile.age);

  if (
    profile.age === "" ||
    !Number.isFinite(age) ||
    age < 1 ||
    age > 120
  ) {
    return "لطفاً سن معتبر بین ۱ تا ۱۲۰ وارد کنید.";
  }

  if (!profile.gender) {
    return "لطفاً جنسیت را انتخاب کنید.";
  }

  if (
    profile.height_cm !== "" &&
    (
      !Number.isFinite(Number(profile.height_cm)) ||
      Number(profile.height_cm) <= 0
    )
  ) {
    return "قد واردشده معتبر نیست.";
  }

  if (
    profile.weight_kg !== "" &&
    (
      !Number.isFinite(Number(profile.weight_kg)) ||
      Number(profile.weight_kg) <= 0
    )
  ) {
    return "وزن واردشده معتبر نیست.";
  }

  if (tests.length === 0) {
    return "حداقل یک آزمایش ثبت کنید.";
  }

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    const row = i + 1;

    if (!test.name.trim()) {
      return `نام آزمایش شماره ${row} را وارد کنید.`;
    }

    if (
      test.value === "" ||
      !Number.isFinite(Number(test.value))
    ) {
      return `مقدار آزمایش شماره ${row} معتبر نیست.`;
    }

    if (!test.unit.trim()) {
      return `واحد آزمایش شماره ${row} را وارد کنید.`;
    }

    if (
      test.reference_min === "" ||
      test.reference_max === ""
    ) {
      return `محدوده مرجع آزمایش شماره ${row} را کامل کنید.`;
    }

    const min = Number(test.reference_min);
    const max = Number(test.reference_max);

    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      return `محدوده آزمایش شماره ${row} معتبر نیست.`;
    }

    if (min > max) {
      return `حداقل محدوده آزمایش شماره ${row} از حداکثر بیشتر است.`;
    }
  }

  return "";
}

// مقایسه عددی نمایشی
export function buildLocalReport(tests) {

  const results = tests.map((test) => {

    const value = Number(test.value);
    const min = Number(test.reference_min);
    const max = Number(test.reference_max);

    let status = "normal";

    if (value < min) {
      status = "low";
    } else if (value > max) {
      status = "high";
    }

    return {
      name: test.name.trim(),
      value,
      unit: test.unit.trim(),
      status
    };
  });

  const outsideCount = results.filter(
    (item) => item.status !== "normal"
  ).length;

  const summary =
    outsideCount === 0
      ? "تمام مقادیر ثبت‌شده در محدوده‌های مرجع واردشده قرار دارند."
      : `${outsideCount} مورد از ${results.length} آزمایش، خارج از محدوده مرجع واردشده است.`;

  return {
    summary,
    results
  };
}
