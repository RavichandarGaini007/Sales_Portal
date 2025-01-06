import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Col,
} from 'reactstrap';
import { FaTrophy } from 'react-icons/fa'; // For the trophy icon

const AwardsDetailsCard = () => {
  // Sample awards data
  const awards = [
    {
      id: 1,
      title: 'Employee of the Month',
      description:
        'Awarded to John Doe for outstanding performance in October 2024.',
    },
    {
      id: 2,
      title: 'Sales Excellence Award',
      description:
        'Recognized for achieving 150% of the quarterly sales target.',
    },
    {
      id: 3,
      title: 'Team Leadership Award',
      description:
        'Awarded to the North Zone team for exemplary leadership and teamwork.',
    },
  ];

  return (
    <Col lg="6" md="6" sm="6">
      <Card className="card-stats" style={{ height: '400px' }}>
        <CardHeader>
          <div className="stats card-title mb-0">
            <i className="mdi mdi-medal-outline" /> Awards Details
          </div>
        </CardHeader>
        <CardBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <ListGroup flush>
            {awards.map((award) => (
              <ListGroupItem key={award.id} className="mb-2">
                <h5 className="mb-1">
                  <FaTrophy className="text-warning me-2" />
                  {award.title}
                </h5>
                <p className="text-muted mb-0">{award.description}</p>
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  );
};

export default AwardsDetailsCard;
