import { useState } from "react";

export default function ModalRegister() {
  const [fname, setFname] = useState("");
  const [fnameError, setFnameError] = useState(false);
  const [lname, setLname] = useState("");
  const [lnameError, setLnameError] = useState(false);
  const [buyBottle, setBuyBottle] = useState(false);
  const [buyShoes, setBuyShoes] = useState(false);
  const [buyCap, setBuyCap] = useState(false);
  const [agree, setAgree] = useState(false);
  const [plan, setPlan] = useState("");
  const [planError, setPlanError] = useState(false);
  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState(false);

  const inputFnameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFnameError(false);
    setFname(event.target.value);
  };

  const inputLnameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLnameError(false);
    setLname(event.target.value);
  };

  const selectPlanOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPlanError(false);
    setPlan(event.target.value);
  };

  const radioGenderMaleOnChange = () => {
    setGenderError(false);
    setGender("male");
  };

  const radioGenderFemaleOnChange = () => {
    setGenderError(false);
    setGender("female");
  };

  const cbBuyBottleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyBottle(event.target.checked);
  };

  const cbBuyShoesOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyShoes(event.target.checked);
  };

  const cbBuyCapOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyCap(event.target.checked);
  };

  const cbAgreeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgree(event.target.checked);
  };

  // ฟังก์ชันคำนวณราคารวมและส่วนลด
  const computeTotalPayment = () => {
    let total = 0;

    // ราคาแผน
    if (plan === "funrun") total += 500;
    if (plan === "mini") total += 800;
    if (plan === "half") total += 1200;
    if (plan === "full") total += 1500;

    // ราคาไอเทม
    let itemsTotal = 0;
    if (buyBottle) itemsTotal += 200;
    if (buyShoes) itemsTotal += 600;
    if (buyCap) itemsTotal += 400;

    // ส่วนลด 20% เมื่อเลือกครบทั้ง 3 ไอเทม
    const allItemsSelected = buyBottle && buyShoes && buyCap;
    if (allItemsSelected) {
      itemsTotal = itemsTotal * 0.8; // ลด 20%
    }

    total += itemsTotal;
    return { total, hasDiscount: allItemsSelected };
  };

  // ฟังก์ชันตรวจสอบความถูกต้อง
  const validateForm = () => {
    let isValid = true;

    if (fname === "") {
      setFnameError(true);
      isValid = false;
    }

    if (lname === "") {
      setLnameError(true);
      isValid = false;
    }

    if (plan === "") {
      setPlanError(true);
      isValid = false;
    }

    if (gender === "") {
      setGenderError(true);
      isValid = false;
    }

    return isValid;
  };

  const registerBtnOnClick = () => {
    const isValid = validateForm();

    if (isValid) {
      const { total } = computeTotalPayment();
      alert(
        `Registration complete. Please pay money for ${total.toLocaleString()} THB.`
      );
    }
  };

  const { total, hasDiscount } = computeTotalPayment();

  return (
    <div
      className="modal fade"
      id="modalregister"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="modalregisterLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* First name & Last name */}
            <div className="d-flex gap-2">
              <div className="flex-fill">
                <label className="form-label">First name</label>
                <input
                  className={"form-control" + (fnameError ? " is-invalid" : "")}
                  onChange={inputFnameOnChange}
                  value={fname}
                />
                {fnameError && (
                  <div className="invalid-feedback">
                    Please enter your first name
                  </div>
                )}
              </div>
              <div className="flex-fill">
                <label className="form-label">Last name</label>
                <input
                  className={"form-control" + (lnameError ? " is-invalid" : "")}
                  onChange={inputLnameOnChange}
                  value={lname}
                />
                {lnameError && (
                  <div className="invalid-feedback">
                    Please enter your last name
                  </div>
                )}
              </div>
            </div>

            {/* Running Plan */}
            <div className="mt-2">
              <label className="form-label">Plan</label>
              <select
                className={"form-select" + (planError ? " is-invalid" : "")}
                onChange={selectPlanOnChange}
                value={plan}
              >
                <option value="">Please select..</option>
                <option value="funrun">Fun run 5.5 Km (500 THB)</option>
                <option value="mini">Mini Marathon 10 Km (800 THB)</option>
                <option value="half">Half Marathon 21 Km (1,200 THB)</option>
                <option value="full">
                  Full Marathon 42.195 Km (1,500 THB)
                </option>
              </select>
              {planError && (
                <div className="invalid-feedback">Please select a plan</div>
              )}
            </div>

            {/* Gender */}
            <div className="mt-2">
              <label className="form-label">Gender</label>
              <div
                className={
                  genderError ? "border border-danger rounded p-2" : ""
                }
              >
                <input
                  className="me-2 form-check-input"
                  type="radio"
                  onChange={radioGenderMaleOnChange}
                  checked={gender === "male"}
                />
                Male 👨
                <input
                  className="mx-2 form-check-input"
                  type="radio"
                  onChange={radioGenderFemaleOnChange}
                  checked={gender === "female"}
                />
                Female 👩
                {genderError && (
                  <div className="text-danger mt-1">
                    Please select your gender
                  </div>
                )}
              </div>
            </div>

            {/* Extra Items */}
            <div className="mt-2">
              <label className="form-label">Extra Item(s)</label>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  onChange={cbBuyBottleOnChange}
                  checked={buyBottle}
                />
                <label className="form-check-label">Bottle 🍼 (200 THB)</label>
              </div>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  onChange={cbBuyShoesOnChange}
                  checked={buyShoes}
                />
                <label className="form-check-label">Shoes 👟 (600 THB)</label>
              </div>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  onChange={cbBuyCapOnChange}
                  checked={buyCap}
                />
                <label className="form-check-label">Cap 🧢 (400 THB)</label>
              </div>

              {/* แสดงส่วนลดใต้ตัวเลือกทั้ง 3 ไอเทม */}
              {hasDiscount && (
                <div className="text-success mt-1">
                  <span>(20% Discounted)</span>
                </div>
              )}
            </div>

            <div className="alert alert-primary mt-3" role="alert">
              Promotion📢 Buy all items to get 20% Discount
            </div>

            {/* Total Payment */}
            <div>
              <span>Total Payment : {total.toLocaleString()} THB</span>
            </div>
          </div>
          <div className="modal-footer">
            {/* ปรับตำแหน่งให้ checkbox และปุ่มอยู่ใกล้กัน */}
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center">
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  onChange={cbAgreeOnChange}
                  checked={agree}
                />
                <label className="form-check-label mb-0">
                  I agree to the terms and conditions
                </label>
              </div>
              <button
                className="btn btn-success"
                onClick={registerBtnOnClick}
                disabled={!agree}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
