import {
  Col,
  Container,
  Form,
  Row,
  Button,
  Card,
  FormControl,
} from "react-bootstrap";
import {
  useFilteredProductsList,
  useDeleteProduct,
  useUpdateProducts,
} from "./ProductsListLogic";

export default function ProductsList(props) {
  const { productsList } = props;

  // Filter the list with search field
  const { filteredList, setFilter } = useFilteredProductsList(productsList);

  return (
    <Container className="text-center mt-5">
      <Row>
        <Card.Title className="fs-5 mb-3">
          Products list (from last to first)
        </Card.Title>
        <Form className="mb-2">
          <FormControl
            onChange={(e) => setFilter(e.target.value)}
            type="search"
            placeholder="Search for a product"
            aria-label="Search"
          />
        </Form>
        {filteredList.map((val) => {
          // List Component can be found below
          return <List val={val} key={val._id} />;
        })}
      </Row>
    </Container>
  );
}

const List = (props) => {
  const { val, key } = props;

  // Update Products Collection by id
  const { updateProducts, newProduct, setNewProduct } = useUpdateProducts(val);

  // Delete product from Products Collection by id
  const { deleteProduct } = useDeleteProduct();

  return (
    <>
      <Card className="mt-4 p-4" key={key}>
        <Card.Title className="fs-4">
          {val.Name} for{" "}
          {val.Price.length === 1
            ? `${val.Price} PLN`
            : `${val.Price[0]}, ${val.Price[1]}, ${val.Price[2]} PLN`}
        </Card.Title>

        <Card.Title>
          Write in the field that you want to change or delete the product
        </Card.Title>
        <Card.Subtitle className="mt-2 mb-4">
          <strong>Warning:</strong> &nbsp; If you have added another 2 sizes for
          a product and you want to delete the last one, you will have to delete
          the product and add it again. Same goes for 2 sizes.
        </Card.Subtitle>
        <Row>
          <Col>
            <Form.Label>New name</Form.Label>
            <Form.Control
              value={newProduct.name}
              onChange={(event) => {
                setNewProduct({
                  ...newProduct,
                  name: event.target.value,
                  // Making the image name from 'Pizza Medieval' to 'pizza_medieval'
                  imageUrl: event.target.value
                    .toLowerCase()
                    .split(" ")
                    .join("_"),
                });
              }}
            />
          </Col>
          <Col>
            <Form.Label>New category</Form.Label>
            <Form.Control
              value={newProduct.category}
              onChange={(event) => {
                setNewProduct({
                  ...newProduct,
                  category: event.target.value,
                });
              }}
            />
          </Col>
        </Row>

        <Row className="mt-2 mb-2">
          <Col>
            <Form.Label>New price for first size (PLN)</Form.Label>
            <Form.Control
              type="number"
              value={newProduct.price}
              onChange={(event) => {
                setNewProduct({
                  ...newProduct,
                  price: event.target.value,
                });
              }}
            />
          </Col>
          <Col>
            <Form.Label>
              Image's name (autocomplete from Product's name).
            </Form.Label>
            <Form.Control
              value={newProduct.imageUrl}
              onChange={(event) => {
                setNewProduct({
                  ...newProduct,
                  imageUrl: event.target.value,
                });
              }}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Label>New price for second size (PLN)</Form.Label>
            <Form.Control
              type="number"
              value={newProduct.price2}
              onChange={(event) => {
                setNewProduct({
                  ...newProduct,
                  price2: event.target.value,
                });
              }}
            />
          </Col>
          <Col>
            <Form.Label>New price for third size (PLN)</Form.Label>
            <Form.Control
              type="number"
              value={newProduct.price3}
              onChange={(event) => {
                setNewProduct({
                  ...newProduct,
                  price3: event.target.value,
                });
              }}
            />
          </Col>
        </Row>
        
        <Row className="mt-2 mb-2">
          <Col className="mt-3">
            <Card.Subtitle className="mt-4">
              <b>Extra 1</b>
            </Card.Subtitle>
          </Col>
          <Col>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={newProduct.extra1.name == undefined ? "" : newProduct.extra1.name}
              onChange={(event) => {
                var extra = {
                  name: event.target.value,
                  emoji: newProduct.extra1.emoji,
                  price: newProduct.extra1.price
                };
                setNewProduct({
                  ...newProduct,
                  extra1: extra
                });
              }}
            />
          </Col>
          <Col>
            <Form.Label>Emoji</Form.Label>
            <Form.Control
              value={newProduct.extra1.emoji == undefined ? "" : newProduct.extra1.emoji}
              onChange={(event) => {
                var extra = {
                  name: newProduct.extra1.name,
                  emoji: event.target.value,
                  price: newProduct.extra1.price
                };
                setNewProduct({
                  ...newProduct,
                  extra1: extra
                });
              }}
            />
          </Col>
          <Col>
            <Form.Label>Unit price (PLN)</Form.Label>
            <Form.Control
              value={newProduct.extra1.price == undefined ? 0 : newProduct.extra1.price}
              onChange={(event) => {
                var extra = {
                  name: newProduct.extra1.name,
                  emoji: newProduct.extra1.emoji,
                  price: parseFloat(event.target.value)
                };
                setNewProduct({
                  ...newProduct,
                  extra1: extra
                });
              }}
            />
          </Col>
        </Row>

        <Row className="mt-2 mb-2">
          <Col className="mt-3">
            <Card.Subtitle className="mt-4">
              <b>Extra 2</b>
            </Card.Subtitle>
          </Col>
          <Col>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={newProduct.extra2.name == undefined ? "" : newProduct.extra2.name}
              onChange={(event) => {
                var extra = {
                  name: event.target.value,
                  emoji: newProduct.extra2.emoji,
                  price: newProduct.extra2.price
                };
                setNewProduct({
                  ...newProduct,
                  extra2: extra
                });
              }}
            />
          </Col>
          <Col>
            <Form.Label>Emoji</Form.Label>
            <Form.Control
              value={newProduct.extra2.emoji == undefined ? "" : newProduct.extra2.emoji}
              onChange={(event) => {
                var extra = {
                  name: newProduct.extra2.name,
                  emoji: event.target.value,
                  price: newProduct.extra2.price
                };
                setNewProduct({
                  ...newProduct,
                  extra2: extra
                });
              }}
            />
          </Col>
          <Col>
            <Form.Label>Unit price (PLN)</Form.Label>
            <Form.Control
              value={newProduct.extra2.price == undefined ? 0 : newProduct.extra2.price}
              onChange={(event) => {
                var extra = {
                  name: newProduct.extra2.name,
                  emoji: newProduct.extra2.emoji,
                  price: parseFloat(event.target.value)
                };
                setNewProduct({
                  ...newProduct,
                  extra2: extra
                });
              }}
            />
          </Col>
        </Row>

        <Row className="mt-2 mb-2">
          <Col className="mt-3">
            <Card.Subtitle className="mt-4">
              <b>Extra 3</b>
            </Card.Subtitle>
          </Col>
          <Col>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={newProduct.extra3.name == undefined ? "" : newProduct.extra3.name}
              onChange={(event) => {
                var extra = {
                  name: event.target.value,
                  emoji: newProduct.extra3.emoji,
                  price: newProduct.extra3.price
                };
                setNewProduct({
                  ...newProduct,
                  extra3: extra
                });
              }}
            />
          </Col>
          <Col>
            <Form.Label>Emoji</Form.Label>
            <Form.Control
              value={newProduct.extra3.emoji == undefined ? "" : newProduct.extra3.emoji}
              onChange={(event) => {
                var extra = {
                  name: newProduct.extra3.name,
                  emoji: event.target.value,
                  price: newProduct.extra3.price
                };
                setNewProduct({
                  ...newProduct,
                  extra3: extra
                });
              }}
            />
          </Col>
          <Col>
            <Form.Label>Unit price (PLN)</Form.Label>
            <Form.Control
              value={newProduct.extra3.price == undefined ? 0 : newProduct.extra3.price}
              onChange={(event) => {
                var extra = {
                  name: newProduct.extra3.name,
                  emoji: newProduct.extra3.emoji,
                  price: parseFloat(event.target.value)
                };
                setNewProduct({
                  ...newProduct,
                  extra3: extra
                });
              }}
            />
          </Col>
        </Row>

        <Col>
          <Form.Label>New description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Product description"
            value={newProduct.description}
            onChange={(event) => {
              setNewProduct({
                ...newProduct,
                description: event.target.value,
              });
            }}
          />
        </Col>
        <Row className="mt-4 mb-3">
          <Col>
            <Button
              variant="outline-dark"
              onClick={() => {
                updateProducts(val._id, newProduct);
                window.location.reload();
              }}
            >
              Change the product
            </Button>
          </Col>
          <Col>
            <Button
              variant="danger"
              onClick={() => {
                deleteProduct(val._id);
                window.location.reload();
              }}
            >
              Delete the product
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};
