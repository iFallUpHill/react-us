import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const FooterText = styled.p`
  margin: 0;
`

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>Made by <a href="https://jasonmh.me" target="_blank" rel="noopener noreferrer">Jason Manson-Hing</a></FooterText>
    </FooterContainer>
  )
}

export default Footer;
