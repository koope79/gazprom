import styled from "styled-components";
import Products from "./components/views/Products/Products";

const Wrapper = styled.div({
  backgroundColor: '#dcdcdc',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Container = styled.div({
  width: '85%',
  height: '90%',
  backgroundColor: 'white',
  borderRadius: '3px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',

});

function App() {
  return (
    <Wrapper>
      <Container>
        <Products />
      </Container>
    </Wrapper> 
  );
}

export default App;
