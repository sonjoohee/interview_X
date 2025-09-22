import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { USER_CREDIT } from '../../../AtomStates';
import { useAtom } from 'jotai';

const PagePayTest = () => {
  const [message, setMessage] = useState('');
    //userCredit은 서버에서 받아온 값을 저장하는 용도로 사용, setUserCredit은 나중엔 서버측에서 관리하니 사용하지 않을 예정
  const [userCredit, setUserCredit] = useAtom(USER_CREDIT); 
  //userCredit은 차후 api 호출로 서버에서 받아오는 값으로 변경
  //나중엔 서버에 크레딧 추가 요청 보내고 받아오는 값으로 변경
  const handleApprove = (data, actions, amount) => {
    return actions.order.capture().then(function(details) {
      setUserCredit(prevCredit => {
        const newCredit = prevCredit + amount;
        setMessage(`${amount} 결제가 완료되었습니다. 현재 크레딧: ${newCredit}`);
        return newCredit;
      });
    }).catch(error => {
      setMessage(`결제 실패: ${error.message}`);
    });
  };

  const addCredit = () => {
    setUserCredit(prevCredit => prevCredit + 100);
    setMessage(`100 크레딧을 추가했습니다. 현재 크레딧: ${userCredit + 100}`);
  };
  
  //보고서Api 호출하는 곳에서 호출하면 됨
  //나중엔 서버에 크레딧 차감 요청 보내고 받아오는 값으로 변경
  const handleSpendCredit = () => {
    if (userCredit >= 10) {
      setUserCredit(prevCredit => prevCredit - 10);
      setMessage(`10 크레딧을 사용했습니다. 남은 크레딧: ${userCredit - 10}`);
    } else {
      setMessage('크레딧이 부족합니다.');
    }
  };
  
  const createOrder = (amount) => {
    return (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: amount.toString(),
          },
        }],
      });
    };
  };

  return (
    <div style={{ display: 'flex' }}>
    <div style={{
      width: '200px',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
    }}>
      <h3>현재 크레딧</h3>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{userCredit}</p>
    </div>
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>PayPal 결제 테스트</h2>
      <h2>Visa: 4111 1111 1111 1111</h2>
      <h2>MasterCard: 5555 5555 5555 4444</h2>
      <h2>American Express: 3782 822463 10005</h2>
      <h2>Discover: 6011 1111 1111 1117</h2>

      <div>
        <h3>100$ 결제</h3>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <PayPalButtons
            createOrder={createOrder(100)}
            onApprove={(data, actions) => handleApprove(data, actions, 100)}
          />
        </div>
      </div>
      <div>
        <h3>1000$ 결제</h3>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <PayPalButtons
            createOrder={createOrder(1000)}
            onApprove={(data, actions) => handleApprove(data, actions, 1000)}
          />
        </div>
      </div>
      <div>
        <h3>10000$ 결제</h3>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <PayPalButtons
            createOrder={createOrder(10000)}
            onApprove={(data, actions) => handleApprove(data, actions, 10000)}
          />
        </div>
      </div>
      <div>
        <h3>크레딧 사용</h3>
        <button onClick={handleSpendCredit} style={{ padding: '10px 20px', fontSize: '16px', marginTop: '10px' }}>
          10 크레딧 사용
        </button>
      </div>
      {message && <div style={{ marginTop: '20px', fontSize: '18px' }}>{message}</div>}
    </div>
    <button onClick={addCredit}>100 크레딧 추가</button>
    </div>
  );
};

export default PagePayTest;
