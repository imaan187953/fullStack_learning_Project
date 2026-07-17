import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from "../../services/auth.service";

import AuthLayout from "./AuthLayout";
import RegisterForm from "../../components/auth/RegisterForm";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors({});
    setSuccess("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim())
      newErrors.username = "Username is required.";

    if (!formData.email.trim())
      newErrors.email = "Email is required.";

    if (!formData.password)
      newErrors.password = "Password is required.";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
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

      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const data = await authService.register(payload);

      setSuccess(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setErrors({
        general:
          error.response?.data?.message ||
          "Registration failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join CineTrack and start tracking your favorite movies and TV shows."
    >
      <RegisterForm
        formData={formData}
        errors={errors}
        success={success}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  );
}

export default Register;