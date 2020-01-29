import React from 'react';
import moment from 'moment';

const Notifications = props => {
	const { notifications } = props;
	if (notifications) {
		return (
			<div className="section">
				<div className="card">
					<div className="card-content">
						<span className="card-title">Notifications</span>
						<ul className="notifications">
							{notifications &&
								notifications.map(item => {
									return (
										<li key={item.id}>
											<span className="pink-text">
												{item.user}{' '}
											</span>
											<span>{item.content}</span>
											<div className="grey-text note-date">
												{moment(
													item.time.toDate()
												).fromNow()}
											</div>
											<hr />
										</li>
									);
								})}
						</ul>
						<span className="card-title">.........</span>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="container center">
				<div className="preloader-wrapper active">
					<div className="spinner-layer spinner-blue-only">
						<div className="circle-clipper left">
							<div className="circle"></div>
						</div>
						<div className="gap-patch">
							<div className="circle"></div>
						</div>
						<div className="circle-clipper right">
							<div className="circle"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Notifications;
