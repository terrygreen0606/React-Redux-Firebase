import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default class PaypalBtn extends React.Component {
	render() {
		const onSuccess = payment => {
			console.log('The payment was succeeded!', payment);
		};

		const onCancel = data => {
			console.log('The payment was cancelled!', data);
		};

		const onError = err => {
			console.log('Error!', err);
		};

		let env = 'sandbox';
		let currency = 'USD';
		let total = this.props.total;

		const client = {
			sandbox:
				'AXpVhURwRJJFWJfUZeU4WuwQ3igs8mHds6P6kxZ6QYHgrbAE695r39r7tkn2yM7Lt6TlLtW_NosNLo52',
			production: 'YOUR-PRODUCTION-APP-ID'
		};

		return (
			<PaypalExpressBtn
				env={env}
				client={client}
				currency={currency}
				total={total}
				onError={onError}
				onSuccess={onSuccess}
				onCancel={onCancel}
			/>
		);
	}
}
