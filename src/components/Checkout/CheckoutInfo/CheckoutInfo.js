import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FaRegCheckCircle } from "react-icons/fa";
import { TbCreditCard } from "react-icons/tb";
import { BiMoney } from "react-icons/bi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CheckoutInfo = () => {
  const [expanded, setExpanded] = useState(null);
  const [number, setNumber] = useState("050");
  const [userInfo, setUserInfo] = useState([]);
  const [addresInfo, setAddresInfo] = useState([]);
  const [checked, setChecked] = useState(false);
  // const [cardInfo,setCardInfo]=useState([]);
  const [accordionActive, setAccordionActive] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({
    mode: "onBlur",
  });

  
  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  const handleAccordion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const saveUserInfo = (data, panel) => {
    const inputs = Object.values(data);
    const keys = Object.keys(data);
    const all = [];
    for (let i = 0; i < inputs.length; i++) {
      let result = null;
      if (keys[i] === "tel") {
        result = number + inputs[i];
      } else {
        result = inputs[i];
      }
      all.push(result);
    }
    panel === "panel1" ? setUserInfo(all) : setAddresInfo(all);
    console.log(all)
    setChecked(panel);
    setExpanded(
      expanded === "panel1" ? "panel2" : expanded === "panel2" ? "panel3" : null
    );
  };
  // const saveUserInfo2 = (data, panel) => {
  //   console.log(data)
    
  // };

  useEffect(() => {
    setChecked(expanded);
    setAccordionActive(expanded);
  }, [expanded]);
  return (
    <div className="checkout-list">
      <h4>??d??m??</h4>
      <div className="checkout-list-inner">
        <div className="checkout-item">
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleAccordion("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <div
                  className={`checkout-title ${
                    expanded === "panel1" ? "active" : ""
                  } ${
                    checked !== "panel1" && userInfo.length > 0 ? "checked" : ""
                  }`}
                >
                  1.????xsi m??lumatlar
                  <FaRegCheckCircle />
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <form
                  className="userForm"
                  id="form1"
                  onSubmit={handleSubmit((e) => saveUserInfo(e, "panel1"))}
                >
                  <div className="form-group-list">
                    <div className="form-group">
                      <label htmlFor="fName">Ad</label>
                      <div className="form-input">
                        <input
                          {...register("fName", {
                            required: "Ad bo?? ola bilm??z",
                            minLength: 1,
                          })}
                          type="text"
                          id="fName"
                          name="fName"
                          placeholder="Ad??n??z?? daxil edin"
                        />
                        <p className="form-error">{errors.fName?.message}</p>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="lName">Soyad</label>
                      <div className="form-input">
                        <input
                          {...register("lName", {
                            required: "Soyad bo?? ola bilm??z",
                            minLength: 1,
                          })}
                          type="text"
                          id="lName"
                          name="lName"
                          placeholder="Soyad??n??z?? daxil edin"
                        />
                        <p className="form-error">{errors.lName?.message}</p>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phoneNumber">Mobil n??mr??</label>
                      <div className="form-input">
                        <div className="select-box">
                          <FormControl sx={{ minWidth: 80 }} size="small">
                            <Select value={number} onChange={handleChange}>
                              <MenuItem value={"050"}>050</MenuItem>
                              <MenuItem value={"051"}>051</MenuItem>
                              <MenuItem value={"055"}>055</MenuItem>
                              <MenuItem value={"070"}>070</MenuItem>
                              <MenuItem value={"077"}>077</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <input
                          {...register("phone", {
                            required: "N??mr?? bo?? ola bilm??z",
                            pattern: {
                              value:/^[1-9]\d{2}-\d{2}-\d{2}$/i,
                              message: "D??zg??n format: 777-77-77",
                            },
                          })}
                          type="tel"
                          name="phone"
                          id="phone"
                          placeholder="777-77-77"
                        />
                        <p className="form-error">{errors.phone?.message}</p>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">E-mail</label>
                      <div className="form-input">
                        <input
                          {...register("email", {
                            required: "Email bo?? ola bilm??z",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Email d??zg??n formatda deyil",
                            },
                          })}
                          type="text"
                          id="email"
                          name="email"
                          placeholder="n??mun??@gmail.com"
                        />
                        <p className="form-error">{errors.email?.message}</p>
                      </div>
                    </div>
                  </div>
                  <button>Yadda saxla</button>
                </form>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <div
            className={`checkout-results ${
              accordionActive === "panel1" ? "dis-none" : ""
            }`}
          >
            {userInfo.length > 0 &&
              userInfo.map((item, index) => {
                return <span key={index}>{item}</span>;
              })}
          </div>
        </div>
        <div className="checkout-item">
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleAccordion("panel2")}
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <div
                  className={`checkout-title ${
                    expanded === "panel2" ? "active" : ""
                  } ${
                    checked !== "panel2" && addresInfo.length > 0
                      ? "checked"
                      : ""
                  }`}
                >
                  2. ??atd??r??lma
                  <FaRegCheckCircle />
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <form
                  className="userForm"
                  id="form2"
                  onSubmit={handleSubmit2((e) => saveUserInfo(e, "panel2"))}
                >
                  <div className="form-group-list">
                    <div className="form-group">
                      <label htmlFor="address">??nvan</label>
                      <div className="form-input">
                        <input
                        {...register2("address", {
                          required: "Adres bo?? ola bilm??z",
                          minLength: 1,
                        })}
                          type="text"
                          id="address"
                          name="address"
                          placeholder="??nvan?? daxil edin"
                        />
                        <p className="form-error">{errors2.address?.message}</p>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="home">Bina/M??nzil</label>
                      <div className="form-input">
                        <input
                        {...register2("home", {
                          required: "Ev ??nvan?? bo?? ola bilm??z",
                          minLength: 1,
                        })}
                          type="text"
                          id="home"
                          name="home"
                          placeholder="Daxil edin"
                        />
                        <p className="form-error">{errors2.home?.message}</p>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="notes">Kuryer ??????n ??lav?? qeydl??r</label>
                      <div className="form-input">
                        <textarea
                          name="notes"
                          id="notes"
                          cols="30"
                          rows="20"
                          placeholder="M??tni daxil edin..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <button>Yadda saxla</button>
                </form>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <div
            className={`checkout-results ${
              accordionActive === "panel2" ? "dis-none" : ""
            }`}
          >
            {addresInfo.length > 0 &&
              addresInfo.map((item, index) => {
                return <span key={index}>{item}</span>;
              })}
          </div>
        </div>
        <div className="checkout-item">
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleAccordion("panel3")}
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <div
                  className={`checkout-title ${
                    expanded === "panel3" ? "active" : ""
                  } ${
                    checked !== "panel3" && addresInfo.length > 0
                      ? "checked"
                      : ""
                  }`}
                >
                  3. ??d??m?? ??sulu
                  <FaRegCheckCircle />
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <form
                  className="userForm"
                  onSubmit={(e) => saveUserInfo(e, "panel3")}
                >
                  <div className="form-group-list">
                    <div className="card-btns">
                      <div className="card-btn">
                        <TbCreditCard />
                        Onlayn kart il?? ??d??m??
                      </div>
                      <div className="card-btn">
                        <BiMoney />
                        Qap??da na??d ??d??m??
                      </div>
                    </div>
                  </div>
                  <button>Yadda saxla</button>
                </form>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default CheckoutInfo;
