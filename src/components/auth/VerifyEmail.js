import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { verifyEmail } from '../../store/actions/authActions';

const VerifyEmail = () => {
	const dispatch = useDispatch();
	const emailError = useSelector(state => state.auth.emailVerified.error);
	// const emailLoading = useSelector(state => state.auth.emailVerified.loading);

	return (
		<div>
			<p>Verify your email to see projects.</p>
			<button onClick={() => dispatch(verifyEmail())}>
				Resend Verification
			</button>
			<div>{emailError}</div>
		</div>
	);
};

export default VerifyEmail;
