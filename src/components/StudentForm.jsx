import { TextField, Button, Stack } from "@mui/material";
import { useState, useEffect } from "react";

function StudentForm({ addStudent, editingStudent, updateStudent }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    if (editingStudent) {
      setForm(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.age) {
      alert("All fields required");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(form.email)) {
      alert("Invalid email");
      return;
    }

    if (editingStudent) {
      updateStudent(form);
    } else {
      addStudent(form);
    }

    setForm({ name: "", email: "", age: "" });
  };

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <TextField
        label="Age"
        name="age"
        type="number"
        value={form.age}
        onChange={handleChange}
      />

      <Button variant="contained" type="submit">
        {editingStudent ? "Update Student" : "Add Student"}
      </Button>
    </Stack>
  );
}

export default StudentForm;
