import { useEffect, useState } from 'react';
import { getClimbers } from '../api/crags.api';

const Climbers = () => {
  const [climbers, setClimbers] = useState([]);

  useEffect(() => {
    const fetchClimbers = async () => {
      try {
        const response = await getClimbers();
        const climbersData = response.data.allClimbers;
        setClimbers(climbersData);
      } catch (error) {
        console.log('Error fetching climbers', error);
      }
    };

    fetchClimbers();
  }, []);

  return (
    <div>
      <h2>OUR CLIMBERS</h2>
      {climbers.map(climber => (
        <p key={climber._id}>{climber.name}</p>
      ))}
    </div>
  );
};

export default Climbers;
