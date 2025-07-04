import styled from 'styled-components';

export const AboutContainer = styled.div`
  margin: 20px auto;
  padding: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #fff;
  max-width: 800px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', sans-serif;
`;

export const Title = styled.h2`
  color: #6ba229;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`;

export const Paragraph = styled.p`
  color: #444;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 16px;
`;

export const List = styled.ul`
  list-style-type: disc;
  margin: 10px 0 20px 30px;
  color: #444;
`;

export const ListItem = styled.li`
  margin-bottom: 8px;
  font-size: 15px;
`;

export const ContactInfo = styled.p`
  margin-top: 20px;
  font-style: italic;
  font-size: 14px;
  color: #6ba229;
  text-align: center;
`;
