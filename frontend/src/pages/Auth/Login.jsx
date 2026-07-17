import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "./AuthLayout";
import AuthForm from "../../components/auth/AuthForm";

import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
      general: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      await login(formData);

      navigate("/home");
    } catch (error) {
      setErrors({
        general:
          error.response?.data?.message ||
          "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your CineTrack journey."
    >
      <AuthForm
        formData={formData}
        errors={errors}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLogin={true}
      />
    </AuthLayout>
  );
}

export default Login;