import { useState } from "react";
import styled from "styled-components";
import { GoogleSpreadsheet } from 'google-spreadsheet';

const Container = styled.div`
  text-align: center;
`;

const SPREADSHEET_ID = "1xE4r_so4USf9mAuZ0kHvqozIGUi8tP9ziuLloS0dgw8";
const CLIENT_EMAIL = "sheet-test-account@sonic-glazing-383809.iam.gserviceaccount.com";
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQD6r72VjINnkobZ\notupfJkn/s4TLD6pfdm6XMOci4fW6Hm8QmsfNIS/0kcwyIxvjq4+oKNvg57dbeOT\nU9FyQNxuul510rj2R7htNrmHKWerHZvnoQA8a4lc9tIUeBiF1nOUKLWvAFTtfv0g\n6/8U8mwz06lTQ+h2fUBm1RL7XE2J8vcURG/n6dF7b8pk3hj2VGWW/0vAjnkgeWQO\ngb2fSKQ/MYGFMkoYnUYb/1AI/0UX4ynYRpEBe95ydes2x6zeIGVx7JTC9CyrYTZQ\ndJs1jSbHJHco+Ymj+ddLD6XcwxkpGGzFTuKhxcVrkHiqhVjviUTu9czDKwar8qL9\nzZPB6gy1AgMBAAECggEAA9YNdpADYip6tF1SQCyh5BessVOVc/ZdrN6eTTm/uIVN\nGu6ey91M3GneVkE4/zP2u876IMAuH+RcWXPbjl4dwn9rK/9NQsoUAncriTRx+6CM\nWY+TeqHALWvT1cv8euHUt7eMGN4F0NDpWPTXS8MUqk3EVSZ6EFDrZFMwOqgcyoN6\ns8X86Jxjv3h8tyvXPPI3vTiZM2Wu/pIlzoRjIjx2B5BqnTPJ9Q8AOt9on63DEJzO\n8mxU6c5gPgNdGPDbNNjxc3tC1haTjKc+TOH7n22pBHu3pfoWJEouu3sofECLow4l\nwPyIILHb3cJWqrXJLUIPr1VuvpewwrFEQWz1piCwgQKBgQD+DYk9RxqD/rsXxJqi\nzoNWdeWk6OljYvWe/wayG4u90ZzzInAYljc+h/LTb1lOn1t5u+AU7JKmpmKxnUg6\nhoHyrUE0PUpivYHUW5d9RTBJ2e/0CINbDQYkUMXMBw026Y0k2H9YSuol42cjEnRh\n2yYBLBod3ObgpAI9MYK2ZrUrgQKBgQD8m5l18Qs/yiKuiRALdErQtRR0rgpzz/wu\n+n2w5OfMJpRjKAJA8wB+JYxCkJtp2javnRavIiHV/tzUbcdXqo3nQG1ES1uTJoWS\nQ0bP1XH7npZx1qBLuKlv661StmLPl62NVMd2QHL7v/pb8SGmZpgk+S2YLt37jQoe\nyRoeuEmLNQKBgAyJWnZdpd9RmKXpm7/g9PY1RynGHI48+eXoq8nqNhEd4OLWljWA\nZCV/y+nHGt8YWgk9zib6LZpvp3sgScopjQwOpKMRSzRoKZnzExypZ2KdkIu4R9Mc\nZ2svWTNiPbKx/7cLv+z5dWh9Oj+uz3NsvwlbxcYnenUnYrzmTo71rocBAoGAdU5E\ny5JuaOcTh/26Z7dPbvBIWY7g57s0HxTP/a+vPQzFZ+6SbVrrZalGIztIELX3I0JN\n4HJ3SAscvcFlCv72+ubeVxKvqfv/l1aKscUrM3AH6UGEGuXcOU82o+xyoniLbdBq\n+C0huGsEdmHaAI4wJStZ0wwgpcpvYrB84rst2+kCgYB93Y1WDAEywMtPYEgjz0PK\nebPfO0HyH7oTTAwfLBwhXvwcZJ88K9djz9aYCJNYl8xp0D5kPlkxPunSel6KiNuG\ny4ouriIitoEM3OdSet/Mab3CUeDGkU2aj+3b1eLi5kTddgfTGjhX7A+/zxBxio8z\ns7JaSU+4NSP+8S6n6iVjzw==\n-----END PRIVATE KEY-----\n";

const Home = () => {
  const [reqData, SetReqData] = useState({
    name: "",
    money: "",
  })
  

  const submit = async () => {
    try {
      const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
      const today = new Date()
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
      // loads document properties and worksheets
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];
      await sheet.addRow({
        Date: `${today.getMonth()}/${today.getDate()}`, Item: 'ok', Cost: "1000"
      });
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  return <Container>
    <input 
      type="text" 
      onChange={
        e => SetReqData({...reqData, name: e.target.value})
    }>
    </input>
    <input 
      type="text" 
      onChange={
        e => SetReqData({...reqData, money: e.target.value})
    }>
    </input>
    <button onClick={submit}>Submit</button>
    
  </Container>;
};

export default Home;