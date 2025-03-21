import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Col,
} from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars-2'; // Import slim scroll component

const NewsAndInformation = () => {
  // Sample news and information messages
  const messages = [
    {
      id: 1,
      title: 'Pharma Sales Update',
      content:
        'Sales target for Q4 has been revised. Check the dashboard for details.',
    },
    {
      id: 2,
      title: 'Health and Safety',
      content: 'New health policies have been introduced. Ensure compliance.',
    },
    {
      id: 3,
      title: 'Product Launch',
      content:
        'A new product will be launched next month. Prepare for training sessions.',
    },
    {
      id: 4,
      title: 'Employee Engagement',
      content: 'Join the wellness program starting next week.',
    },
    {
      id: 5,
      title: 'Market Insights',
      content:
        'Market trends show increased demand for anti-inflammatory drugs.',
    },
  ];

  return (
    <Col lg="6" md="6" sm="6">
      <Card className="card-stats" style={{ height: '400px' }}>
        <CardHeader>
          <div className="stats card-title mb-0">
            <i className="mdi mdi-bullhorn-outline" /> News & Information
          </div>
        </CardHeader>
        <CardBody style={{ padding: '20px' }}>
          <Scrollbars
            style={{ height: '100%' }} // Define the height of the scrollable area
            autoHide // Automatically hide the scrollbar when not scrolling
            autoHideTimeout={1000} // Delay before hiding scrollbar
            autoHideDuration={200} // Duration of hiding animation
            renderThumbVertical={({ style, ...props }) => (
              <div
                {...props}
                style={{
                  ...style,
                  backgroundColor: '#6c63ff',
                  borderRadius: '4px',
                }}
              />
            )}
          >
            <ListGroup flush>
              {messages.map((message) => (
                <ListGroupItem
                  key={message.id}
                  style={{
                    borderLeft: '5px solid #6c63ff',
                    marginBottom: '10px',
                    borderRadius: '5px',
                    padding: '15px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <h5 style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    {message.title}
                  </h5>
                  <p style={{ fontSize: '0.9rem', color: '#555' }}>
                    {message.content}
                  </p>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Scrollbars>
        </CardBody>
      </Card>
    </Col>
  );
};

export default NewsAndInformation;
