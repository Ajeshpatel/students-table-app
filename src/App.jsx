import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useState } from "react";

import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import SearchBar from "./components/SearchBar";

import { studentsData } from "./data/studentsData";
import { exportStudents } from "./utils/excelExport";

function App() {
  const [students, setStudents] = useState(studentsData);
  const [editingStudent, setEditingStudent] = useState(null);
  const [search, setSearch] = useState("");

  const addStudent = (student) => {
    student.id = Date.now();
    setStudents([...students, student]);
  };

  const updateStudent = (updated) => {
    setStudents(students.map((s) => (s.id === updated.id ? updated : s)));
    setEditingStudent(null);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}
      >
        Students Management
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Form */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <StudentForm
                addStudent={addStudent}
                editingStudent={editingStudent}
                updateStudent={updateStudent}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Table */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <SearchBar search={search} setSearch={setSearch} />

              <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={() => exportStudents(filteredStudents)}
              >
                Download Excel
              </Button>

              <StudentTable
                students={filteredStudents}
                editStudent={setEditingStudent}
                deleteStudent={deleteStudent}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
