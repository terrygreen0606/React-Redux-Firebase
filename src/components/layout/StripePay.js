import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripePay = ({ total }) => {
	const handleToken = (token, addresses) => {
		console.log(token, addresses);
	};

	return (
		<StripeCheckout
			stripeKey="pk_test_3z9vjeweck8gL1fOLMpBudBr003IHp1k9Q"
			token={handleToken}
			amount={total}
			ComponentClass="div"
		>
			<button className="btn btn-waves-effect">Stripe Pay</button>
		</StripeCheckout>
	);
};

export default StripePay;
