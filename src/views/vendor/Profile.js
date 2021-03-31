import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import {
  changePassWord,
  updateAccount,
  getAccountType,
  getBankName,
} from "./api-profile";
import { toast } from "react-toastify";
import { trackPromise } from "react-promise-tracker";

export default function Profile({ navigation }) {
  const [accountDetails, setAccountDetails] = useState({
    bankName: "",
    accountType: "",
    accountNumber: "",
    bankCode: "",
    accountName: "",
  });

  const [accountType, setAccountType] = useState([]);
  const [bankNames, setBankNames] = useState([]);
  const [value, setValue] = useState({
    newPassword: "",
    confirmPassword: "",
    oldPassword: "",
  });

  const [accountError, setAccountError] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    trackPromise(
      getAccountType()
        .then((data) => {
          setAccountType(data.data);
          setAccountDetails((prev) => {
            let newObk = {
              ...prev,
              accountType: data.data[0].accountTypeName,
            };
            return newObk;
          });
        })
        .catch((err) => console.log(error))
    );

    trackPromise(
      getBankName()
        .then((data) => {
          setBankNames(data.data);
          setAccountDetails((prev) => {
            let newObj = {
              ...prev,

              bankName: data.data[0].bankName,
            };
            return newObj;
          });
        })
        .catch((err) => console.log(error))
    );
  }, []);

  const submitAccountUpdate = () => {
    if (
      accountDetails.bankName.length < 3 ||
      accountDetails.accountName.length < 3 ||
      accountDetails.accountType.length < 1 ||
      accountDetails.accountNumber.length !== 10 ||
      accountDetails.bankCode.length !== 8
    ) {
      return setAccountError(true);
    } else {
      trackPromise(
        updateAccount(accountDetails)
          .then(() => {
            toast.success("Account Update successfully");
            setAccountDetails({
              bankName: "",
              accountType: "",
              accountNumber: "",
              bankCode: "",
              accountName: "",
            });
            setAccountError(false);

            //      props.navigation.navigate("/vendor");
          })

          .catch((err) => {
            console.log(err, "account Error");
            toast.error("An error occur");
          })
      );
    }
  };
  const handleChange = ({ target }) => {
    setValue({ ...value, [target.name]: target.value });
  };

  const handleAccountChange = ({ target }) => {
    setAccountDetails({ ...accountDetails, [target.name]: target.value });
  };

  const submitPassword = () => {
    if (value.confirmPassword === value.newPassword) {
      let payload = {
        newpassword: value.newPassword,
        oldpassword: value.oldPassword,
        confirmpassword: value.confirmPassword,
      };
      trackPromise(
        changePassWord(payload)
          .then((res) => {
            console.log("passwordChange", res);
            setValue({
              newPassword: "",
              confirmPassword: "",
              oldPassword: "",
            });
            toast.success("Password Change successfully");
          })
          .catch((error) => {
            toast.error("Please try again");
            console.log(error, "err in fetch");
          })
      );
    } else {
      setErr(true);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h4">Change Account Details</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  // setAccountError(true);
                  e.preventDefault();
                  submitAccountUpdate();
                }}
              >
                {bankNames.length > 0 && (
                  <Form.Group controlId="bankName">
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={handleAccountChange}
                      placeholder="Bank Name"
                      name="bankName"
                      defaultValue={bankNames[0].bankName}
                    >
                      {bankNames.map((i) => {
                        return (
                          <option key={i.bankName} value={i.bankName}>
                            {i.bankName}
                          </option>
                        );
                      })}
                    </Form.Control>

                    {accountError && accountDetails.bankName.length < 3 && (
                      <Form.Text className="text-danger">
                        Invalid Bank Name
                      </Form.Text>
                    )}
                  </Form.Group>
                )}
                <Form.Group controlId="accountName">
                  <Form.Label>Account Name</Form.Label>
                  <Form.Control
                    // value={value.newPassword}
                    // onChange={handleChange}
                    onChange={handleAccountChange}
                    placeholder="Account Name"
                    name="accountName"
                  />

                  {accountError && accountDetails.accountName.length < 3 && (
                    <Form.Text className="text-danger">
                      Invalid Account Name
                    </Form.Text>
                  )}
                </Form.Group>
                <Row>
                  <Col md="4">
                    <Form.Group controlId="accountType">
                      <Form.Label>Account Type</Form.Label>
                      <Form.Control
                        onChange={handleAccountChange}
                        placeholder="Account Type"
                        name="accountType"
                        as="select"
                        custom
                      >
                        {accountType.map((i) => {
                          return (
                            <option
                              key={i.accountTypeName}
                              value={i.accountTypeName}
                            >
                              {i.accountTypeName}
                            </option>
                          );
                        })}
                      </Form.Control>
                      {accountError &&
                        accountDetails.accountType.length < 1 && (
                          <Form.Text className="text-danger">
                            Invalid Account Type
                          </Form.Text>
                        )}
                    </Form.Group>
                  </Col>

                  <Col md="4">
                    <Form.Group controlId="accountNumber">
                      <Form.Label>Account Number</Form.Label>
                      <Form.Control
                        // value={value.newPassword}
                        // onChange={handleChange}
                        placeholder="Account Number"
                        name="accountNumber"
                        type="number"
                        onChange={handleAccountChange}
                      />

                      {accountError &&
                        accountDetails.accountNumber.length !== 10 && (
                          <Form.Text className="text-danger">
                            Invalid Account Number
                          </Form.Text>
                        )}
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group controlId="bankCode">
                      <Form.Label>Bank Code</Form.Label>
                      <Form.Control
                        // value={value.newPassword}
                        // onChange={handleChange}
                        placeholder="Bank Code"
                        name="bankCode"
                        type="number"
                        onChange={handleAccountChange}
                      />

                      {accountError && accountDetails.bankCode.length !== 8 && (
                        <Form.Text className="text-danger">
                          Invalid Bank Code
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit">Update Account</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h4">Change Password</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitPassword();
                }}
              >
                <Form.Group controlId="oldPassword">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    value={value.oldPassword}
                    onChange={handleChange}
                    type="password"
                    placeholder=""
                    name="oldPassword"
                  />
                </Form.Group>
                <Form.Group controlId="newPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={value.newPassword}
                    onChange={handleChange}
                    placeholder=""
                    name="newPassword"
                  />
                </Form.Group>
                <Form.Group controlId="confirmNewPassword">
                  <Form.Label>New Password Again</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    type="password"
                    placeholder=""
                    name="confirmPassword"
                    value={value.confirmPassword}
                  />
                  {err && (
                    <Form.Text className="text-danger">
                      Mismatch Password
                    </Form.Text>
                  )}
                </Form.Group>
                <Button type="submit">Change Password</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
