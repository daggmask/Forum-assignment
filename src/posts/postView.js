import React from 'react'
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";

const PostView = ({post}) => {

  return (
    <Card body>
      <CardText>
        Post content
      </CardText>
      <Button>Go somewhere</Button>
    </Card>
  );
}

export default PostView