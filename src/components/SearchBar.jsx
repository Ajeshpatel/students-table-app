import { TextField } from "@mui/material";

function SearchBar({ search, setSearch }) {
  return (
    <TextField
      fullWidth
      label="Search Student"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{ mb: 2 }}
    />
  );
}

export default SearchBar;
