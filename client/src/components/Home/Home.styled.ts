import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  margin: 50% 0px;
`;

export const Separator = styled.span`
  font-family: AvenirNext-Bold;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  margin-bottom: 10px;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.span`
  font-family: AvenirNext-Bold;
  font-size: 28px;
  color: #ffffff;
  letter-spacing: 0.6px;
  line-height: 41px;
  margin-bottom: 10px;
`;
export const DefaultInput = styled.input`
  color: #000;
  width: 50%;
  height: 35px;
  font-family: AvenirNext-Bold;
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;
`;

export const LoginForm = styled(Form)``;
export const RegisterForm = styled(Form)``;
export const Email = styled(DefaultInput)``;
export const Name = styled(DefaultInput)``;
export const Submit = styled(DefaultInput)`
  font-family: AvenirNext-DemiBold;
  background: #ffce4e;
  border-radius: 9px;
  border-radius: 9px;
  font-size: 18px;
`;
