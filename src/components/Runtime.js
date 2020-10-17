import styled from 'styled-components';

const Runtime = styled.span`
  color: ${props => props.pace ? "green" : "red"};
`

export default Runtime;
