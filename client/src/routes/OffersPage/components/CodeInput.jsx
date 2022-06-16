import { useState } from 'react';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { OfferItem } from "./OffersList";
import { useGetSpecialOffer } from "./CodeInputLogic";

export default function CodeInput(props) {
  const { setContent, setShow } = props;

  // Code input state
  const [input, setInput] = useState("");
  
  // Special offer state for input
  const [specialOffer, setSpecialOffer] = useState([]);

  // Special offer update
  const { errorText, getSpecialOffer } = useGetSpecialOffer();

  return(
    <Container className="text-center mt-4">
      <Row xs="auto" className="justify-content-center align-items-center mb-3">
        <Col>
          <Card.Title>
            Enter your special offer code here:
          </Card.Title>
        </Col>
        <Col>
          <FloatingLabel controlId="codeInput" label="Code">
            <Form.Control 
              placeholder="ABCD1234"
              value={input}
              onChange={(event) => {
                  setInput(event.target.value);
              }}
            />
          </FloatingLabel>
        </Col>
        <Col>
          <Button 
            variant="outline-dark"
            type="button"
            onClick={async() => {
              await getSpecialOffer(setSpecialOffer, input);
            }}
          >
            Redeem
          </Button>
        </Col>
      </Row>
      <Row xs="auto" className="justify-content-center align-items-center mb-3">
        { specialOffer.length > 0
          ? specialOffer.map((offer) => { 
              return (
                <section
                  key={offer._id}
                  onClick={() => {
                    setShow((currShow) => !currShow);
                    setContent(offer);
                  }}
                >
                  <OfferItem offer={offer}/>
                </section>
              );
            })
          : <Card.Title className="text-danger">{errorText}</Card.Title>
        }
      </Row>
      
    </Container>
  );
};
