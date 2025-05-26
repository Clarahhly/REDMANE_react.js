import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Dashboard/Title';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // Get backend URL from .env

export default function Patients() {
  const navigate = useNavigate();
  const [patients, setPatients] = React.useState([]);

  React.useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${BASE_URL}/patients/`);
        const data = await response.json();
        setPatients(data.slice(0, 5)); // Only show 5 patients
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/patient/${id}`); // Navigate to patient details
  };

  const handleSeeMore = () => {
    navigate('/patients'); // Navigate to full patients list
  };

  return (
    <React.Fragment>
      <Title>Patients</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align='center'>ID</TableCell>
            <TableCell align='center'>External ID</TableCell>
            <TableCell>Source</TableCell>
            <TableCell align='center'>Number of Samples</TableCell>
            <TableCell align="right">View Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell align='center'>{patient.id}</TableCell>
              <TableCell align='center'>{patient.ext_patient_id || patient.public_patient_id || '—'}</TableCell>
              <TableCell>{'Unknown'}</TableCell> {/* Or you can use a real field if you have a source */}
              <TableCell align='center'>{patient.sample_count || 0}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleViewDetails(patient.id)}
                  sx={{ textTransform: 'none', padding: '5px 10px', fontSize: '10px' }}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        component="button"
        variant="body2"
        onClick={handleSeeMore}
        sx={{ mt: 3 }}
      >
        See more...
      </Link>
    </React.Fragment>
  );
}
