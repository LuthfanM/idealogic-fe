import React, { useState } from "react";
import { Button, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import Parents from "../components/Parents";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const loginClick = () => {
    //kita bisa menambahkan parameter type untuk membedakan mana user dan mana admin,
    //untuk kasus sekarang dan mempersingkat kode saya hanya memakai username
    //selain memakai propsnya react-router bisa passing value dgn cara lain seperti jwt, lewat redux, dsb
    return navigate("/dashboard", { state: { username } });
  };

  return (
    <Parents>
      <Title>Login Form</Title>
      <Title level={5}>Username (isi dengan admin / user ) </Title>
      <Title level={5}>admin : melihat semua fitur</Title>
      <Title level={5}>user : sebagian fitur</Title>
      <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <Title level={5}>Password</Title>
      <Input placeholder="Password" />
      <Button onClick={loginClick}>Login</Button>
    </Parents>
  );
};

export default Login;
