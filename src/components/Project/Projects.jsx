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

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${BASE_URL}/projects/`);
        const data = await response.json();
        setProjects(data.slice(0, 5)); 
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleViewDetails = (pId) => {
    navigate(`/project/${pId}`);
  };

  const handleSeeMore = () => {
    navigate('/projects');
  };

  return (
    <React.Fragment>
      <Title>Recent Projects</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Project ID</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">View Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.id}</TableCell>
              <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleViewDetails(project.id)}
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
