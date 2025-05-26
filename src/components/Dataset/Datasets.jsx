import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Dashboard/Title';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Datasets({ title = "Recent Datasets", size = "small", showSeeMore = true }) {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch(`${BASE_URL}/datasets/`);
        if (!response.ok) throw new Error("Failed to fetch datasets");
        const data = await response.json();

        // Optional: sort by date and take 5 most recent datasets
        const sorted = data.sort((a, b) => new Date(b.date_uploaded) - new Date(a.date_uploaded));
        setRows(sorted.slice(0, 5));
      } catch (err) {
        console.error("Error fetching datasets:", err);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDatasets();
  }, []);

  const handleViewDetails = (dId) => {
    navigate(`/dataset/${dId}`);
  };

  const handleSeeMore = () => {
    navigate('/datasets');
  };

  return (
    <React.Fragment>
      <Title>{title}</Title>

      {loading ? (
        <Typography align="center" sx={{ p: 2 }}>Loading...</Typography>
      ) : (
        <Table size={size}>
          <TableHead>
            <TableRow>
              <TableCell>Dataset ID</TableCell>
              <TableCell>Date Uploaded</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Source</TableCell>
              <TableCell align="right">View Files</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No datasets available.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.project_id}</TableCell>
                  <TableCell>{new Date(row.date_uploaded).toLocaleDateString()}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.source}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleViewDetails(row.id)}
                      sx={{ textTransform: 'none', padding: '5px 10px', fontSize: '10px' }}
                    >
                      View Files
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {showSeeMore && (
        <Link
          component="button"
          variant="body2"
          onClick={handleSeeMore}
          sx={{ mt: 3 }}
        >
          See more...
        </Link>
      )}
    </React.Fragment>
  );
}
