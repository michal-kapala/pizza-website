import { Container, Card } from 'react-bootstrap';
import { getNewPrice, getOldPrice, getProductNames } from "./OffersListLogic";

function OffersList(props) {
    const { offers } = props;
    
    return(
      <Container fluid className="text-center mt-4">
        <Card.Title className="fs-5 mb-1 ">
            Find yourself an offer 🍕
        </Card.Title>
        <Card.Text>
          Only small-sized pizzas are available in offers.
        </Card.Text>
        <section className="d-flex flex-wrap justify-content-center mt-1">
          {offers.map((offer) => {
            return <OfferItem offer={offer}/>
          })}
        </section>
      </Container>
    );
};

function OfferItem(props) {
  const { offer } = props;
  // Take the first product's image
  const imageSrc = `images/${offer.Products[0].Image}.jpg`;

  return(
    <>
      <Card className="grow cursor mx-3 mb-4 p-0" style={{ width: "17rem" }}>
        <Card.Header className="black-bg text-white">
          <Card.Subtitle>{offer.Description}</Card.Subtitle>
        </Card.Header>
        <Card.Img 
          style={{ height: "11rem"}}
          variant="top"
          src={imageSrc}
          alt={offer.Products[0].Image.split("_").join(" ")}
          onError={(e) => {
            e.target.onError = null;
            e.target.src = ``;
          }}
        />
        <Card.Body>
          <Card.Subtitle className="mb-2">
            {getProductNames(offer.Products)}
          </Card.Subtitle>
          <Card.Text style={{ textDecorationLine: 'line-through', margin: 0 }}>
            {offer.Type == "oneFree" ? `${offer.Amount + 1} for ` : "" }{getOldPrice(offer)} PLN
          </Card.Text>
          <Card.Text>
            {offer.Type == "oneFree" ? `${offer.Amount + 1} for ` : "" }{getNewPrice(offer)} PLN
            </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export { OffersList, OfferItem };
